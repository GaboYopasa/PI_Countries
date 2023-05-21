import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './components/Landing/Landing';
import Home from "./components/Home/Home";
import CreateActivity from './components/CreateActivity/CreateActivity';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = "/" component = {Landing}/>
          <Route exact path = "/home" component = {Home}/>
          <Route exact path = "/activity" component = {CreateActivity}/>
          <Route exact path = "/home/:id" component = {Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
