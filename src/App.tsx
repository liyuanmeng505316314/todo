
import * as React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Index from './component/Index'
import Login from './component/Login'
import SignUp from './component/SignUp'

class App extends React.Component {
  
  public render() {
    return (
    <Router>
       <Route path="/" exact={true} component={Index} />
       <Route path="/Login"         component={Login} />
       <Route path="/SignUp"        component={SignUp} />
    </Router>
    );
  }
}

export default App;

{/* <div className="App">
<Button type="primary">Primary</Button>
<Button>Default</Button>
<Button type="dashed">Dashed</Button>
<Button type="danger">Danger</Button>
</div> */}