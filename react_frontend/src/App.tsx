import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import TypingTest from './TypingTest';


function App() {
  return <div className="App">
    <NavigationBar/>
    <TypingTest/>
  </div>;
}


export default App;