import "./styles.css";
import InputMessage from "./component/InputMessage";
import MessagePreview from "./component/MessagePreview";
import { ModalContent  } from 'qimai-rc-business';
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';


export default function App() {
  const [state, setState] = useState('')
  const [modalSelected, setModalSelected] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log('useEffect', modalSelected);
  }, [modalSelected]);

  return (
    <div className="App">
      {/* 标准的到这里就可以了 */}
      {/* <InputMessage setState={setState} textVal={state} /> */}

      {/* 个人项目上用 */}
      <InputMessage setState={setState} textVal={state}>
      <React.Fragment>
        <Button type="primary" onClick={() => setVisible(true)}>
          打开我的图库
        </Button>
        <Modal
          title="我的图库"
          width={935}
          visible={visible}
          centered
          destroyOnClose
          onOk={() => {
            setVisible(false);
          }}
          onCancel={() => {
            setVisible(false);
          }}
          afterClose={() => {
            // setModalSelected([]);
          }}
        >
          <ModalContent
            setModalSelected={setModalSelected}
            env={'yapi'}
            // multiple={multiple}
          />
        </Modal>
      </React.Fragment>
      </InputMessage>
      <MessagePreview textVal={state}/>    


    </div>
  );
}
