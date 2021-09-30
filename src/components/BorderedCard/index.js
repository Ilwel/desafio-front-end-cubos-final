import "./styles.css"

export default function BorderedCard(props) {
  return (
    <div className={`c-bordered-card ${props.className}`}>
      {props.children}
    </div>
  )
}