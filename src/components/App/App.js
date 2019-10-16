import React from 'react';
import './app.css';

import Header from '../pages/header';
import Sidebar from '../pages/sidebar';
import Workplane from '../pages/workplane';
import Footer from '../pages/footer';

import CCSAPiService from '../../services/ccs-api-service';

const apiClient = new CCSAPiService({
  url: '/api/v1/',
  auth: 'uyLH5PA0MngNyRaPQvr386SOSUiXU8'
});

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <Header />
        <div className="mainplane row" >
          <Sidebar  className="col-2"/>
          <Workplane className="col-10" apiClient={apiClient}/>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
