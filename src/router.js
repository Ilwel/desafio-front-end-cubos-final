import {

  BrowserRouter as Router,
  Route,

} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
        component={Login}
      />
      <Route
        path="/produtos"
        component={Login}
      />
    </Router>

  )

}