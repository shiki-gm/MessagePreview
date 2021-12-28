import "./styles.css";
import InputMessage from "./component/InputMessage";
import MessagePreview from "./component/MessagePreview";
import { useState } from "react";



export default function App() {
  const [state, setState] = useState('')
  
  return (
    <div className="App">

      <InputMessage setState={setState} textVal={state}/>    
      <MessagePreview textVal={state}/>    


    </div>
  );
}
