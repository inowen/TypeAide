import React, {useState} from 'react';
import {NavbarToggler, Collapse, NavItem} from 'reactstrap';
import 'reactstrap';
import { Button, Container, Nav, Navbar, NavbarBrand, NavbarText, NavLink, Row, Col} from 'reactstrap';
import './App.css';

function Header() {
  return <div className="">
    <Navbar color='dark' dark expand={false} role="navigation">
      <Nav className="mr-auto" navbar>
        <Container fluid="md">
          <Row>
          <Col>
          <NavItem>
            <NavLink href="/">Typing</NavLink>
          </NavItem>
          </Col>
          <Col>
          <NavItem>
            <NavLink href="/">Stats</NavLink>
          </NavItem>
          </Col>
          <Col>
          <NavItem>
            <NavLink href="/">About</NavLink>
          </NavItem>
          </Col>
          <Col>
          <NavItem>
            <NavLink href="/">Login</NavLink>
          </NavItem>
          </Col>
          </Row>
        </Container>
      </Nav>
    </Navbar>
  </div>
}

function ChangingButton(props: any) {
      return <button className={props.type} onClick={
        () => props.setType((prev:string) => {
          return prev=="btn-success" ? "btn-primary" : "btn-success";
        })
      }>{props.type} button!</button>
}

function App() {
  let type: string, setType: any;
  [type, setType] = useState("btn-success");
  return <div className="App">
    <Header/>
    <Container className="mt-2">
      <h2 className="text-info">This is a header</h2>
      <ChangingButton type={type} setType={setType}/>
    </Container>
  </div>;
}

export default App;