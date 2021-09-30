import './styles.css'
import editIcon from '../../assets/edit_icon.svg'
import logoutIcon from '../../assets/logout_icon.svg'
import ModalEditProfile from '../ModalEditProfile'
import { useState } from 'react'

export default function ModalProfile(props) {
  const [open, setOpen] = useState(false);

  function handleClickProfile() {
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
            <div className="c-modal-profile__item last">
              <img src={logoutIcon} alt="" />
              Sair
            </div>
          </div>
          <ModalEditProfile
            open={open}
            setOpen={setOpen}
          />
        </>
      )}
    </>
  )

}