import  { Button, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';
import logo from "./resources/logo_typinglite.png";

function NavigationBar() {
  return <Navbar variant="dark" bg="dark">
    <NavbarBrand style={{marginLeft:"1%"}}>
      <img src={logo} style={{height:"50px", width:"150px"}}/>
    </NavbarBrand>
    <Nav style={{marginLeft:"50px"}}>
      <NavLink href="#">Typing </NavLink>
      <NavLink href="#" style={{marginLeft:"20px"}}>About</NavLink>
    </Nav>
    <div style={{position:"absolute", right:"1%"}}>
    <Nav>
      <NavLink href="#">Login</NavLink>
    </Nav>
    </div>
  </Navbar>
}


export default NavigationBar;