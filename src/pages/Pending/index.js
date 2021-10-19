import ScrollBar from "../../components/ScrollBar"
import ProfileIcon from "../../components/ProfileIcon"
import SideBar from "../../components/SideBar"
import "./styles.css"
import pointerIcon from '../../assets/pointer.svg'
import Card from "../../components/Card"
import { useState, useEffect } from "react";
import makeUrl from "../../utils/makeUrl";
import { formatReal, formatDate } from '../../utils/format';
import ModalLoading from "../../components/ModalLoading";
import { toast } from 'react-toastify';
import ModalEditDeleteCharge from "../../components/ModalEditDeleteCharge";
import ModalNavOne from "../../components/ModalNavOne";
import ModalNavTwo from "../../components/ModalNavThree";

export default function Pending(props) {
  const [charges, setCharges] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [apiError, setApiError] = useState('');
  const [chargeId, setChargeId] = useState();
  const [openModalOne, setOpenModalOne] = useState(false);
  const [openModalTwo, setOpenModalTwo] = useState(false);
  const statusStyle = {
    'pago': 'up-to-date',
    'pendente': 'pending',
    'vencido': 'defaulting'
  }

  useEffect(() => {

    async function load() {

      const token = localStorage.getItem('token');
      setOpen(true);
      const res = await fetch(makeUrl('report/charges') + "?query=previstas", {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })

      const resData = await res.json();
      console.log(resData);
      if (res.ok) {
        localStorage.setItem('charges', JSON.stringify(resData));
        setCharges(resData);
        setOpen(false);
        return;
      }
      setOpen(false);

    }
    load();

  }, [])

  useEffect(() => {

    if (apiError) {
      toast.error(apiError);
      setApiError('');
    }

  }, [apiError]);

  function handleEditCharge(value) {

    const id = value.substring(1);
    setChargeId(id);
    setOpenEdit(true);

  }

  return (

    <div className="l-charges">
      <SideBar />
      <ProfileIcon />
      <ModalLoading open={open} />
      {openEdit && <ModalEditDeleteCharge id={chargeId} open={openEdit} setOpen={setOpenEdit} />}
      {openModalOne && <ModalNavOne />}
      {openModalTwo && <ModalNavTwo />}
      <div className="l-container charges">
        <div className="c-nav">
          <h1 onClick={() => setOpenModalOne(!openModalOne)} className="c-nav__first">Cobranças</h1>
          <img src={pointerIcon} alt="" />
          <h1 onClick={() => setOpenModalTwo(!openModalTwo)} className="c-nav__second">Previstas</h1>
        </div>
        <div className="c-table">
          <div className="l-container__table-title">
            <span className="charge-id">ID</span>
            <span className="charge-client">
              Cliente
            </span>
            <span className="charge-description">Descrição</span>
            <span className="charge-value">Valor</span>
            <span className="charge-status">Status</span>
            <span className="charge-due-date">Vencimento</span>
          </div>
          <ScrollBar>
            <ul>
              {charges.map((item, i) =>
                <li className="item" key={`item_${item.charge_id}`}>
                  <Card>

                    <span onClick={(e) => handleEditCharge(e.target.innerText)} className="charge-id section">#{item.charge_id}</span>
                    <span className="charge-client section">{item.name}</span>
                    <span className="charge-description section">{item.description}</span>
                    <span className="charge-value section">R$ {formatReal(item.value)}</span>
                    <span className={`charge-status section up-to-date ${statusStyle[item.status]}`}>
                      {item.status.toUpperCase()}
                    </span>
                    <span className="charge-due-date section">{formatDate(item.due_date)}</span>

                  </Card>
                </li>
              )}
            </ul>
          </ScrollBar>
        </div>
      </div>
    </div>


  )

}