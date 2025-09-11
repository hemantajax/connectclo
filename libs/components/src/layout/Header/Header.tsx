import React from 'react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const logoStyle: React.CSSProperties = {
    background:
      'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 50%, #00d2ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '1.8rem',
    fontWeight: '900',
    letterSpacing: '0.1em',
    textShadow: '0 0 30px rgba(0, 210, 255, 0.3)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    textTransform: 'uppercase' as const,
  };

  return (
    <header role="banner">
      <nav
        className={`navbar navbar-dark navbar-dark-custom navbar-expand-lg py-3 fixed-top ${className}`}
        aria-label="Main navigation"
      >
        <div className="container-fluid px-4">
          {/* Logo/Brand */}
          <div className="navbar-brand d-flex align-items-center">
            <span style={logoStyle} className="d-inline-block">
              H<span style={{ color: '#00ff88' }}>CONNECT</span>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
