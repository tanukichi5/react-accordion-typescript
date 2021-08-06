import React, {useState, useEffect, useCallback} from "react";
import ModalPortal from './ModalPortal'

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


function backFixed(fixed:boolean):any {

  //固定するスクロール要素を取得(htmlもしくはbody)
  /**
  * @see {@link https://canonono.com/web/js/scrolling-element}
  */
  const scrollElement:any = 'scrollingElement' in document
    ? document.scrollingElement
    : document.documentElement;

  //現在のスクロール量をセット、すでに固定されている場合はscrollElementにセットされているtopの値を使用
  const scrollY = fixed
    ? getScrollY()
    : parseInt(scrollElement.style.top);

  console.log(window.scrollY)

  //固定用CSS
  const styles:any = {
    position: 'fixed',
    top: `${scrollY * -1}px`,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  };

  //scrollElementに固定用CSSを反映
  for (const key in styles) {
    scrollElement.style[key] = fixed
      ? styles[key]
      : '';
  }

  !fixed ? scrollElement.classList.remove("is-backFixed") : scrollElement.classList.add("is-backFixed");

  //固定解除で元の位置にスクロール
  if (!fixed) window.scrollTo(0, scrollY * -1);
};

function getScrollY() {
  if ('scrollY' in window) return window.scrollY;
  if ('pageYOffset' in window) return window.pageYOffset;

  const doc = window.document;

  return doc.compatMode === 'CSS1Compat' ? doc.documentElement.scrollTop : doc.body.scrollTop;
}

function attachEvent(element: any, type: any, listener: any, options?: any) {
  return {
    addEvent() {
      element.addEventListener(type, listener, options);
    },
    removeEvent() {
      element.removeEventListener(type, listener);
    },
  };
}