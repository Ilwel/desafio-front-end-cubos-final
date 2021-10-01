import './styles.css'
import Card from '../Card';
import Input from '../Input';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import makeUrl from '../../utils/makeUrl';
import { toast } from 'react-toastify';
import ModalLoading from '../ModalLoading';

export default function ModalEditProfile(props) {
  const { register, watch, handleSubmit, reset } = useForm();
  const [able, setAble] = useState(true);
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [open, setOpen] = useState();
  const { userData, token, setUserData } = useContext(AuthContext);
  const nameWatch = watch('name');
  const emailWatch = watch('email');
  const passwordWatch = watch('password');
  const phoneWatch = watch('phone');
  const cpfWatch = watch('cpf');

  useEffect(() => {
    const watchs = {

      email: emailWatch,
      name: nameWatch,

    }
    let valid = true;
    if (passwordWatch || phoneWatch || cpfWatch) {
      setAble(valid)
    }
    Object.entries(watchs).map(([field, value]) => {
      if (!value) {
        valid = false;
      }
      return []
    })
    setAble(valid);

  }, [emailWatch, nameWatch, passwordWatch, phoneWatch, cpfWatch]);

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
    const res = await fetch(makeUrl('profile'), {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer' + token
      }

    })
    const res2 = await fetch(makeUrl('profile'), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer' + token
      }

    })
    const userDataApi = await res2.json();
    setUserData(userDataApi);
    const resData = await res.json();
    if (res.ok) {
      props.setOpen(false);
      setSuccessMsg(resData);
      reset();
      setOpen(false);
      return;
    }
    setOpen(false);
    setApiError(resData);
    console.log(resData);

  }

  return (
    <>
      {props.open && (
        <div className="c-modal-edit-profile">
          <ModalLoading open={open} />
          <Card>
            <p onClick={() => props.setOpen(false)} className="c-card__close">X</p>
            <h1 className="c-card__h1">
              EDITAR USUÁRIO
            </h1>
            <form action="" className="c-card__form" onSubmit={handleSubmit(formSubmit)}>
              <Input
                title='Nome'
                id='name'
                type='text'
                defaultValue={userData['name'] ? userData['name'] : ''}
                {...register('name', { required: true })}
              />
              <Input
                title='Email'
                id='email'
                type='email'
                defaultValue={userData['email'] ? userData['email'] : ''}
                {...register('email', { required: true })}
              />
              <Input
                title='Nova senha'
                id='password'
                placeholder="Deixar vazio para não editar"
                {...register('password')}
              />
              <Input
                title='Telefone'
                id='phone'
                type='text'
                defaultValue={userData['phone'] ? userData['phone'] : ''}
                placeholder="(71) 9 9333-2222"
                {...register('phone')}
              />
              <Input
                title='CPF'
                id='cpf'
                type='text'
                defaultValue={userData['cpf'] ? userData['cpf'] : ''}
                placeholder="222.222.222-22"
                {...register('cpf')}
              />
              <Button disabled={!able} type='submit' className={able ? 'c-button--able' : 'c-button--disabled'} >Editar conta</Button>
            </form>
          </Card>
        </div>
      )}
    </>
  )

}