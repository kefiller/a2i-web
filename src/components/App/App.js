import React from 'react';
import './app.css';

import Header from '../pages/header';
import Sidebar from '../pages/sidebar';
import Workplane from '../pages/workplane';
import Footer from '../pages/footer';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <Header />
        <div className="mainplane row" >
          <Sidebar  className="col-2"/>
          <Workplane className="col-10"/>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
