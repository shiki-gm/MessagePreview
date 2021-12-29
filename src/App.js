import "./styles.css";
import InputMessage from "./component/InputMessage";
import MessagePreview from "./component/MessagePreview";
import { useState } from "react";
import { SelectImage } from 'qimai-rc-business';
import React from 'react';



export default function App() {
  const [state, setState] = useState('')
  
  return (
    <div className="App">
      {/* 标准的到这里就可以了 */}
      {/* <InputMessage setState={setState} textVal={state} /> */}

      {/* 个人项目上用 */}
      <InputMessage setState={setState} textVal={state}>
        <div>
          <SelectImage
            onChange={(e) => {
              console.log(e);
            }}
            name='goodsImages'
            // limitFileSize={2}
            maxCount={15}
            // accept=".png, .jpg"
            env='yapi'
            // multiple={false}
          />
        </div>
      </InputMessage>
      <MessagePreview textVal={state}/>    


    </div>
  );
}
