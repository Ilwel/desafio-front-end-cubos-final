import {

  BrowserRouter as Router,
  Route,

} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import { useState } from "react";
import AuthContext from "./contexts/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

export default function Routes() {

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData }}>
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
        <ProtectedRoutes>
          <Route
            path="/"
            exact
            component={Home}
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
        </ProtectedRoutes>
      </Router>
    </AuthContext.Provider>

  )

}