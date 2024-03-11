import React from 'react';
import ReactDOM from 'react-dom/client';
import { Online, Offline } from "react-detect-offline"
import { Alert } from 'antd';

import App from './components/app/app';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        {/* <Online> */}
            <App />
        {/* </Online> */}
        {/* <Offline>
            <Alert type="error" message="No internet connection :c"/>
        </Offline> */}
    </>
);