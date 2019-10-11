import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import routes from './routes';
import { get } from './api/ls';
import './App.css';


class App extends Component {

  // Verificar se o Usuário está logado, caso não esteja, redirecionar para login. Aceitar somente "SSBXXX"

  state = {
    user: get('user')
  }

  componentDidMount() {    
    
  }

  render() {

    return (
      <main className="App">
        <NavBar user={this.state.user} />
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
