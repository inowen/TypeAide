import React from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import TypingArea from './TypingArea';


function App() {
  return <div className="App">
    <NavigationBar/>
    <TypingArea/>
    <div className="just-testing">
      <button className="testButton" onClick={() => {
        // Spin up the docker environment for this
        const myAsyncFunc = async () => {
          let url = "/api/v1/randomquote";
          let response = await fetch(url);
          console.log(response);
        }
        myAsyncFunc();
      }}>Testing fetch</button>
    </div>
    <Footer/>
  </div>;
}


export default App;