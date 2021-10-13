import { useHistory } from "react-router";
import Button from "../../components/Button";
import ProfileIcon from "../../components/ProfileIcon";
import SideBar from "../../components/SideBar";
import "./styles.css"
import ScrollBar from "../../components/ScrollBar";
import mailIcon from '../../assets/mail.svg';
import phoneIcon from '../../assets/phone.svg';
import editIcon from '../../assets/edit.svg';
import Card from "../../components/Card";
import { useEffect } from "react";
import makeUrl from "../../utils/makeUrl";
import { useState } from "react";
import { formatReal } from '../../utils/format';
import ModalLoading from "../../components/ModalLoading";
import ModalClientDetails from "../../components/ModalClientDetails";
import ModalEditClient from "../../components/ModalEditClient";

export default function Clients() {
  const history = useHistory();
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [openEditClient, setOpenEditClient] = useState(false);
  const [clientId, setClientId] = useState();
  const statusStyle = {
    'em dia': 'up-to-date',
    'pendente': 'pending',
    'inadimplente': 'defaulting'
  }

  useEffect(() => {

    async function load() {

      const token = localStorage.getItem('token');
      setOpen(true);
      const res = await fetch(makeUrl('client'), {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      const resData = await res.json();
      console.log(res);
      if (res.ok) {
        localStorage.setItem('clients', JSON.stringify(resData));
        setClients(resData);
        setOpen(false);
        return;
      }

    }
    load();

  }, [])

  function handleAddClients() {

    history.push('/clients/add');

  }

  function handleClickClient(e) {

    const isItem = e.target.classList.contains('client__h1');
    if (!isItem) return;
    console.log(e.target.id);
    setClientId(e.target.id);
    setOpenClient(true);

  }

  function handleClickEditClient(e) {

    setOpenEditClient(true);
    setClientId(e.target.alt);

  }

  return (
    <div className="l-clients">
      <SideBar />
      <ProfileIcon />
      <ModalLoading open={open} />
      <ModalClientDetails open={openClient} id={clientId} setOpen={setOpenClient} />
      <ModalEditClient open={openEditClient} id={clientId} setOpen={setOpenEditClient} />
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
              {clients.map((item) => (<li className="item" key={`item_${item.id}`}>
                <Card>
                  <span className="client section">
                    <h1 onClick={(e) => handleClickClient(e)} id={item.id} className="client__h1">
                      {item.name}
                    </h1>
                    <div className="infos">
                      <div className="info">
                        <img src={mailIcon} alt="" />
                        {item.email}
                      </div>
                      <div className="info">
                        <img src={phoneIcon} alt="" />
                        {item.phone}
                      </div>
                    </div>

                  </span>
                  <span className="charges-made section">
                    R$ {formatReal(item.made_charges)}
                  </span>
                  <span className="charges-received section" >
                    R$ {formatReal(item.received_charges)}
                  </span>
                  <span className={`status section ${statusStyle[item.status]}`}>
                    <p >

                      {item.status.toUpperCase()}

                    </p>
                    <img onClick={handleClickEditClient} className="edit" src={editIcon} alt={item.id} />
                  </span>
                </Card>
              </li>))}
            </ul>
          </ScrollBar>

        </div>
      </div>
    </div>
  )

}