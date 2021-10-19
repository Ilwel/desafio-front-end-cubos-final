import "./styles.css";
import "./styles.css"
import Card from "../../components/Card"
import trashIcon from '../../assets/trash.svg';
import DropDown from "../../components/DropDown"
import Input from '../../components/Input'
import Button from "../../components/Button"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useHistory } from "react-router"
import useCurrencyMask from "../../utils/useCurrencyFormat"
import makeUrl from "../../utils/makeUrl"
import ModalLoading from "../../components/ModalLoading"
import { toast } from 'react-toastify';
import ModalDeleteCharge from "../ModalDeleteCharge";

export default function ModalEditDeleteCharge(props) {
  const { register, watch, handleSubmit, reset, setValue, control } = useForm();
  const history = useHistory();
  const [able, setAble] = useState();
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const currencyFormat = { prefix: 'R$ ', radixPoint: ',', groupSeparator: '.' }
  const currency = useCurrencyMask(register, currencyFormat);
  const [value, setChargeValue] = useState();

  const clientWatch = watch('client');
  const statusWatch = watch('paid');
  const valueWatch = watch('value');
  const dueDateWatch = watch('due_date');
  const descriptionWatch = watch('description');

  useEffect(() => {

    async function load() {

      const token = localStorage.getItem('token');
      const res = await fetch(makeUrl('client'), {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      const res2 = await fetch(makeUrl('charge') + `/${props.id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      const resData2 = await res2.json();

      const resData = await res.json();

      if (res.ok) {
        localStorage.setItem('clients', JSON.stringify(resData));
        setClients(resData);
        setValue('client', resData2.client_id);
        setValue('description', resData2.description);
        setValue('paid', resData2.paid ? "true" : "false");
        setValue('due_date', resData2.due_date.substring(0, 10));
        setChargeValue(resData2.value);
        currency.current.value = resData2.value;
        return
      }

    }
    load();


  }, [setValue, props.id, currency])

  useEffect(() => {
    console.log(currency.current.value);
    setValue('value', currency.current.value);
    const watchs = {

      client: clientWatch,
      status: statusWatch,
      // value: valueWatch,
      dueDate: dueDateWatch,
      description: descriptionWatch

    }
    let valid = true;
    Object.entries(watchs).map(([field, value]) => {
      if (!value) {
        valid = false;
      }
      return []
    })
    if (!value) {
      valid = false;
    }
    setAble(valid);

  }, [clientWatch, statusWatch, valueWatch, dueDateWatch, descriptionWatch, currency, setValue, value]);

  useEffect(() => {

    if (apiError) {
      toast.error(apiError);
      setApiError('');
    }
    if (successMsg) {
      toast.success(successMsg);
      setSuccessMsg('');
    }

  }, [apiError, successMsg])

  async function submitForm(data) {

    data.value = currency.current.value;
    data.value = Number(data.value.replace(/[^0-9]/g, ""));
    const token = localStorage.getItem('token');
    data.client_id = clientWatch;
    console.log(data);
    if (data.paid === 'true') {
      data.paid = true;
    } else {
      data.paid = false;
    }
    console.log(data);
    setOpen(true)
    const res = await fetch(makeUrl('charge') + `/${props.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const resData = await res.json();
    setOpen(false);
    if (res.ok) {
      setSuccessMsg(resData);
      props.setOpen(false);
      history.go(0);
      return;
    }
    setApiError(resData)


  }

  function handleValue(value) {

    setChargeValue(value);

  }

  function handleCancellButton() {

    reset();
    setOpenDelete(false);
    props.setOpen(false);

  }

  async function handleDelete() {

    const token = localStorage.getItem('token');
    const res = await fetch(makeUrl('charge') + `/${props.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    const resData = await res.json();
    if (res.ok) {

      setSuccessMsg(resData);
      setOpenDelete(false);
      props.setOpen(false);
      history.go(0);
      return;

    }
    setApiError(resData);

  }

  return (

    <div className="modal">
      <ModalLoading open={open} />
      <div className="l-container edit add-charges">
        <Card>
          <p onClick={() => handleCancellButton()} className="c-card__close">X</p>
          <form className="c-card__form" onSubmit={handleSubmit(submitForm)}>
            <DropDown
              id="client-choice"
              title="Cliente"
              name="client"
              {...register('client', { required: true })}
            >
              {clients.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </DropDown>
            <Input
              type="text"
              title="Descrição"
              name="description"
              {...register('description', { required: true })}
            ></Input>
            <DropDown
              id="status-choice"
              title="Status"
              name="paid"
              {...register('paid', { required: true })}
            >
              <option value={true} >PAGO</option>
              <option value={false} >PENDENTE</option>

            </DropDown>
            <div className="last-inputs">
              <Controller
                control={control}
                name="value"
                render={({ field }) => (
                  <Input
                    onBlur={(e) => handleValue(e.target.value)}
                    className="c-card__money-input"
                    type="tel"
                    inputMode="numeric"
                    title="Valor"
                    ref={currency}
                  />
                )}
              />

              <Input
                title="Vencimento"
                type="date"
                name="due_date"
                {...register('due_date', { required: true })}
              />
            </div>

            <div className="c-card__delete" onClick={() => setOpenDelete(true)}>
              <img src={trashIcon} alt="" />
              <p>Excluir Cobrança?</p>
            </div>

            <div className="l-container__form-buttons">
              <Button onClick={handleCancellButton} type='button' className='outline c-button--able'>Cancelar</Button>
              <Button disabled={!able} type='submit' className={able ? 'c-button--able' : 'c-button--disabled'}>Editar Cobrança</Button>
            </div>
          </form>
        </Card>
      </div>
      {openDelete && <ModalDeleteCharge handle={handleDelete} open={openDelete} setOpen={setOpenDelete} />}
    </div>
  )

}