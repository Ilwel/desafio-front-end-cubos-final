import Card from "../../components/Card";
import logo from '../../assets/logo_cubos.svg';
import './styles.css'
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useForm } from 'react-hook-form'
import { useState, useEffect } from "react";

export default function Login() {

  const { register, watch, formState: { errors }, handleSubmit } = useForm();
  const [able, setAble] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const emailWatch = watch('email');
  const passwordWatch = watch('password');


  useEffect(() => {

    if (emailWatch === '' || passwordWatch === '' || emailWatch === undefined || passwordWatch === undefined) {
      setAble(false);
    } else {
      setAble(true);
    }

  }, [emailWatch, passwordWatch]);

  async function formSubmit(data) {

    console.log(data);

  }

  return (
    <main className="l-main">

      {(errors.password?.type === 'required' || errors.email?.type === 'required')}

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
    </main>
  )
}