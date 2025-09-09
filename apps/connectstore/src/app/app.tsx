import { useGetProductsQuery } from '@connectstore/store';

export function App() {
  // Test Redux integration by fetching products
  const { data: products, error, isLoading } = useGetProductsQuery();
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

        {/* Redux Status & Products */}
        <div className="row g-4">
          <div className="col-12">
            <div className="card card-dark">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  Redux Integration Status
                </h5>
                {isLoading && (
                  <div className="d-flex align-items-center">
                    <div
                      className="spinner-border spinner-border-sm text-primary me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="text-muted">
                      Loading products from API...
                    </span>
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <strong>Error:</strong> Failed to fetch products.{' '}
                    {JSON.stringify(error)}
                  </div>
                )}
                {products && (
                  <div>
                    <div className="alert alert-success" role="alert">
                      <strong>Success!</strong> Redux is working! Fetched{' '}
                      {products.length} products from API.
                    </div>
                    <div className="row g-3">
                      {products.slice(0, 6).map((product, index) => (
                        <div key={product.id || index} className="col-md-4">
                          <div className="card card-dark h-100">
                            <img
                              src={product.imageUrl}
                              className="card-img-top"
                              alt={product.title}
                              style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                              <h6 className="card-title text-primary">
                                {product.title}
                              </h6>
                              <p className="card-text text-muted small">
                                By: {product.userName}
                              </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="badge bg-secondary">
                                  {product.pricingOption}
                                </span>
                                {product.price && (
                                  <span className="text-success fw-bold">
                                    ${product.price}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
