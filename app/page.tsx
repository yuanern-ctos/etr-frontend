// app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Armed Forces Command & Staff College ERP</h1>
      <p>This platform manages profiles, dashboards, and courses for officers.</p>
      <Link href="/signup">
        <button style={{ marginTop: '1rem' }}>Proceed to Signup</button>
      </Link>
    </main>
  );
}