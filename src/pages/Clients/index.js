import SideBar from '../../components/SideBar';
import './styles.css'
import ProfileIcon from '../../components/ProfileIcon';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import { getDataByCep } from '../../utils/viaCep';
import ModalLoading from '../../components/ModalLoading';
import makeUrl from '../../utils/makeUrl';
import AuthContext from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Clients() {
  const { register, watch, handleSubmit, reset, setValue } = useForm();
  const [able, setAble] = useState(true);
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [open, setOpen] = useState(false);
  const emailWatch = watch('email');
  const nameWatch = watch('name');
  const cpfWatch = watch('cpf');
  const phoneWatch = watch('phone');
  const cepWatch = watch('zip_code');

  useEffect(() => {
    const watchs = {

      email: emailWatch,
      name: nameWatch,
      cpf: cpfWatch,
      phone: phoneWatch

    }
    let valid = true;
    Object.entries(watchs).map(([field, value]) => {
      if (!value) {
        valid = false;
      }
      return []
    })
    setAble(valid);

  }, [emailWatch, nameWatch, cpfWatch, phoneWatch]);



  useEffect(() => {

    async function loadData(cep) {

      const resData = await getDataByCep(cep);
      setValue('adress', resData.logradouro);
      setValue('district', resData.bairro);
      setValue('city', resData.localidade);
      setValue('complement', resData.complemento);

    }

    async function load() {
      if (cepWatch?.indexOf('-') !== -1) {
        if (cepWatch?.length === 9) {
          await loadData(cepWatch);
        }
      }
      else if (cepWatch?.length === 8) {
        await loadData(cepWatch);
      }
    }
    load();
  }, [cepWatch, setValue])

  useEffect(() => {

    if (apiError) {
      toast.error(apiError);
    }
    if (successMsg) {
      toast.success(successMsg);
    }

  }, [apiError, successMsg])


  async function formSubmit(data) {
    
    const token = localStorage.getItem('token');

    setApiError('');
    console.log(data);
    setOpen(true);
    const res = await fetch(makeUrl('client'), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer' + token
      }

    })

    const resData = await res.json();
    console.log(resData);
    if (res.ok) {
      setSuccessMsg(resData);
      reset();
      setOpen(false);
      return;
    }
    setOpen(false);
    setApiError(resData);

  }


  return (
    <main className="l-clients">
      <SideBar />
      <ModalLoading open={open} />
      <div className="l-container-form">
        <h1 className="l-container__h1">
          ADICIONAR CLIENTE
        </h1>
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
              <Button className='outline c-button--able'>Cancelar</Button>
              <Button disabled={!able} type='submit' className={able ? 'c-button--able' : 'c-button--disabled'}>Adicionar cliente</Button>
            </div>
          </form>
        </div>
      </div>
      <ProfileIcon />
    </main>
  )
}
