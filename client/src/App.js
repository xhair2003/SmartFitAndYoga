import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { Toaster } from 'react-hot-toast';
<<<<<<< HEAD
import { IoLogoWechat } from "react-icons/io5";

const App = () => {
  return (
    //<GoogleOAuthProvider clientId={process.env.REACT_APP_GG_CLIENT_ID}>
      <div>
        <Toaster position="top-right" />
=======


const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
>>>>>>> cefe2b1d5a94b9f9d5539108e7d2a41638084db1
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            return (
              <Route key={route.id} path={route.path} element={<Page />} />
            );
          })}
        </Routes>
      </Router>
      <div style={chatIconStyle}>
        <IoLogoWechat size={50} color="white" />
      </div>
    </div>
  );
};
const chatIconStyle = {
  position: 'fixed',
  bottom: '15px',
  right: '20px',
  padding: '15px',
  cursor: 'pointer',
};

export default App;
