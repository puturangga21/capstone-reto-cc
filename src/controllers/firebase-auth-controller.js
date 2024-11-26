import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from '../config/firebase.js';
import { prisma } from '../config/prisma.js';
import { authSchema, resetPasswordSchema } from '../schema/auth.schema.js';

const auth = getAuth();

class FirebaseAuthController {
  async registerUser(req, res) {
    const { email, password } = req.body;
    const { error } = authSchema.validate({ email, password });

    if (error) {
      return res.status(422).json({
        error: error.details.map((e) => e.message),
      });
    }

    try {
      // cek apa user sudah ada di database
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        // buat transaksi biar data antara firebase dengan database konsisten
        const newUser = await prisma.$transaction(async (prisma) => {
          // buat user di firebase
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const uid = userCredential.user.uid;

          // kirim email verifikasi
          await sendEmailVerification(auth.currentUser);

          // buat user di database
          return prisma.user.create({
            data: {
              uid,
              email,
            },
          });
        });

        // response sukses
        res.status(201).json({
          message: 'Email verifikasi terkirim! user berhasil dibuat!',
          user: {
            id: newUser.id,
            email: newUser.email,
          },
        });
      } else {
        // kalau email sudah dipakai
        res.status(409).json({
          error: 'User sudah digunakan oleh user lain',
        });
      }
    } catch (error) {
      // kalau error
      console.error(error);
      res.status(500).json({
        error: error.message || 'Terjadi kesalahan saat register user :(',
      });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    const { error } = authSchema.validate({ email, password });

    if (error) {
      return res.status(422).json({
        error: error.details.map((e) => e.message),
      });
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = userCredential._tokenResponse.idToken;

        if (!idToken) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.cookie('access_token', idToken, {
          httpOnly: true,
        });

        res.status(200).json({
          message: 'User berhasil login',
          userCredential,
        });
      } else {
        res.status(409).json({
          message: 'Email belum terdaftar, harap register terlebih dahulu',
        });
      }
    } catch (error) {
      const errorMessage = error.message || 'Terjadi kesalahan saat login user :(';
      res.status(500).json({ error: errorMessage });
    }
  }

  async logoutUser(req, res) {
    try {
      await signOut(auth);
      res.clearCookie('access_token');
      res.status(200).json({ message: 'User berhasil logout' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async resetPassword(req, res) {
    const { email } = req.body;
    const { error } = resetPasswordSchema.validate({ email });

    if (error) {
      return res.status(422).json({
        error: error.details.map((e) => e.message),
      });
    }

    try {
      await sendPasswordResetEmail(auth, email);
      res.status(200).json({ message: 'Email reset password berhasil dikirim!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new FirebaseAuthController();
