'use client';

//import 'style.css';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Hotel Management</title>
      </head>
      <body>
        <header className="header">
          <h1>Hotel Management System</h1>
        </header>
        <main className="main">{children}</main>
        <footer className="footer">© 2026 Hotel Management</footer>
      </body>
    </html>
  );
}