import React from 'react';
import "./styles.css"

const DropDown = React.forwardRef((props, ref) => {

  return (
    <div className="c-card__form-control drop-down">
      <label className="c-card__label" htmlFor={props.id}>{props.title}</label>
      <select
        placeholder={props.placeholder}
        className="c-card__drop-down"
        id={props.id}
        type={props.type}
        defaultValue={props.defaultValue}
        name={props.name}
        ref={ref}
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
        {props.children}
      </select>
    </div>
  )

})

export default DropDown;