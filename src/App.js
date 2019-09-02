import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { Dashboard } from './components/Dashboard';
import { CursoDetalhe } from './components/curso/CursoDetalhe';
import { QuestionarioList } from './components/questionario/QuestionarioList';
import { Login } from './components/login/Login';

toast.configure()

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Login}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/cursos/:id" component={CursoDetalhe}></Route>
      <Route path="/cursos/:idcurso/unidade/:idUnidade/questionario/:idquestionario" component={QuestionarioList}></Route>
    </BrowserRouter>
  );
}

export default App;
