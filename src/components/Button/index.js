import './styles.css'

export default function Button(props) {

  return (
    <button onClick={props.onClick} type={props.type} className={`c-button ${props.className}`} disabled={props.disabled}>
      {props.children}
    </button>
  )

}