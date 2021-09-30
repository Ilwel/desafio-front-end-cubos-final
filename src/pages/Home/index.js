import Card from '../../components/Card';
import SideBar from '../../components/SideBar';
import moneyLogo from '../../assets/money_logo.svg'
import usersLogo from '../../assets/users_logo.svg'
import './styles.css'
import BorderedCard from '../../components/BorderedCard';
import ProfileIcon from '../../components/ProfileIcon';

export default function Home() {
  return (
    <main className="l-home">
      <SideBar />
      <ProfileIcon />
      <div className="l-container-cards">
        <Card>
          <div className="c-card__title">
            <img src={usersLogo} alt="logo users" />
            Clientes
          </div>
          <div className="container">
            <BorderedCard>
              <h2 className="c-bordered-card__h2">Em dia</h2>
              <h1 className="c-bordered-card__h1">0</h1>
            </BorderedCard>
            <BorderedCard className="danger">
              <h2 className="c-bordered-card__h2">Inadimplentes</h2>
              <h1 className="c-bordered-card__h1">0</h1>
            </BorderedCard>
          </div>
        </Card>
        <Card>
          <div className="c-card__title">
            <img src={moneyLogo} alt="logo money" />
            Cobranças
          </div>
          <div className="container">
            <BorderedCard className="secondary">
              <h2 className="c-bordered-card__h2">Previstas</h2>
              <h1 className="c-bordered-card__h1">0</h1>
            </BorderedCard>
            <BorderedCard className="danger">
              <h2 className="c-bordered-card__h2">Vencidas</h2>
              <h1 className="c-bordered-card__h1">0</h1>
            </BorderedCard>
            <BorderedCard>
              <h2 className="c-bordered-card__h2">Pagas</h2>
              <h1 className="c-bordered-card__h1">0</h1>
            </BorderedCard>
          </div>
        </Card>
      </div>
    </main>
  )
}