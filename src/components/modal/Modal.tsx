import React, {useState, useEffect, useCallback, useRef} from "react";
import ModalPortal from './ModalPortal'
import { attachEvent } from './helpers/attachEvent'
import { backFixed } from './helpers/backFixed'
import { retainFocus } from './helpers/retainFocus'

export interface InjectedModalState {
  id: string;
  sethogeState?:any;
  expanded: boolean;
  backFixed?: boolean;
  closeClickOutSide?: boolean;
  modalDOM?: React.RefObject<HTMLInputElement> | null,
}

const Modal: React.FC<InjectedModalState> = (props) => {

  const modalElement = useRef(null)

  const [modalState, setModalState] = useState({
    id:props.id,
    expanded: props.expanded,
    backFixed: true,
    closeClickOutSide: true,
    modalDOM: modalElement
  });

  //propsが変更された場合
  useEffect(() => {

    setModalState({
      ...modalState,
      expanded: props.expanded,
      modalDOM: modalElement
    })

    console.log(modalState.modalDOM.current)
    
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


  const onKeydown = useCallback((event) => {
    // Escキー
    if (event.keyCode === 27) {
      console.log("Esc Key is pressed!");
      setModalState({
        ...modalState,
        expanded: false,
      })
    }
    // Tabキー
    if (event.keyCode === 9) {
      console.log("Tab Key is pressed!");
      retainFocus(event, modalState.modalDOM.current)
    }
  }, []);

  const handleOnKeydown = attachEvent(
    document,
    "keydown",
    onKeydown
  );

  
  if (!modalState.expanded) return null

  return (
    <ModalPortal>
      <div id={modalState.id} className="Modal" ref={modalElement}>
        {props.children}
      </div>
    </ModalPortal>
  );


}

export default Modal;

