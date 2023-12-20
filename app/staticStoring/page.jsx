// pages/api/firestoreAPI.js

import { db } from '../../Components/firebase'; // Import your Firebase configuration

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, newData } = req.body; // Assuming you send userId and newData in the request body

    try {
      const userRef = db.collection('users').doc(userId);
      await userRef.set(newData);
      res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Failed to update data' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
