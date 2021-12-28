
import { Button } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import "../styles.css";

export default function MessagePreview(props) {
  const {textVal} = props
  const [state, setState] = useState('')
  
  useEffect(() => {
    console.log(textVal)
    var temp = document.createElement("div");
    temp.innerHTML = textVal;
    var output = temp.innerText
    temp = null
    output = output.replace(/\&nbsp\;/gi, ' ')
    setState(output)
    console.log(output);
  }, [textVal])
  // .replace(/\&nbsp\;/gi, ' ')
  return (
    <div className='messagePreview'>
      {state}
    </div>
  );
}
