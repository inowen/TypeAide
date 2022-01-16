import React from 'react';
import './App.css';


class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className="alert alert-success">
        This is some text.
        <div className="alert alert-warning">This is a subdiv with a warning</div>
        <div className="container-fluid">
          <div className="strong">This is strong text</div>
          <div className="lead">This is lead text</div>
          <button className="btn large btn-primary">Primary button</button>
          <button className="btn-default">Secondary small button</button>
        </div>
      </div>
  }

}

export default App;