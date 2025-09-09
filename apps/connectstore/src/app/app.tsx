import {
  Header,
  SearchSection,
  ContentsFilter,
  PricingSlider,
  ProductsContainer,
} from '@connectstore/components';

export function App() {
  return (
    <>
      <Header />

      <div className="min-vh-100 bg-dark fixed-header-padding">
        {/* Search Section */}
        <SearchSection />

        {/* Contents Filter Info Banner - Full Width */}
        <div className="container-fluid px-4 pb-3">
          <ContentsFilter variant="info-only" />
        </div>

        {/* Main Content Container */}
        <div className="container-fluid px-4 py-3">
          {/* Contents List Section */}
          <div className="row">
            <div className="col-12">
              <ProductsContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
