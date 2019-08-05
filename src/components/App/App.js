import React from 'react';
import './App.css';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Workplane from '../Workplane';
import Footer from '../Footer';

import HttpApiClient from '../../services/HttpApiClient';

function App() {

  const client = new HttpApiClient({
    url: '/api/v1/'
  });
  client.ping()
    .then((data) => {
      console.log('outer ping OK', data);
    })
    .catch((error) => {
      console.log('outer ping Error', error);
    });

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
