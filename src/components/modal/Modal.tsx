import React, {useState, useEffect, useCallback} from "react";
import ModalPortal from './ModalPortal'
import { attachEvent } from './helpers/attachEvent'
import { backFixed } from './helpers/backFixed'

export interface InjectedModalState {
  id: string;
  sethogeState?:any;
  expanded: boolean;
  backFixed?: boolean;
  closeClickOutSide?: boolean;
}

const Modal: React.FC<InjectedModalState> = (props) => {

  const [modalState, setModalState] = useState({
    id:props.id,
    expanded: props.expanded,
    backFixed: true,
    closeClickOutSide: true
  });

  //propsが変更された場合
  useEffect(() => {

    setModalState({
      ...modalState,
      expanded: props.expanded
    })
    
  }, [props.expanded]);

  //modalStateが変更された場合
  useEffect(() => {

    props.sethogeState({
      expanded: modalState.expanded
    })

    if(modalState.expanded) {
      handleOnKeydown.addEvent()
    } else {
      handleOnKeydown.removeEvent()
    }
    
    //背景固定
    if(modalState.backFixed) backFixed(modalState.expanded)
    
  }, [modalState.expanded]);


  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      // キーコードを判定して何かする。
      console.log("Esc Key is pressed!");
      // props.sethogeState({
      //   expanded: false
      // })
      setModalState({
        ...modalState,
        expanded: false,
      })
    }
  }, []);

  const handleOnKeydown = attachEvent(
    document,
    "keydown",
    escFunction
  );


  
  // useEffect(() => {

    
    
  // }, [modalState.expanded]);


  if (!modalState.expanded) return null

  return (
    <ModalPortal>
      <div id={modalState.id} className="Modal">
        {props.children}
      </div>
    </ModalPortal>
  );


}

export default Modal;

