import  { Button, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';
import logo from "./resources/logo_typeaide.png";

function NavigationBar() {
  return <Navbar variant="dark" bg="dark" style={{padding:"4px"}}>
    <NavbarBrand style={{marginLeft:"1%"}}>
      <img src={logo} style={{height:"40px", width:"100px"}}/>
    </NavbarBrand>
    <Nav style={{marginLeft:"50px"}}>
      <NavLink href="#" style={{fontWeight:"bold"}}>Typing </NavLink>
      <NavLink href="#" style={{marginLeft:"20px", fontWeight:"bold"}}>About</NavLink>
    </Nav>
    <div style={{position:"absolute", right:"1%"}}>
    <Nav>
      <NavLink style={{fontWeight:"bold"}} href="#">Login</NavLink>
    </Nav>
    </div>
  </Navbar>
}


export default NavigationBar;