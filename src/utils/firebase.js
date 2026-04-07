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
  // To enable deep Google Cloud telemetry, place your Firebase config here.
  // Example:
  // apiKey: "YOUR_API_KEY",
  // authDomain: "foodspotting-xyz.firebaseapp.com",
  // projectId: "foodspotting-xyz",
  // storageBucket: "foodspotting-xyz.appspot.com",
  // messagingSenderId: "123456789",
  // appId: "1:123456789:web:abcdef123456",
  // measurementId: "G-ABCDEF1234"
};

let app, analytics, perf;

// Initialize Firebase securely (won't crash if config is empty locally)
try {
  if (Object.keys(firebaseConfig).length > 0) {
    app = initializeApp(firebaseConfig);
    
    // Google Analytics integration for tracking App events
    analytics = getAnalytics(app);
    
    // Google Performance Monitoring for robust Cloud metrics
    perf = getPerformance(app);
    
    console.log('✅ Google Firebase Telemetry initialized.');
  }
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
