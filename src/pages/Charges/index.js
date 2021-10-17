import ScrollBar from "../../components/ScrollBar"
import ProfileIcon from "../../components/ProfileIcon"
import SideBar from "../../components/SideBar"
import "./styles.css"
import orderByIcon from '../../assets/order_by.svg';
import Card from "../../components/Card"
import { useState, useEffect } from "react";
import makeUrl from "../../utils/makeUrl";
import { formatReal, formatDate } from '../../utils/format';
import ModalLoading from "../../components/ModalLoading"
import SearchBar from "../../components/SearchBar";
import { toast } from 'react-toastify';

export default function Charges(props) {
  const [charges, setCharges] = useState([]);
  const [open, setOpen] = useState(false);
  const [apiError, setApiError] = useState('');
  const statusStyle = {
    'pago': 'up-to-date',
    'pendente': 'pending',
    'vencido': 'defaulting'
  }

  useEffect(() => {

    async function load() {

      const token = localStorage.getItem('token');
      setOpen(true);
      const res = await fetch(makeUrl('charge'), {
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

    }
    load();

  }, [])

  useEffect(() => {

    if (apiError) {
      toast.error(apiError);
      setApiError('');
    }

  }, [apiError]);

  async function handleClickSearch(search) {

    const token = localStorage.getItem('token');
    console.log(search);
    const res = await fetch(makeUrl('charge') + `?query=${search}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    const resData = await res.json();
    console.log(resData);
    if (res.ok) {

      setCharges(resData);
      return;

    }
    setCharges([]);
    setApiError(resData);

  }

  async function handleOrderByClick() {

    const token = localStorage.getItem('token');
    const res = await fetch(makeUrl('charge') + `?name=.`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    const resData = await res.json();
    console.log(resData);
    if (res.ok) {

      setCharges(resData);
      return;

    }
    setApiError(resData);

  }

  return (

    <div className="l-charges">
      <SideBar />
      <ProfileIcon />
      <ModalLoading open={open} />
      <SearchBar handle={handleClickSearch} />
      <div className="l-container charges">
        <div className="c-table">
          <div className="l-container__table-title">
            <span className="charge-id">ID</span>
            <span className="charge-client">
              Cliente
              <img onClick={handleOrderByClick} src={orderByIcon} alt="" />
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

                    <span className="charge-id section"># {item.charge_id}</span>
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