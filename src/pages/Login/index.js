import Card from "../../components/Card";
import logo from '../../assets/logo_cubos.svg';
import './styles.css'
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useForm } from 'react-hook-form'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeUrl from "../../utils/makeUrl";
import { useHistory } from "react-router";
import { toast } from 'react-toastify';

export default function Login() {

  const { register, watch, handleSubmit } = useForm();
  const [able, setAble] = useState(true);
  const [apiError, setApiError] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const history = useHistory();
  const emailWatch = watch('email');
  const passwordWatch = watch('password');

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    const watchs = {

      email: emailWatch,
      password: passwordWatch,

    }
    let valid = true;
    Object.entries(watchs).map(([field, value]) => {
      if (!value) {
        valid = false;
      }
      return []
    })
    setAble(valid);

  }, [emailWatch, passwordWatch]);

  useEffect(() => {
    if (apiError) {
      toast.error(apiError);
    }
  }, [apiError])

  async function formSubmit(data) {

    setApiError('');
    console.log(data);
    const res = await fetch(makeUrl('login'), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      }

    })

    const resData = await res.json();
    console.log(resData);
    if (res.ok) {
      history.push('/home')
    }
    setApiError(resData);

  }

  return (
    <main className="l-login">
      <Card>
        <img className="c-card__img" src={logo} alt="logo da cubos" />

        <form action="" className="c-card__form" onSubmit={handleSubmit(formSubmit)}>
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
            type={passwordShown ? "text" : "password"}
            togglePasswordVisiblity={togglePasswordVisiblity}
            passwordShown={passwordShown}
            {...register('password', { required: true })}
          />
          <Button disabled={!able} type='submit' className={able ? 'c-button--able' : 'c-button--disabled'}>Entrar</Button>
        </form>
      </Card>
      <footer className="l-login__footer">
        <p className="l-login__p" >Não tem uma conta? </p><Link className="l-login__link" to="/register">Cadastre-se!</Link>
      </footer>
    </main>
  )
}