import { Link } from "react-router-dom";
import "./styles.css";

export default function ModalNavOne() {

  return (

    <div className="modal__nav">
      <Link id="client" to="/home/report/up-to-date" className="c-link">Clientes</Link>
      <Link id="charges" to="/home/report/pending" className="c-link">Cobranças</Link>
    </div>

  )

}