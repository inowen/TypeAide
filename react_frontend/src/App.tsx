import React, { useRef } from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import TypingArea from './TypingArea';


function App() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  return <div className="App">
    <NavigationBar/>
    <TypingArea/>
    <div className="just-testing">
      <button ref={btnRef} className="testButton" onClick={() => {
        // Spin up the docker environment for this
        const myAsyncFunc = async () => {
          const url = "http://localhost:8080/api/v1/randomquote";
          // AJAX request
          let httpReq = new XMLHttpRequest();
          httpReq.addEventListener("load", (argument) => {
            const responseText = httpReq.responseText;
            if (pRef.current) {
              pRef.current.innerHTML = responseText;
            }
          });
          httpReq.open("GET", url);
          httpReq.send();
        }
        myAsyncFunc();
      }}>Testing ajax</button>
      <p ref={pRef} style={{color: "white"}}>This is the paragraph</p>
    </div>
    <Footer/>
  </div>;
}


export default App;