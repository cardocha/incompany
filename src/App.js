import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CursoList } from './views/CursoList';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={CursoList}></Route>
    </BrowserRouter>
  );
}

export default App;
