import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {RecoilRoot} from "recoil";
import ErrorBoundary from "./components/ErrorBoundary";
import UserInfo from "./container/UserInfo";

ReactDOM.render(
  <React.StrictMode>
      <RecoilRoot>
        <ErrorBoundary>
            {/*<React.Suspense fallback={<div>Loading...</div>}>*/}
                <UserInfo/>
            {/*</React.Suspense>*/}
          </ErrorBoundary>
      </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
