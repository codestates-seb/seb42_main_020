import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

const Loading = lazy(() => import('./Components/Loading/Loading'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>
);
