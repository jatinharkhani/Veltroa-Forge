// forgepoint.js
/**
 * Veltroa Forge — forgepoint.js
 * A fuller one-file fullstack example: combines React UI, API endpoints, and Node.js logic
 * inside a single Next.js page file (using both page and API handling).
 */

import React, { useState } from 'react';

// Export default React component (client-side UI)
export default function Forgepoint() {
  const [count, setCount] = useState(0);
  const [greeting, setGreeting] = useState('');

  const increment = () => setCount(prev => prev + 1);
  const callApi = async () => {
    const res = await fetch('/api/forgepoint');
    const data = await res.json();
    setGreeting(data.message);
  };

  return (
    <div style={{ margin: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to Veltroa Forge</h1>
      <h2>forgepoint.js One‑File Demo</h2>

      <section style={{ margin: '1.5rem 0' }}>
        <button onClick={increment} style={{ padding: '0.5rem 1rem' }}>
          Click to Increment
        </button>
        <p>Current Count: <strong>{count}</strong></p>
      </section>

      <section style={{ margin: '1.5rem 0' }}>
        <button onClick={callApi} style={{ padding: '0.5rem 1rem' }}>
          Fetch Server Greeting
        </button>
        <p>Server says: <em>{greeting || '<nothing yet>'}</em></p>
      </section>

      <section style={{ margin: '1.5rem 0', padding: '1rem', border: '1px solid #ddd' }}>
        <p><small><strong>Note:</strong> This single file also defines a Next.js API route and some server logic below.</small></p>
      </section>
    </div>
  );
}

// Next.js specific: handle API route within same file
export const config = {
  api: {
    bodyParser: false, // configure as needed
  },
};

// If request is to /api/forgepoint, run this handler
export async function middleware(req, res, next) {
  if (req.url === '/api/forgepoint') {
    const message = await generateServerMessage();
    return res.status(200).json({ message });
  }
  return next();
}

// Server logic: Node.js-style function
async function generateServerMessage() {
  // Simulate async work (e.g. fetch from DB or external API)
  await new Promise(r => setTimeout(r, 300));
  const now = new Date().toLocaleTimeString();
  return `Hello from Node logic! Current server time: ${now}`;
}
