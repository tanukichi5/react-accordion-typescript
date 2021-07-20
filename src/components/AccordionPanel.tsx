import React, {useContext, useRef, useEffect} from 'react'
import { Context } from "./ItemContext";

const AccordionPanel: React.FC = (props) => {

  const context = useContext(Context)
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