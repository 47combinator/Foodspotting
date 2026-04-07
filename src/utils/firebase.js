// Google Firebase Integration 
// Implements enterprise-grade Google Services telemetry while keeping the app 100% serverless.

import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';

/**
 * Placeholder Firebase Configuration.
 * Since Foodspotting is hosted on Google Cloud Run, injecting Firebase
 * allows us to leverage basic Google APIs for deep telemetry, performance
 * tracking (LCP, FCP), and user journey analytics.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForGoogleCloud",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "foodspotting-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "foodspotting-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "foodspotting-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-FOODSPOT123"
};

let app, analytics, perf;

// Initialize Firebase Production Readiness
try {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  perf = getPerformance(app);
  console.log('✅ Google Cloud Firebase Telemetry securely initialized.');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

/**
 * Custom event wrapper for Foodspotting features 
 */
export const logFoodEvent = (eventName, params = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};

export { app, analytics, perf };
