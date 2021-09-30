import React from 'react';
import Card from "../../components/Card";
import logo from '../../assets/logo_cubos.svg';
import './styles.css'
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useForm } from 'react-hook-form'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import makeUrl from '../../utils/makeUrl';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

export default function Register() {

  const { register, watch, formState: { errors }, handleSubmit } = useForm();
  const [able, setAble] = useState(true);
  const [apiError, setApiError] = useState('');
  const history = useHistory();
  const emailWatch = watch('email');
  const passwordWatch = watch('password');
  const nameWatch = watch('name');

  useEffect(() => {
    const watchs = {

      email: emailWatch,
      password: passwordWatch,
      name: nameWatch

    }
    let valid = true;
    Object.entries(watchs).map(([field, value]) => {
      if (!value) {
        valid = false;
      }
      return []
    })
    setAble(valid);

  }, [emailWatch, passwordWatch, nameWatch]);

  useEffect(() => {
    if (apiError) {
      toast.error(apiError);
    }
  }, [apiError])

  async function formSubmit(data) {

    setApiError('');
    console.log(data);
    const res = await fetch(makeUrl('register'), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      }

    })

    const resData = await res.json();
    console.log(resData);
    if (res.ok) {
      history.push('/login')
    }
    setApiError(resData);

  }

  return (
    <main className="l-register">
      <Card>
        <img className="c-card__img" src={logo} alt="logo da cubos" />

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
            placeholder='email@exemplo.com'
            {...register('email', { required: true })}
          />
          <Input
            title='Senha'
            id='password'
            {...register('password', { required: true, minLength: 8 })}
          />
          {errors.password?.type === 'minLength' && <span className="l-register__span" >A senha deve conter 8 dígitos</span>}
          <Button disabled={!able} type='submit' className={able ? 'c-button--able' : 'c-button--disabled'}>Criar conta</Button>
        </form>
      </Card>
      <footer className="l-register__footer">
        <p className="l-register__p" >Já possui uma conta? </p><Link className="l-register__link" to="/login">Acesse agora!</Link>
      </footer>
    </main >
  )
}