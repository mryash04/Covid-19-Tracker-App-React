import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import CovidData from "./components/CovidData";
import Map from "./components/Map";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/map">
            <Header />
            <Map />
          </Route>
          <Route path="/">
            <Header />
            <CovidData />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
