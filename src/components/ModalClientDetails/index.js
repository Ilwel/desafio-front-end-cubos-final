import { useEffect } from 'react';
import { useState } from 'react';
import makeUrl from '../../utils/makeUrl';
import Card from '../Card';
import './styles.css';
import mailIcon from '../../assets/mail.svg';
import phoneIcon from '../../assets/phone.svg';
import ScrollBar from '../ScrollBar';
import { formatDate, formatReal } from '../../utils/format';

export default function ModalClientDetails(props) {
  const [client, setClient] = useState({});
  const [charges, setCharges] = useState([])

  const statusStyle = {
    'pago': 'up-to-date',
    'pendente': 'pending',
    'vencido': 'defaulting'
  }

  useEffect(() => {
    if (props.open) {
      async function load() {

        const token = localStorage.getItem('token');
        const res = await fetch(makeUrl(`client/${props.id}`), {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })

        const resData = await res.json();
        if (res.ok) {

          setClient(resData.Client);
          setCharges(resData.Charges);

        }


      }
      load();
    }

  }, [props.id, props.open]);

  function handleCloseButton() {

    props.setOpen(false);

  }

  return (

    <>
      {props.open && (
        <div className="c-modal-client-details">
          <Card>
            <p onClick={() => handleCloseButton()} className="c-card__close">X</p>
            <div className="c-card__infos">
              <h1>
                {client.name}
              </h1>
              <p className="c-card__cpf" >
                {client.cpf}
              </p>
              <div className="email-tel">
                <div>
                  <img src={mailIcon} alt="" />
                  {client.email}
                </div>
                <div>
                  <img src={phoneIcon} alt="" />
                  {client.phone}
                </div>
              </div>
              <div className="container-local">
                <div>
                  <h2>CEP</h2>
                  <p>{client.zip_code}</p>
                </div>
                <div>
                  <h2>Bairro</h2>
                  <p>{client.district}</p>
                </div>
                <div>
                  <h2>Cidade</h2>
                  <p>{client.city}</p>
                </div>
              </div>
              <div className="container-local adress">
                <h2>Logradouro</h2>
                <p>{client.adress}</p>
              </div>
              <div className="container-local complement">
                <div>
                  <h2>Complemento</h2>
                  <p>{client.complement}</p>
                </div>
                <div>
                  <h2>Ponto de referência</h2>
                  <p>{client.reference_point}</p>
                </div>
              </div>
            </div>
            <div className="c-card__charges">
              <ScrollBar>
                <ul>
                  {charges.map(item => (
                    <li key={item.charge_id}>
                      <Card>
                        <div>
                          <div>
                            <p className="charge_id">
                              #{item.charge_id}
                            </p>
                            <p>
                              {item.description}
                            </p>
                          </div>
                          <p className="charge_value">
                            R$ {formatReal(item.value)}
                          </p>
                        </div>
                        <div className="last">
                          <p className="charge_due-date">
                            {formatDate(item.due_date)}
                          </p>
                          <p className={`charge_status ${statusStyle[item.status]}`}>
                            {item.status.toUpperCase()}
                          </p>
                        </div>
                      </Card>
                    </li>
                  ))
                  }
                </ul>
              </ScrollBar>
            </div>
          </Card>
        </div>
      )}
    </>
  )

}