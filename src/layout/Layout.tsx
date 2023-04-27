import React, { useState } from 'react';
import { BrowserRouter, Outlet } from 'react-router-dom';

import { routes } from '../routes/RouteList';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ScrollToTop from '../utils/ScrollToTop';

const Layout = () => {
  return (
    <div className="w-full h-full bg-gray-200">
      <div className="flex flex-no-wrap">
        <ScrollToTop />
        <div className="w-full">
          <Navbar />
          <div className="mt-7">
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
