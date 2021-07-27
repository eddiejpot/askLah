import React from 'react';

const Button = ({ onClick = null, text = null }) => (<button onClick={onClick}>{text}</button>);
export default Button;
