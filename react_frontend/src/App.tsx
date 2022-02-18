import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import TypingTest from './TypingTest';


function App() {
  return <div className="App">
    <NavigationBar/>
    <TypingTest/>
    <Footer/>
  </div>;
}


export default App;