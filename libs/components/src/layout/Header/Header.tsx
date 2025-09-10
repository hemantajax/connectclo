import React from 'react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header role="banner">
      <nav
        className={`navbar navbar-dark navbar-dark-custom navbar-expand-lg py-3 fixed-top ${className}`}
        aria-label="Main navigation"
      >
        <div className="container-fluid px-4">
          {/* Logo/Brand */}
          <div className="navbar-brand d-flex align-items-center">
            <img
              src="https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg"
              alt="CLO-SET CONNECT - Go to homepage"
              height="40"
              className="d-inline-block align-text-top"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
