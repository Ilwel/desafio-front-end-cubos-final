import './styles.css'
import Input from '../Input';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { useEffect, useState } from 'react';
import makeUrl from '../../utils/makeUrl';
import { toast } from 'react-toastify';
import ModalLoading from '../ModalLoading';
import { useHistory } from 'react-router';

export default function ModalEditClient(props) {
  const { register, watch, handleSubmit, reset, setValue } = useForm();
  const [able, setAble] = useState(true);
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [open, setOpen] = useState();
  const nameWatch = watch('name');
  const emailWatch = watch('email');
  const phoneWatch = watch('phone');
  const cpfWatch = watch('cpf');
  const history = useHistory();

  function refreshUserForm() {

    const user = JSON.parse(localStorage.getItem('clientData'));

    setValue('name', user.name);
    setValue('email', user.email);
    setValue('phone', user.phone);
    setValue('cpf', user.cpf);
    setValue('zip_code', user.zip_code);
    setValue('adress', user.adress);
    setValue('district', user.district);
    setValue('city', user.city);
    setValue('complement', user.complement);
    setValue('reference_point', user.reference_point);

  }

  useEffect(() => {
    async function load() {
      if (props.id) {

        const token = localStorage.getItem('token');
        const res = await fetch(makeUrl(`client/${props.id}`), {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })

        const resData = await res.json();
        if (res.ok) {
          localStorage.setItem('clientData', JSON.stringify(resData.Client));
        }

        if (localStorage.getItem('clientData')) {

          const user = JSON.parse(localStorage.getItem('clientData'));

          setValue('name', user.name);
          setValue('email', user.email);
          setValue('phone', user.phone);
          setValue('cpf', user.cpf);
          setValue('zip_code', user.zip_code);
          setValue('adress', user.adress);
          setValue('district', user.district);
          setValue('city', user.city);
          setValue('complement', user.complement);
          setValue('reference_point', user.reference_point);

        }
      }
    }
    load();


  }, [props.open, props.id, setValue])


  useEffect(() => {
    const watchs = {

      email: emailWatch,
      name: nameWatch,
      phone: phoneWatch,
      cpf: cpfWatch,

    }
    let valid = true;
    Object.entries(watchs).map(([field, value]) => {
      if (!value) {
        valid = false;
      }
      return []
    })
    setAble(valid);

  }, [emailWatch, nameWatch, phoneWatch, cpfWatch]);

  useEffect(() => {
    if (apiError) {
      toast.error(apiError);
    }
  }, [apiError])

  useEffect(() => {
    if (successMsg) {
      toast.success(successMsg);
    }
  }, [successMsg])

  async function formSubmit(data) {
    setApiError('');
    setSuccessMsg('');
    setOpen(true);
    const token = localStorage.getItem('token');
    const res = await fetch(makeUrl(`client/${props.id}`), {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer' + token
      }

    })
    const res2 = await fetch(makeUrl(`client/${props.id}`), {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    const userDataApi = await res2.json();
    const resData = await res.json();
    if (res.ok) {
      props.setOpen(false);
      setSuccessMsg(resData);
      reset();
      setOpen(false);
      localStorage.setItem('clientData', JSON.stringify(userDataApi));
      refreshUserForm();
      history.go(0)
      return;
    }
    setOpen(false);
    setApiError(resData);

  }

  function handleCancellButton() {

    props.setOpen(false);
    localStorage.setItem('clientData', '');
    reset();

  }

  function handleCloseButton() {

    props.setOpen(false);
    localStorage.setItem('clientData', '');
    reset();

  }

  return (
    <>
      {props.open && (
        <main className="modal edit-client">
          <ModalLoading open={open} />
          <p onClick={() => handleCloseButton()} className="c-card__close">X</p>
          <div className="l-container-form">
            <div className="c-card">
              <form className="c-card__form" onSubmit={handleSubmit(formSubmit)}>
                <Input
                  title='Nome'
                  id='name'
                  type='text'
                  {...register('name', { required: true })}
                />
                <Input
                  title='Email'
                  id='email'
                  type='email'
                  {...register('email', { required: true })}
                />
                <div className="c-card__container_inputs">
                  <Input
                    title='CPF'
                    id='cpf'
                    type='text'
                    {...register('cpf', { required: true })}
                  />
                  <Input
                    title='Telefone'
                    id='phone'
                    type='text'
                    {...register('phone', { required: true })}
                  />
                  <Input
                    title='CEP'
                    id='zip-code'
                    type='text'
                    {...register('zip_code')}
                  />
                  <Input
                    title='Logradouro'
                    id='adress'
                    type='text'
                    {...register('adress')}
                  />
                  <Input
                    title='Bairro'
                    id='district'
                    type='text'
                    {...register('district')}
                  />
                  <Input
                    title='Cidade'
                    id='city'
                    type='text'
                    {...register('city')}
                  />
                  <Input
                    title='Complemento'
                    id='complement'
                    type='text'
                    {...register('complement')}
                  />
                  <Input
                    title='Ponto de Referência'
                    id='reference-point'
                    type='text'
                    {...register('reference_point')}
                  />
                </div>
                <div className="l-container__form-buttons">
                  <Button onClick={handleCancellButton} type='button' className='outline c-button--able'>Cancelar</Button>
                  <Button disabled={!able} type='submit' className={able ? 'c-button--able' : 'c-button--disabled'}>Editar cliente</Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      )}
    </>
  )

}