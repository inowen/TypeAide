import React, {useState} from 'react';
import 'reactstrap';
import { Container } from 'reactstrap';
import './App.css';
import NavigationBar from './NavigationBar';


function App() {
  let type: string, setType: any;
  [type, setType] = useState("btn-success");
  return <div className="App">
    <NavigationBar/>
    <Container className="mt-2">
      <h2 className="text-info">This is a header</h2>
      <ChangingButton type={type} setType={setType}/>
    </Container>
  </div>;
}

// This is testing code
function ChangingButton(props: any) {
      return <button className={props.type} onClick={
        () => props.setType((prev:string) => {
          return prev=="btn-success" ? "btn-primary" : "btn-success";
        })
      }>{props.type} button!</button>
}


export default App;