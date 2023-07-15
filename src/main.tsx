import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'

declare global {
  interface Window {
    Android?: {
      showToast: (message: string) => void | undefined;
      getItem: () => void;
      webViewIsVisible: () => void | undefined;
    },
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
      showToast: (message: string) => void | undefined;
      getItem: () => void;
      webViewIsVisible: () => void | undefined;
    };
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
)
