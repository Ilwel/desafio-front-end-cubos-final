import { Link } from "react-router-dom";
import "./styles.css";

export default function ModalNavThree() {

  return (

    <div className="modal__nav two">
      <Link id="charges-pending" to="/home/report/pending" className="c-link">Previstas</Link>
      <Link id="charges-overdue" to="/home/report/overdue" className="c-link">Vencidas</Link>
      <Link id="client-paid" to="/home/report/paid" className="c-link">Pagas</Link>
    </div>

  )

}