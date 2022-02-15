import React from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import TypingArea from './TypingArea';


function App() {
  return <div className="App">
    <NavigationBar/>
    <TypingArea/>
    <Footer/>
  </div>;
}


export default App;