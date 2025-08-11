/** Amplitude Analytics Utils. */

import { useEffect, createContext, useContext } from 'react';
import { init, track } from '@amplitude/analytics-browser';
import { detectEnvironment, getEnvironmentContext, shouldTrackAnalytics } from '../components/EnvironmentUtils';

const AMPLITUDE_API_KEY: string = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '';

if (!AMPLITUDE_API_KEY) {
  console.warn('AMPLITUDE_API_KEY is not set - analytics will be disabled');
}

const AmplitudeContext = createContext({});

export function AmplitudeContextProvider({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    if (!shouldTrackAnalytics() || !AMPLITUDE_API_KEY) {
      console.log('Amplitude analytics disabled for current environment');
      return;
    }

    const envInfo = detectEnvironment();
    
    init(AMPLITUDE_API_KEY, undefined, {
      autocapture: {
        elementInteractions: true,
        pageViews: true,
        sessions: true,
        fileDownloads: true,
        formInteractions: true
      },
      defaultTracking: {
        pageViews: {
          trackOn: 'attribution',
          trackHistoryChanges: 'pathOnly'
        }
      }
    });

    console.log(`Amplitude initialized for ${envInfo.environment} environment on ${envInfo.hostname}`);
  }, []);

  const trackAmplitudeEvent = (eventName: string, eventProperties: any = {}) => {
    if (!shouldTrackAnalytics() || !AMPLITUDE_API_KEY) {
      console.log(`Amplitude tracking skipped for event: ${eventName}`);
      return;
    }

    const environmentContext = getEnvironmentContext();
    const enrichedProperties = {
      ...eventProperties,
      ...environmentContext
    };

    track(eventName, enrichedProperties);
    console.log(`Amplitude event tracked: ${eventName}`, enrichedProperties);
  };

  const value = { trackAmplitudeEvent };

  return (
    <AmplitudeContext.Provider value={value} >
      {children}
    </AmplitudeContext.Provider>
  );

};


export default function useAmplitude() {
  const context = useContext(AmplitudeContext);

  if (!context) {
    throw new Error('useAmplitude must be used within an AmplitudeContextProvider');
  }

  return context;
};














