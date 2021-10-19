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
import Charges from "./pages/Charges";
import AddCharges from "./pages/AddCharges";
import UpToDate from "./pages/UpToDate";
import Defaulting from "./pages/Defaulting";
import Pending from "./pages/Pending";
import Overdue from "./pages/Overdue";
import Paid from "./pages/Paid";


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
          <Route path="/home/report/up-to-date" exact component={UpToDate} />
          <Route path="/home/report/defaulting" exact component={Defaulting} />
          <Route path="/home/report/paid" exact component={Paid} />
          <Route path="/home/report/pending" exact component={Pending} />
          <Route path="/home/report/overdue" exact component={Overdue} />
          <Route path="/charges" exact component={Charges} />
          <Route path="/charges/add" exact component={AddCharges} />
          <Route path="/clients" exact component={Clients} />
          <Route path="/clients/add" exact component={AddClients} />
        </ProtectedRoutes>
      </Router>
    </AuthContext.Provider>

  )

}