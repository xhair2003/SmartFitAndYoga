import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';

const App = () => {
  return (
    <div>
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
    </div>
  );
};

export default App;
