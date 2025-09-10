import React from 'react';

interface PWAUpdatePromptProps {
  needRefresh: boolean;
  offlineReady: boolean;
  updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  close: () => void;
}

export const PWAUpdatePrompt: React.FC<PWAUpdatePromptProps> = ({
  needRefresh,
  offlineReady,
  updateServiceWorker,
  close,
}) => {
  if (!needRefresh && !offlineReady) return null;

  return (
    <div
      className="position-fixed bottom-0 start-50 translate-middle-x mb-3"
      style={{ zIndex: 1050 }}
    >
      <div
        className="alert alert-info alert-dismissible fade show"
        role="alert"
      >
        {offlineReady ? (
          <span>App ready to work offline</span>
        ) : (
          <span>New content available, click on reload button to update.</span>
        )}

        {needRefresh && (
          <button
            className="btn btn-sm btn-primary ms-2"
            onClick={() => updateServiceWorker(true)}
          >
            Reload
          </button>
        )}

        <button
          type="button"
          className="btn-close"
          onClick={close}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};
