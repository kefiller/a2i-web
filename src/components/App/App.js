import React from 'react';
import './App.css';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Workplane from '../Workplane';
import Footer from '../Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="mainplane" >
        <Sidebar />
        <Workplane />
      </div>
      <Footer />
    </div>
  );
}

export default App;
