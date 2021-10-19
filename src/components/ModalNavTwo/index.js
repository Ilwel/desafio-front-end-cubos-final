import { Link } from "react-router-dom";
import "./styles.css";

export default function ModalNavTwo() {

  return (

    <div className="modal__nav two">
      <Link id="client-up-to-date" to="/home/report/up-to-date" className="c-link">Em dia</Link>
      <Link id="client-defaulting" to="/home/report/defaulting" className="c-link">Inadimplentes</Link>
    </div>

  )

}