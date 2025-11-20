export default async function handler(request, response) {
  const { q } = request.query;
  
  if (!q) {
    return response.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const googleRes = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(q)}`);
    
    if (!googleRes.ok) {
      throw new Error(`Google API responded with ${googleRes.status}`);
    }

    const data = await googleRes.json();
    
    // Set CORS headers to allow access from anywhere (or restrict to your domain)
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    response.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    response.status(500).json({ error: 'Failed to fetch suggestions' });
  }
}
