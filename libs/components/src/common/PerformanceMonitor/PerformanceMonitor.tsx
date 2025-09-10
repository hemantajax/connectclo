import { useEffect } from 'react';

interface PerformanceMonitorProps {
  reportWebVitals?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  reportWebVitals = true,
}) => {
  useEffect(() => {
    if (!reportWebVitals || typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const reportVital = (metric: any) => {
      // In production, you would send this to your analytics service
      console.log('[Performance]', metric);

      // You can integrate with services like:
      // - Google Analytics 4
      // - New Relic
      // - Datadog RUM
      // - Custom analytics endpoint
    };

    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          reportVital({
            name: 'LCP',
            value: lastEntry.startTime,
            rating:
              lastEntry.startTime < 2500
                ? 'good'
                : lastEntry.startTime < 4000
                ? 'needs-improvement'
                : 'poor',
            timestamp: Date.now(),
          });
        });

        lcpObserver.observe({
          type: 'largest-contentful-paint',
          buffered: true,
        });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const eventEntry = entry as PerformanceEventTiming;
            const fidValue = eventEntry.processingStart - eventEntry.startTime;
            reportVital({
              name: 'FID',
              value: fidValue,
              rating:
                fidValue < 100
                  ? 'good'
                  : fidValue < 300
                  ? 'needs-improvement'
                  : 'poor',
              timestamp: Date.now(),
            });
          });
        });

        fidObserver.observe({ type: 'first-input', buffered: true });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              reportVital({
                name: 'CLS',
                value: clsValue,
                rating:
                  clsValue < 0.1
                    ? 'good'
                    : clsValue < 0.25
                    ? 'needs-improvement'
                    : 'poor',
                timestamp: Date.now(),
              });
            }
          });
        });

        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Cleanup observers on unmount
        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        console.warn('[PerformanceMonitor] Error setting up observers:', error);
      }
    }

    // Monitor resource loading times
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const resourceEntry = entry as PerformanceResourceTiming;
        if (entry.duration > 1000) {
          // Report slow resources (>1s)
          reportVital({
            name: 'Slow Resource',
            url: entry.name,
            duration: entry.duration,
            type: resourceEntry.initiatorType,
            timestamp: Date.now(),
          });
        }
      });
    });

    if ('PerformanceObserver' in window) {
      resourceObserver.observe({ entryTypes: ['resource'] });
    }

    // Report navigation timing
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;

      if (navigation) {
        reportVital({
          name: 'Page Load',
          ttfb: navigation.responseStart - navigation.requestStart, // Time to First Byte
          domContentLoaded:
            navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          timestamp: Date.now(),
        });
      }
    });

    return () => {
      if ('PerformanceObserver' in window) {
        resourceObserver.disconnect();
      }
    };
  }, [reportWebVitals]);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
