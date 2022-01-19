import React, {useState} from 'react';
import 'reactstrap';
import { Button, Container, Nav, Navbar, NavbarBrand, NavbarText, NavLink } from 'reactstrap';
import './App.css';


function App() {
  let type: string, setType: any;
  [type, setType] = useState("btn-success");
  return <div className="App">
    <Container>
      <button className={type} onClick={() => setType((prev:string) => {return prev=="btn-success" ? "btn-primary" : "btn-success"})}>{type} button!</button>
    </Container>
  </div>;
}

export default App;