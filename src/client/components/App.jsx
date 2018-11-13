import React, { Component } from 'react';
import Nav from './Nav.jsx';
import AdminNav from './AdminNav.jsx';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

library.add(faStroopwafel)

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/admin" component={AdminNav} />
                    <Route path="/" component={Nav} />
                </Switch>
            </Router>
      );
    }
}

export default App;
