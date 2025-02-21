export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const zipcode = searchParams.get('zipcode');
  
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=police+department+in+${zipcode}&key=${process.env.GOOGLE_PLACES_API_KEY}`);
    const data = await response.json();
    const policeDepartment = data.results[0]?.name || 'Local Police Department';
    return new Response(JSON.stringify({ policeDepartment }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch police department' }), { status: 500 });
  }
}

