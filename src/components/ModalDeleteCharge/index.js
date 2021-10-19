import "./styles.css"

export default function ModalDeleteCharge(props) {

  return (
    <div className="modal__delete-charge">
      <p>Apagar Item?</p>
      <div className="modal__buttons">
        <button onClick={props.handle} className="yes">Sim</button>
        <button onClick={() => props.setOpen(false)} className="no">Não</button>
      </div>
    </div>
  )

}