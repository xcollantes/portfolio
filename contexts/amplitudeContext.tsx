/** Amplitude Analytics Utils. */

import { useEffect, createContext, useContext } from 'react';
import { init, track } from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY: string = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '';

if (!AMPLITUDE_API_KEY) {
  throw new Error('AMPLITUDE_API_KEY is not set');
}

const AmplitudeContext = createContext({});

export function AmplitudeContextProvider({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    init(AMPLITUDE_API_KEY, undefined, {
      autocapture: true,
    });
  }, []);

  const trackAmplitudeEvent = (eventName: string, eventProperties: any) => {
    track(eventName, eventProperties);
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














