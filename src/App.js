import React, {Component} from 'react';
import  { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import routes from './routes';
import './App.css';

class App extends Component {

  state = {
    
  }

  render() {

    return (
      <main className="App">
        <NavBar />
        <Switch>
          {
            routes.map((r, i) => (<Route key={i} exact path={r.path} component={r.component} />))
          }
        </Switch>
      </main>
    )
  }  
}

export default App;
