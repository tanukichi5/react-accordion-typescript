import React, {useState, useEffect, useCallback, useRef} from "react";
import ModalPortal from './ModalPortal'
import ModalDelay from './ModalDelay'
import useEffectCustom from "./helpers/useEffectCustom";
import { attachEvent } from './helpers/attachEvent'
import { backFixed } from './helpers/backFixed'
import { retainFocus } from './helpers/retainFocus'

import { css, keyframes } from '@emotion/react'
import * as styles from "styles/ModalStyle";

export interface InjectedModalState {
  id: string;
  sethogeState?:any;
  expanded: boolean;
  backFixed?: boolean;
  clickOutsideClose?: boolean;
  modalDOM?: React.RefObject<HTMLInputElement> | null,
  "aria-hidden"?: boolean,
  openedClass?: string,
  closedClass?: string,
  tabindex?: number,
  domHide?: boolean,
  animationType?: string,
  modalSource?: boolean,
  customStyles?: any
}



const Modal: React.FC<InjectedModalState> = (props) => {

  const modalElement = useRef(null)
  let modalSource = false

  const [modalState, setModalState] = useState({
    id:props.id,
    expanded: props.expanded,
    backFixed: true,
    clickOutsideClose: !(props.clickOutsideClose === undefined) ? props.clickOutsideClose : true,
    modalDOM: modalElement,
    "aria-hidden": true,
    openedClass: "is-open",
    closedClass: "is-close",
    tabindex: -1,
    domHide: !(props.domHide === undefined) ? props.domHide : true,
    animationType: !(props.animationType === undefined) ? props.animationType : "animation",
    modalSource: true,
    customStyles: !(props.customStyles === undefined) ? props.customStyles : {},
  });

  //モーダル枠のスタイル設定
  const modalStyle_container = !(modalState.customStyles.container === undefined)
  ? modalState.customStyles.container
  : styles.modal

  //モーダルオーバーレイのスタイル設定
  const modalStyle_overlay = !(modalState.customStyles.overlay === undefined)
  ? modalState.customStyles.overlay
  : styles.modal_overlay

  // const modalStyle_overlay = css`
  //   ${!(modalState.customStyles.overlay === undefined) ? modalState.customStyles.overlay : modal_overlay}
  //   `

  //propsが変更された場合
  useEffectCustom(() => {

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
  useEffectCustom(() => {

    //親要素のstateを変更
    props.sethogeState({
      expanded: modalState.expanded
    })

    const siteContent:Element = document.querySelector('.App') as Element

    if(modalState.expanded) {
      //モーダルオープン
      handleOnKeydown.addEvent()
      // domHideEvent.addEvent()
      if(!modalState.modalSource) domHideEvent.removeEvent()
      if(modalState.clickOutsideClose) handleOnClickOutSide.addEvent()
      siteContent.setAttribute('aria-hidden', "true") //サイトのメイン部分をスクリーンリーダーなどから除外する

      setModalState({
        ...modalState,
        modalSource: false,
      })
      
    } else {
      //モーダルクローズ
      handleOnKeydown.removeEvent()
      if(modalState.domHide && modalState.modalDOM) domHideEvent.addEvent()
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


  //cssアニメーション終了時にモーダルのDOMを非表示
  const animationEndDomHide = useCallback((event) => {
    if(!modalState.expanded) {
      console.log("アニメーション終了")
      console.log(modalState.domHide)
      setModalState({
        ...modalState,
        modalSource: true,
      })
    }

  }, []);

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



  //閉じる
  const closeModal = useCallback(() => {
    setModalState({
      ...modalState,
      expanded: false,
      modalSource: false,
    })
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setModalState({
  //       ...modalState,
  //       stateClass: modalState.expanded ? modalState.openedClass : modalState.closedClass,
  //     })
      
  //   }, 1000);
  // }, [modalState.expanded]);


  // function hoge() {
  //   let modalStateClass = "";
    // setTimeout(() => {

      
    // }, 1000);
  //   return modalStateClass
  // }


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


