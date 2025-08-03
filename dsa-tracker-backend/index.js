// File: dsa-tracker-backend/index.js

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// --- Firebase Admin SDK Initialization ---
// Make sure the 'serviceAccountKey.json' file is in the same directory
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const auth = admin.auth();

const app = express();

// --- Middleware ---
// Enable CORS for all routes, allowing your frontend to make requests
app.use(cors());
// Enable parsing of JSON request bodies
app.use(express.json());

// Custom middleware to verify the Firebase ID token from the Authorization header
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized: No token provided.');
  }
  
  const idToken = authHeader.split('Bearer ')[1];
  
  try {
    // Verify the token using the Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken; // Add user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).send('Unauthorized: Invalid token.');
  }
};

// --- API Routes ---

// GET /progress: Fetches the progress for the authenticated user
app.get('/api/progress', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const docRef = db.collection('userProgress').doc(userId);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      // If no document exists, it's a new user. Send back an empty array.
      res.status(200).json({ completedDays: [] });
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get progress.' });
  }
});

// POST /progress: Updates the progress for the authenticated user
app.post('/api/progress', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { completedDays } = req.body;

    // Validate that completedDays is an array
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
