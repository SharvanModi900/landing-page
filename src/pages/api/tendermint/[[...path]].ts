import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the path from the URL
    const { path = [] } = req.query;
    const pathStr = Array.isArray(path) ? path.join('/') : path;

    // Forward the request to the Tendermint node
    const tendermintUrl = `http://localhost:26657/${pathStr}`;
    
    const response = await fetch(tendermintUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Tendermint proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to proxy request to Tendermint node',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
