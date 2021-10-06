import { useHistory } from "react-router";
import Button from "../../components/Button";
import ProfileIcon from "../../components/ProfileIcon";
import SideBar from "../../components/SideBar";
import "./styles.css"
import ScrollBar from "../../components/ScrollBar";
import ClientCard from "../../components/ClientCard";
import mailIcon from '../../assets/mail.svg';
import phoneIcon from '../../assets/phone.svg';
import editIcon from '../../assets/edit.svg';

export default function Clients() {
  const history = useHistory();

  function handleAddClients() {

    history.push('/clients/add');

  }

  return (
    <div className="l-clients">
      <SideBar />
      <ProfileIcon />
      <div className="l-container">
        <Button onClick={handleAddClients} className="outline c-button--able">Adicionar Cliente</Button>
        <div className="c-table">
          <div className="l-container__table-title">
            <span className="client">Cliente</span>
            <span className="charges-made">Cobranças Feitas</span>
            <span className="charges-received" >Cobranças Recebidas</span>
            <span className="status">Status</span>
          </div>
          <ScrollBar>
            <ul>
              {[0, 1, 2, 3, 4].map((item, i) => (<li className="item" key={`item_${i}`}>
                <ClientCard >
                  <span className="client section">
                    <h1 className="client__h1">
                      Nome e Sobrenome da Cliente
                    </h1>
                    <div className="infos">
                      <div className="info">
                        <img src={mailIcon} alt="" />
                        email@email.com
                      </div>
                      <div className="info">
                        <img src={phoneIcon} alt="" />
                        (DDD) 00000-0000
                      </div>
                    </div>

                  </span>
                  <span className="charges-made section">
                    R$ 00.000,00
                  </span>
                  <span className="charges-received section" >
                    R$ 00.000,00
                  </span>
                  <span className={`status section ${item % 2 === 0 ? 'up-to-date' : 'defaulting'}`}>
                    <p >

                      {item % 2 === 0 ? "EM DIA" : "INADIMPLENTE"}

                    </p>
                    <img className="edit" src={editIcon} alt="" />
                  </span>
                </ClientCard>
              </li>))}
            </ul>
          </ScrollBar>

        </div>
      </div>
    </div>
  )

}