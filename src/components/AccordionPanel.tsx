import React, {useState, useContext, useRef, useEffect} from 'react'
import { Context as hogehoge, InjectedItemState } from "./ItemContext";

const AccordionPanel: React.FC = (props) => {

  const context = useContext(hogehoge)
  const paneleElement = useRef(null)


  
  useEffect(() => {
    // console.log(context.itemState)
    //パネルのDOMを取得
    context.setItemState( itemState =>({
      ...itemState,
      panelDOM: paneleElement
    }));
  }, [context.itemState['index']]);

  // console.log(paneleElement); 

  return (
    <div ref={paneleElement} className="AccordionPanel" {...context.panelAttributes}>
      {props.children}
    </div>
  );
}

export default AccordionPanel;