import {

  BrowserRouter as Router,
  Route,
  Redirect,
  useLocation

} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import { useState } from "react";
import AuthContext from "./contexts/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AddClients from "./pages/AddClients";
import Clients from "./pages/Clients";


function RedirectToHome(props) {
  const location = useLocation();

  if (location.pathname !== "/login") {
    return <Redirect to={location.pathname} ></Redirect>
  }

  const token = localStorage.getItem('token');
  return token ? <Redirect to='/'></Redirect> : props.children

}

export default function Routes() {

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData }}>
      <Router>
        <Route path="/register" exact component={Register} />
        <RedirectToHome>
          <Route path="/login" exact component={Login} />
        </RedirectToHome>
        <ProtectedRoutes>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/invoice-collection" exact component={Home} />
          <Route path="/clients/add" exact component={AddClients} />
          <Route path="/clients" exact component={Clients} />
        </ProtectedRoutes>
      </Router>
    </AuthContext.Provider>

  )

}