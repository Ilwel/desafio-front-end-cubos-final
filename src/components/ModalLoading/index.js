import "./styles.css"

export default function ModalLoading(props) {
  return (
    <>
      {props.open && (
        <div className="c-modal-loading">
          <div className="c-modal-loadin__loader"></div>
        </div>
      )}
    </>
  )
}