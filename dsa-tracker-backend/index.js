// File: dsa-tracker-backend/index.js

// Load environment variables from .env file for local development
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// --- Secure Firebase Admin SDK Initialization ---
let serviceAccount;

// This logic checks if a FIREBASE_SERVICE_ACCOUNT environment variable exists.
// This is the standard for deployed environments like Vercel or Render.
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    // On a server, parse the environment variable string into a JSON object
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (e) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT JSON:', e);
    process.exit(1);
  }
} else {
  // Locally, fall back to requiring the file.
  // This file should be in .gitignore and not committed to your repository.
  try {
    serviceAccount = require('./serviceAccountKey.json');
  } catch (e) {
    console.error('Error requiring serviceAccountKey.json. Make sure the file exists for local development or set FIREBASE_SERVICE_ACCOUNT environment variable for deployment.');
    process.exit(1);
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

const app = express();

// --- Robust CORS Configuration ---
const allowedOrigins = [
  'http://localhost:3000', // For Create React App
  'http://localhost:5173', // For Vite
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'https://jagasdsa-tracker.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));
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

// --- API Routes ---
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
