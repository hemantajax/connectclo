import { useRegisterSW } from 'virtual:pwa-register/react';
import { useCallback, useEffect } from 'react';

export function usePWAUpdate() {
  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = useCallback(() => {
    offlineReady.value = false;
    needRefresh.value = false;
  }, [offlineReady, needRefresh]);

  useEffect(() => {
    if (offlineReady.value) {
      console.log('App is ready to work offline');
    }
  }, [offlineReady.value]);

  return {
    offlineReady: offlineReady.value,
    needRefresh: needRefresh.value,
    updateServiceWorker,
    close,
  };
}
