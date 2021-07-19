import React, {useState, useContext, useRef, useEffect} from 'react'
import { Context as hogehoge, InjectedItemState } from "./ItemContext";

const AccordionPanel: React.FC = (props) => {

  const context = useContext(hogehoge)
  const paneleElement = useRef(null)


  
  useEffect(() => {
    //パネルのDOMを取得
    context.setItemState( itemState =>({
      ...itemState,
      panelDOM: paneleElement
    }));
  }, []);

  // console.log(paneleElement); 

  return (
    <div ref={paneleElement} className="AccordionPanel" style={context.panelStyles} {...context.panelAttributes}>
      {props.children}
    </div>
  );
}

export default AccordionPanel;