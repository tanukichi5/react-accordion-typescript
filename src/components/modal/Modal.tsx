import React, {useState, useEffect, useCallback, useRef} from "react";
import ModalPortal from './ModalPortal'
// import ModalDelay from './ModalDelay'
// import useEffectCustom from "./helpers/useEffectCustom";
import { attachEvent } from './helpers/attachEvent'
import { backFixed } from './helpers/backFixed'
import { retainFocus } from './helpers/retainFocus'

// import { css, keyframes } from '@emotion/react'
import * as styles from "styles/ModalStyle";

export interface InjectedModalState {
  id: string;
  sethogeState?:any;
  expanded: boolean;
  backFixed?: boolean;
  clickOutsideClose?: boolean;
  modalDOM?: React.RefObject<HTMLInputElement> | null,
  "aria-hidden"?: boolean,
  tabindex?: number,
  domHide?: boolean,
  animationType?: string,
  modalSource?: boolean,
  customStyles?: any
}



const Modal: React.FC<InjectedModalState> = (props) => {

  const modalElement = useRef(null)

  const [modalState, setModalState] = useState({
    id:props.id,
    expanded: props.expanded,
    backFixed: !(props.backFixed === undefined) ? props.backFixed : true,
    clickOutsideClose: !(props.clickOutsideClose === undefined) ? props.clickOutsideClose : true,
    "aria-hidden": !props.expanded,
    tabindex: -1,
    animationType: !(props.animationType === undefined) ? props.animationType : "animation",
    customStyles: !(props.customStyles === undefined) ? props.customStyles : {},
    domHide: !(props.domHide === undefined) ? props.domHide : true,
    modalSource: true,
    modalDOM: modalElement,
  });

  //モーダル枠のスタイル設定
  const modalStyle_container = !(modalState.customStyles.container === undefined)
  ? modalState.customStyles.container
  : styles.modal

  //モーダルオーバーレイのスタイル設定
  const modalStyle_overlay = !(modalState.customStyles.overlay === undefined)
  ? modalState.customStyles.overlay
  : styles.modal_overlay


  //propsが変更された場合
  useEffect(() => {

    setModalState({
      ...modalState,
      expanded: props.expanded,
      // clickOutsideClose: props.clickOutsideClose,
      modalDOM: modalElement,
      "aria-hidden": !props.expanded
    })

    // console.log(modalState.modalDOM.current)
    
  }, [props.expanded]);
  


  //modalStateが変更された場合
  useEffect(() => {

    //親要素のstateを変更
    props.sethogeState({
      expanded: modalState.expanded
    })

    const siteContent:Element = document.querySelector('.App') as Element

    if(modalState.expanded) {
      //モーダル開いた時
      console.log("開いた")

      //tabやescキーでのイベントを付与
      if(!(handleOnKeydown === undefined))
        handleOnKeydown.addEvent()

      //モーダルの外側をクリックで閉じるイベントを付与
      if(modalState.clickOutsideClose && !(handleOnClickOutSide === undefined))
        handleOnClickOutSide.addEvent()

      //"transition"や"animation"終了時にDOMを非表示にするイベントを削除
      // if(!(domHideEvent === undefined))
      //   domHideEvent.removeEvent()

      //サイトのメイン部分をスクリーンリーダーなどから除外する
      siteContent.setAttribute('aria-hidden', "true") 

      setModalState({
        ...modalState,
        modalSource: false,
      })
      
    } else {
      //モーダルが閉じた時
      console.log("閉じた")

      //tabやescキーでのイベントを削除
      if(!(handleOnKeydown === undefined))
        handleOnKeydown.removeEvent()

      //モーダルの外側をクリックで閉じるイベントを削除
      if(modalState.clickOutsideClose && !(handleOnClickOutSide === undefined))
        handleOnClickOutSide.removeEvent()

      //"transition"や"animation"終了時にDOMを非表示にするイベントを付与
      if(!(domHideEvent === undefined)) 
        domHideEvent.addEvent()

      //サイトのメイン部分をスクリーンリーダーなどを有効にする
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
      closeModal()
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
  //------------------------------

  //モーダルの外側クリックで閉じる
  const clickOutsideClose = useCallback((event) => {
    //idの内側かつ.modal-contentの外側
    if (event.target.closest(`#${modalState.id}`) && !event.target.closest(`.modal-content`)) {
      closeModal()
    }
  }, []);

  const handleOnClickOutSide = attachEvent(
    document,
    "click",
    clickOutsideClose
  );
  //------------------------------


  //cssアニメーション終了時にモーダルのDOMを非表示
  const animationEndDomHide = useCallback((event) => {
    console.log("アニメーション終了")

    setModalState({
      ...modalState,
      expanded: false,
      modalSource: true,
    })

    //"transition"や"animation"終了時にDOMを非表示にするイベントを削除
    if(!(domHideEvent === undefined))
        domHideEvent.removeEvent()

  }, [modalState.expanded]);

  const animationType = (v:string) => {
    let type;
    switch (v) {
      case "transition":
        type = "transitionend";
        break;
      case "animation":
        type = "animationend";
        break;
      default:
        type = "";
    }
    return type;
  };

  const domHideEvent = attachEvent(
    modalState.modalDOM.current,
    animationType(modalState.animationType),
    animationEndDomHide
  );
  //------------------------------



  //閉じる
  const closeModal = useCallback(() => {
    setModalState({
      ...modalState,
      expanded: false,
      modalSource: false,
    })
  }, []);


  if (modalState.domHide && modalState.modalSource) return null

  return (
    <ModalPortal>
      <div id={modalState.id} css={modalStyle_container} className={`modal`} tabIndex={modalState.tabindex} aria-hidden={modalState['aria-hidden']} ref={modalElement}>
        <div className="modal-content">
          {props.children}
        </div>
        <div className="modal-overlay" css={modalStyle_overlay}></div>
      </div>
    </ModalPortal>
  );


}

export default Modal;


