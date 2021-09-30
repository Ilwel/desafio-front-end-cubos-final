import './styles.css'
import editIcon from '../../assets/edit_icon.svg'
import logoutIcon from '../../assets/logout_icon.svg'

export default function ModalProfile(props) {

  return (
    <>
      {props.open && (
        <div className="c-modal-profile">
          <div className="c-modal-profile__item first">
            <img src={editIcon} alt="" />
            Editar
          </div>
          <div className="c-modal-profile__item last">
            <img src={logoutIcon} alt="" />
            Sair
          </div>
        </div>
      )}
    </>
  )

}