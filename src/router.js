import {

  BrowserRouter as Router,
  Route,

} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';

export default function Routes() {

  return (

    <Router>
      <Route
        path="/register"
        exact
        component={Register}
      />
      <Route
        path="/login"
        exact
        component={Login}
      />
      <Route
        path="/home"
        exact
        component={Home}
      />
      <Route
        path="/invoice-collection"
        exact
        component={Home}
      />
      <Route
        path="/clients"
        exact
        component={Home}
      />
    </Router>

  )

}