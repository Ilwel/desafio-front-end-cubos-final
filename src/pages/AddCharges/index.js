import ProfileIcon from "../../components/ProfileIcon"
import SideBar from "../../components/SideBar"
import "./styles.css"
import Card from "../../components/Card"
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


export default function AddCharges(props) {
  const { register, watch, handleSubmit, reset, setValue, control } = useForm();
  const history = useHistory();
  const [able, setAble] = useState();
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const currencyFormat = { prefix: 'R$ ', radixPoint: ',', groupSeparator: '.' }
  const currency = useCurrencyMask(register, currencyFormat);

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

      const resData = await res.json();

      if (res.ok) {
        localStorage.setItem('clients', JSON.stringify(resData));
        setClients(resData);
        setValue('client', resData[0].id);
        setValue('paid', 'true');
        return
      }

    }
    load();


  }, [setValue])

  useEffect(() => {
    const watchs = {

      client: clientWatch,
      status: statusWatch,
      value: valueWatch,
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
    setAble(valid);

  }, [clientWatch, statusWatch, valueWatch, dueDateWatch, descriptionWatch]);

  function handleCancellButton() {

    reset();
    history.push('/charges');


  }

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

    data.value = Number(data.value.replace(/[^0-9]/g, ""));
    const token = localStorage.getItem('token');
    data.client_id = clientWatch;
    if (data.paid === 'true') {
      data.paid = true;
    } else {
      data.paid = false;
    }
    console.log(data);
    setOpen(true)
    const res = await fetch(makeUrl('charge'), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const resData = await res.json();
    setOpen(false);
    if (res.ok) {
      history.push('/charges');
      setSuccessMsg(resData);
      return;
    }
    setApiError(resData)

  }

  function handleValue(value) {

    setValue('value', value);

  }

  return (

    <div className="l-charges">
      <SideBar />
      <ModalLoading open={open} />
      <div className="l-container add-charges">
        <h1 className="l-container__h1">CRIAR COBRANÇA</h1>
        <Card>
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
              defaultValue="true"
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
            <div className="l-container__form-buttons">
              <Button onClick={handleCancellButton} type='button' className='outline c-button--able'>Cancelar</Button>
              <Button disabled={!able} type='submit' className={able ? 'c-button--able' : 'c-button--disabled'}>Criar Cobrança</Button>
            </div>
          </form>
        </Card>
      </div>
      <ProfileIcon />
    </div >


  )

}