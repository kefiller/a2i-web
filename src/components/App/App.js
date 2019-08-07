import React from 'react';
import './App.css';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Workplane from '../Workplane';
import Footer from '../Footer';

import HttpApiClient from '../../services/HttpApiClient';

function App() {

  const client = new HttpApiClient({
    url: '/api/v1/',
    auth: 'uyLH5PA0MngNyRaPQvr386SOSUiXU8'
  });

  client.a2iCampaignTtsGet('mytestcamp2', '123')
    .then((data) => {
      console.log('request OK', data);
    })
    .catch((error) => {
      console.log('request Error', error);
    });

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
