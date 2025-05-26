import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-secondary)] py-6 mt-auto border-t border-[var(--border-color)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6">
            <Link to="/" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Home </Link>
            <Link to="/about" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">About </Link>
            <Link to="/contact" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Contact </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="mailto:contact@example.com" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">contact@example.com</a>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">FB</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">TW</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">IN</a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-[var(--text-secondary)] text-sm">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 