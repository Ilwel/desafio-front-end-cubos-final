import './styles.css'
import editIcon from '../../assets/edit_icon.svg'
import logoutIcon from '../../assets/logout_icon.svg'
import ModalEditProfile from '../ModalEditProfile'
import { useContext, useState } from 'react'
import AuthContext from '../../contexts/AuthContext';
import { useHistory } from 'react-router'

export default function ModalProfile(props) {
  const [open, setOpen] = useState(false);
  const { setToken } = useContext(AuthContext);
  const history = useHistory();

  function handleLogOut() {

    localStorage.setItem('token', '');
    setToken('');
    history.go('/login');

  }

  function handleClickProfile() {
    props.setOpen(false);
    setOpen(!open);
  }

  return (
    <>
      {props.open && (
        <>
          <div className="c-modal-profile">
            <div onClick={handleClickProfile} className="c-modal-profile__item first">
              <img src={editIcon} alt="" />
              Editar
            </div>
            <div onClick={handleLogOut} className="c-modal-profile__item last">
              <img src={logoutIcon} alt="" />
              Sair
            </div>
          </div>
        </>
      )}
      <ModalEditProfile
        open={open}
        setOpen={setOpen}
      />
    </>
  )

}