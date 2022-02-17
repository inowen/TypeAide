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
          const url = "http://localhost:8080/api/v1/randomquote";
          // AJAX request
          let httpReq = new XMLHttpRequest();
          httpReq.addEventListener("load", (argument) => {
            const responseText = httpReq.responseText;
            console.log(responseText);
          });
          httpReq.open("GET", url);
          httpReq.send();
        }
        myAsyncFunc();
      }}>Testing ajax</button>
    </div>
    <Footer/>
  </div>;
}


export default App;