// File: dsa-tracker-backend/index.js

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountString) {
  throw new Error('The FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
}
const serviceAccount = JSON.parse(serviceAccountString);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const auth = admin.auth();

const app = express();
app.use(cors());
app.use(express.json());

// --- Middleware ---
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized: No token provided.');
  }
  
  const idToken = authHeader.split('Bearer ')[1];
  
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).send('Unauthorized: Invalid token.');
  }
};

// --- API Routes (with /api prefix) ---

// GET /api/progress: Fetches the progress for the authenticated user
app.get('/api/progress', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const docRef = db.collection('userProgress').doc(userId);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      res.status(200).json({ completedDays: [] });
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get progress.' });
  }
});

// POST /api/progress: Updates the progress for the authenticated user
app.post('/api/progress', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { completedDays } = req.body;

    if (!Array.isArray(completedDays)) {
        return res.status(400).json({ error: 'Invalid data format. `completedDays` must be an array.' });
    }

    const docRef = db.collection('userProgress').doc(userId);
    await docRef.set({ completedDays });
    res.status(200).json({ message: 'Progress updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress.' });
  }
});

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
