import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router";

export default function ProtectedRoutes(props) {
  const { token } = useContext(AuthContext);

  return (
    <>
      {token ? (props.children) :
        <Redirect to="/login" />
      }
    </>
  )

}