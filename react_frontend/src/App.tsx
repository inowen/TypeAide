import React from 'react';
import './App.css';

function App() {

  return (
    <div className="App">
      <input type="text" onKeyDown={(event) => {
        console.log("Key pressed " + event.key)
        if (event.ctrlKey) {
          console.log("Control key is currently active");
        }
       }
      }/>

    </div>
  );

}

export default App;
