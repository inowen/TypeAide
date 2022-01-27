import  { Button, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';

function NavigationBar() {
  return <Navbar variant="dark" bg="dark">
    <NavbarBrand style={{marginLeft:"1%"}}>
      Brand
    </NavbarBrand>
    <Nav>
      <NavLink href="#">Typing </NavLink>
      <NavLink href="#">About</NavLink>
    </Nav>
    <div style={{position:"absolute", right:"1%"}}>
    <Nav>
      <NavLink href="#">Login</NavLink>
    </Nav>
    </div>
  </Navbar>
}


export default NavigationBar;