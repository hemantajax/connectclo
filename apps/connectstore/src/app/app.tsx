export function App() {
  return (
    <div className="min-vh-100">
      {/* Header */}
      <nav className="navbar navbar-dark navbar-dark-custom navbar-expand-lg">
        <div className="container">
          <span className="navbar-brand text-gradient fs-3 fw-bold">
            Connect Store
          </span>
          <div className="d-flex">
            <button className="btn btn-primary-glow me-2">Sign In</button>
            <button className="btn btn-outline-primary-glow">Register</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5">
        <div className="text-center mb-5 fade-in">
          <h1 className="display-4 text-primary-glow mb-3">
            Welcome to Connect Store
          </h1>
          <p className="lead text-muted">
            Discover amazing products with our modern dark theme
          </p>
        </div>

        {/* Test Cards */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card card-dark h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Test Product 1</h5>
                <p className="card-text text-muted">
                  This is a test product card with our custom dark theme.
                </p>
                <button className="btn btn-primary-glow">View Details</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-dark h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Test Product 2</h5>
                <p className="card-text text-muted">
                  Another test product card showcasing the theme.
                </p>
                <button className="btn btn-outline-primary-glow">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-dark h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Test Product 3</h5>
                <p className="card-text text-muted">
                  Third test product with beautiful hover effects.
                </p>
                <button className="btn btn-primary-glow">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
