import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

// GitHub Pages에서 상세 URL을 새로고침해도 클라이언트 라우팅 복원
const redirect = sessionStorage.getItem('redirect');
if (redirect) { sessionStorage.removeItem('redirect'); history.replaceState(null, '', redirect); }

// A fresh home visit starts at the introduction instead of restoring a lower section.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
