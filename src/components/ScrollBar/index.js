import './styles.css';

export default function ScrollBar(props) {

  return (

    <div className="c-scrollbar-container">
      <div className="c-scrollbar">

        {props.children}

      </div>
    </div>

  )

}