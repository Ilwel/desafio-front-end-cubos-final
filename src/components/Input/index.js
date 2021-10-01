import React, { useState } from "react";
import showIcon from '../../assets/show.svg';
import dontShowIcon from '../../assets/dont_show.svg';

const Input = React.forwardRef((props, ref) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div
      className="c-card__form-control"
    >
      <label className="c-card__label" htmlFor={props.id}>{props.title}</label>
      {props.id === 'password' ? (
        <div className="c-card__input-control">
          <input
            placeholder={props.placeholder}
            className="c-card__input"
            id={props.id}
            type={passwordShown ? "text" : "password"}
            defaultValue={props.defaultValue}
            name={props.name}
            ref={ref}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
          <img onClick={togglePasswordVisiblity}
            className="c-card__icon"
            src={passwordShown ? showIcon : dontShowIcon} alt="icone do password" />
        </div>

      ) : (
        <div className="c-card__input-control">
          <input
            placeholder={props.placeholder}
            className="c-card__input"
            id={props.id}
            type={props.type}
            defaultValue={props.defaultValue}
            name={props.name}
            ref={ref}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
      )}
    </div>
  )
})

export default Input;