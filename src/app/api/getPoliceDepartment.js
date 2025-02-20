import axios from 'axios';

export default async function handler(req, res) {
  const { zipcode } = req.query;

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=police+department+in+${zipcode}&key=${process.env.GOOGLE_PLACES_API_KEY}`);
    const data = await response.json();
    const policeDepartment = data.results[0]?.name || 'Local Police Department';
    res.status(200).json({ policeDepartment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch police department' });
  }
}