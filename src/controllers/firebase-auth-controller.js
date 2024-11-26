import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from '../config/firebase.js';

const auth = getAuth();

class FirebaseAuthController {
  registerUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: 'Email wajib diisi',
        password: 'Password wajib diisi',
      });
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            res.status(201).json({
              message: 'Email verifikasi terkirim! User berhasil dibuat!',
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({
              message: 'Gagal mengirim email verifikasi',
            });
          });
      })
      .catch((error) => {
        const errorMessage = error.message || 'Terjadi kesalahan saat register user :(';
        res.status(500).json({ error: errorMessage });
      });
  }

  loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: 'Email wajib diisi',
        password: 'Password wajib diisi',
      });
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const idToken = userCredential._tokenResponse.idToken;
        if (idToken) {
          res.cookie('access_token', idToken, {
            httpOnly: true,
          });
          res.status(200).json({ message: 'User berhasil login', userCredential });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.message || 'Terjadi kesalahan saat login user :(';
        res.status(500).json({ error: errorMessage });
      });
  }

  logoutUser(req, res) {
    signOut(auth)
      .then(() => {
        res.clearCookie('access_token');
        res.status(200).json({ message: 'User berhasil logout' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      });
  }

  resetPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({
        email: 'Email wajib diisi',
      });
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        res.status(200).json({ message: 'Email reset password berhasil dikirim!' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      });
  }
}

export default new FirebaseAuthController();
