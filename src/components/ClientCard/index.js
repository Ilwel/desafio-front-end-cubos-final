import "./styles.css";
import Card from "../Card";

export default function ClientCard(props) {

  return (

    <Card>
      {props.children}
    </Card>

  )

}