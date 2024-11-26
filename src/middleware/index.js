import { admin } from '../config/firebase.js';

const verifyToken = async (req, res, next) => {
  const idToken = req.cookies.access_token;
  if (!idToken) {
    return res.status(403).json({ message: 'Token tidak ditemukan, harap login terlebih dahulu!' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifikasi token', error);
    return res.status(403).json({ error: 'Unauthorized' });
  }
};

export default verifyToken;
