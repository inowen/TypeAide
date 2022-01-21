import { Nav, Navbar, NavbarBrand, NavLink } from "reactstrap";


function NavigationBar() {
  return <Navbar className="bg-dark">
    <NavbarBrand href="/">
        TLite
    </NavbarBrand>
    <Nav>
      <NavLink href="/">Test</NavLink>
    </Nav>
  </Navbar>
}


export default NavigationBar;