import './styles.css'
import Card from '../Card';
import Input from '../Input';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { useEffect, useState } from 'react';

export default function ModalEditProfile(props) {
  const { register, watch, handleSubmit } = useForm();
  const [able, setAble] = useState(true);
  const nameWatch = watch('name');
  const emailWatch = watch('email');
  const passwordWatch = watch('password');
  const phoneWatch = watch('phone');
  const cpfWatch = watch('cpf');

  useEffect(() => {
    const watchs = {

      email: emailWatch,
      password: passwordWatch,
      name: nameWatch,
      phone: phoneWatch,
      cpf: cpfWatch

    }
    let valid = true;
    Object.entries(watchs).map(([field, value]) => {
      if (!value) {
        valid = false;
      }
      return []
    })
    setAble(valid);

  }, [emailWatch, passwordWatch, nameWatch, phoneWatch, cpfWatch]);

  async function formSubmit(data) {
    console.log(data);
  }

  return (
    <>
      {props.open && (
        <div className="c-modal-edit-profile">
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
                {...register('name', { required: true })}
              />
              <Input
                title='Email'
                id='email'
                type='email'
                {...register('email', { required: true })}
              />
              <Input
                title='Nova senha'
                id='password'
                {...register('password', { required: true })}
              />
              <Input
                title='Telefone'
                id='phone'
                type='text'
                placeholder="(71) 9 9333-2222"
                {...register('phone', { required: true })}
              />
              <Input
                title='CPF'
                id='cpf'
                type='text'
                placeholder="222.222.222-22"
                {...register('cpf', { required: true })}
              />
              <Button disabled={!able} type='submit' className={able ? 'c-button--able' : 'c-button--disabled'} >Editar conta</Button>
            </form>
          </Card>
        </div>
      )}
    </>
  )

}