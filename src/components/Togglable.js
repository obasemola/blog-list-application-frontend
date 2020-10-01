import React, { useImperativeHandle, useState } from 'react';


export default React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenInvisible = { display: visible ? '' : 'none' };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenInvisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>

  )
}
)