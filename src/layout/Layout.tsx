import React, { useState } from 'react';
import { BrowserRouter, Outlet } from 'react-router-dom';

import { routes } from '../routes/RouteList';
// import Navbar from '../components/Nabar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Layout = () => {
  return (
    <div className="w-full h-full bg-gray-200">
      <div className="flex flex-no-wrap">
        <div className="w-full">
          <Navbar />
          <div>
            <Outlet />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
    // <Layout2 />
  );
};

export default Layout;
