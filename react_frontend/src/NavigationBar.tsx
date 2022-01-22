import './navbar.css'

function NavigationBar() {
  return <div className="nav nav-bar navigationbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="btn logo-btn with-margin">Logo</button>
          <button className="btn with-margin highlight-border navbar-button">Other</button>
        </div>
        <div className="navbar-right">
          <button className="btn login-btn with-margin navbar-button">Login</button>
        </div>
      </div>
  </div>
}


export default NavigationBar;