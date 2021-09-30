import './styles.css'
import logo from '../../assets/logo_cubos_white.svg';
import homeLogo from '../../assets/home_logo.svg'
import moneyLogo from '../../assets/money_logo.svg'
import usersLogo from '../../assets/users_logo.svg'
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../Button';

export default function SideBar() {
  const location = useLocation()

  useEffect(() => {

    const items = document.getElementsByClassName('c-side-bar__menu-item');
    for (const item of items) {
      const path = location.pathname.replace('/', '')
      console.log(path);
      if (item.id === path) {
        item.classList.add('c-side-bar__menu-item--able');
      }
    }

  }, [location])

  return (
    <aside className="c-side-bar">
      <img className="c-side-bar__logo" src={logo} alt="logo cubos" />

      <div className="c-side-bar__menu">
        <Link id="home" to="/home" className="c-side-bar__menu-item">
          <img src={homeLogo} alt="logo home" />
          <p>HOME</p>
        </Link>
        <Link id="invoice-collection" to="/invoice-collection" className="c-side-bar__menu-item">
          <img src={moneyLogo} alt="logo money" />
          <p>COBRANÇAS</p>
        </Link>
        <Link id="clients" to="/clients" className="c-side-bar__menu-item">
          <img src={usersLogo} alt="logo users" />
          <p>CLIENTES</p>
        </Link>
      </div>

      <Button className="c-button--able">Criar cobrança</Button>

    </aside>
  )
}