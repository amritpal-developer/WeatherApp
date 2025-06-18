// App.js
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import Navigation from '../navigation';

export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs(true); // 👈 Disable all warning logs
    // Or selectively ignore specific warnings:
    // LogBox.ignoreLogs(['Warning: ...']);
  }, []);

  return <Navigation />;
}
