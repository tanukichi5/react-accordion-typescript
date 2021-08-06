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
  clickOutsideClose?: boolean;
  modalDOM?: React.RefObject<HTMLInputElement> | null,
}

const Modal: React.FC<InjectedModalState> = (props) => {

  const modalElement = useRef(null)

  const [modalState, setModalState] = useState({
    id:props.id,
    expanded: props.expanded,
    backFixed: true,
    clickOutsideClose: !(props.clickOutsideClose === undefined) ? props.clickOutsideClose : true,
    modalDOM: modalElement
  });

  //propsが変更された場合
  useEffect(() => {

    setModalState({
      ...modalState,
      expanded: props.expanded,
      // clickOutsideClose: props.clickOutsideClose,
      modalDOM: modalElement
    })

    console.log(modalState.modalDOM.current)
    
  }, [props.expanded]);

  //modalStateが変更された場合
  useEffect(() => {

    //親要素のstateを変更
    props.sethogeState({
      expanded: modalState.expanded
    })

    const siteContent:Element = document.querySelector('.App') as Element

    if(modalState.expanded) {
      handleOnKeydown.addEvent()
      if(modalState.clickOutsideClose) handleOnClickOutSide.addEvent()
      siteContent.setAttribute('aria-hidden', "true") //サイトのメイン部分をスクリーンリーダーなどから除外する

    } else {
      handleOnKeydown.removeEvent()
      if(modalState.clickOutsideClose) handleOnClickOutSide.removeEvent()
      siteContent.removeAttribute('aria-hidden')
    }
    
    //背景固定
    if(modalState.backFixed) backFixed(modalState.expanded)
    
  }, [modalState.expanded]);


  //Escキー : モーダル閉じる, Tabキー : モーダル内フォーカス移動
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

  //モーダルの外側クリックで閉じる
  const clickOutsideClose = useCallback((event) => {
    if (!event.target.closest(`#${modalState.id}`)) {
      setModalState({
        ...modalState,
        expanded: false,
      })
    }
  }, []);

  const handleOnClickOutSide = attachEvent(
    document,
    "click",
    clickOutsideClose
  );




  if (!modalState.expanded) return null

  return (
    <ModalPortal>
      <div className="modal-overlay"></div>
      <div id={modalState.id} className="Modal" ref={modalElement}>
        <div className="modal-content">
          {props.children}
        </div>
      </div>
    </ModalPortal>
  );


}

export default Modal;


