import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { Dashboard } from './components/Dashboard';
import { CursoDetalhe } from './components/curso/CursoDetalhe';
import { Login } from './components/login/Login';
import { UsuarioDetalhe } from './components/usuario/UsuarioDetalhe';

toast.configure()

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/dashboard" exact component={Dashboard}></Route>
        <Route path="/cursos/:id" exact component={CursoDetalhe}></Route>
        <Route path="/usuarios/:id" exact component={UsuarioDetalhe}></Route>
      </Switch>
    </HashRouter>

  );
}

export default App;
