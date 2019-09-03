import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { Dashboard } from './components/Dashboard';
import { CursoDetalhe } from './components/curso/CursoDetalhe';
import { QuestionarioList } from './components/questionario/QuestionarioList';
import { Login } from './components/login/Login';
import { Auth } from './api/Auth';
import { BarraTopo } from './components/BarraTopo';

toast.configure()

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/dashboard" exact component={Dashboard}></Route>
        <Route path="/cursos/:id" exact component={CursoDetalhe}></Route>
        <Route exact
          path="/cursos/:idcurso/unidade/:idUnidade/questionario/:idquestionario"
          component={QuestionarioList}>
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
