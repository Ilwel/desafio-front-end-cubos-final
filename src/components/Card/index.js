import './styles.css'

export default function Card(props) {

  return (
    <div className="c-card">
      {props.children}
    </div>
  )

}