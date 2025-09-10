import {
  Header,
  SearchSection,
  ContentsFilter,
  ProductsContainer,
  PWAUpdatePrompt,
  PerformanceMonitor,
} from '@connectstore/components';
import { useFiltersUrlSync } from './hooks/useFiltersUrlSync';
import { usePWAUpdate } from './hooks/usePWAUpdate';

export function App() {
  useFiltersUrlSync();
  const { needRefresh, offlineReady, updateServiceWorker, close } =
    usePWAUpdate();

  return (
    <>
      <PerformanceMonitor />
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

      {/* PWA Update Prompt */}
      <PWAUpdatePrompt
        needRefresh={needRefresh}
        offlineReady={offlineReady}
        updateServiceWorker={updateServiceWorker}
        close={close}
      />
    </>
  );
}

export default App;
