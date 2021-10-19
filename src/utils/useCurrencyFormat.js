import { useEffect, useRef } from 'react'
import Inputmask from "inputmask";

const useCurrencyMask = (register, options) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current && !register) return
    else {

      Inputmask({
        ...options,
        alias: 'currency',
        numericInput: true,
        rightAlign: false,
        positionCaretOnClick: "none",
        autoGroup: true,
        digitsOptional: false,
        onBeforeMask: function (value, opts) {
          return value;
        },

      }).mask(ref.current)

      register('value', ref.current);

    }


  }, [register, options])

  return ref
}

export default useCurrencyMask