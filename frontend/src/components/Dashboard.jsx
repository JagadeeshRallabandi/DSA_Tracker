// File: src/components/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Tracker from './Tracker';
import ProgressSummary from './ProgressSummary';

const Dashboard = () => {
  const user = auth.currentUser;
  const [completedDays, setCompletedDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = 'https://dsa-tracker-backend-p2wp.onrender.com/api';

  const totalDays = 80;

  useEffect(() => {
    const fetchProgress = async () => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await axios.get(`${API_URL}/progress`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCompletedDays(response.data.completedDays || []);
        } catch (err) {
          setError('Failed to load progress. Please ensure the backend server is running.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProgress();
  }, [user]);

  const handleProgressUpdate = async (updatedDays) => {
    const originalState = [...completedDays];
    setCompletedDays(updatedDays); // Optimistic UI update

    try {
      const token = await user.getIdToken();
      await axios.post(`${API_URL}/progress`, 
        { completedDays: updatedDays },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      setError('Failed to save progress. Reverting changes.');
      setCompletedDays(originalState); // Revert on error
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-stone-800">DSA Tracker</h1>
            {user && <p className="text-xs text-stone-500">{user.email}</p>}
          </div>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">Logout</button>
        </nav>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-5xl">
        <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">DSA Mastery Plan</h1>
            <p className="mt-2 text-stone-600">Your 80-day journey to becoming a DSA expert. Progress is synced across devices.</p>
        </div>
        {loading ? (
          <p className="text-center p-8">Loading your progress...</p>
        ) : (
          <>
            <ProgressSummary completedCount={completedDays.length} totalCount={totalDays} />
            <Tracker completedDays={completedDays} onProgressUpdate={handleProgressUpdate} />
          </>
        )}
        {error && <p className="text-center p-8 text-red-500">{error}</p>}
      </main>
    </div>
  );
};

export default Dashboard;
