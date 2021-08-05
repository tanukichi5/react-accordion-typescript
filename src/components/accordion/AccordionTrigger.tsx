import React, { useContext } from 'react'
import { Context } from "./ItemContext";
import { Context as  accordionContext} from "./AccordionContext";

import * as styles from "styles/AccordionStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";


const AccordionTrigger: React.FC = (props) => {
  const context = useContext(Context)
  const rootContext = useContext(accordionContext)

  //アコーディオンが開いているか？
  const itemExpanded = context.itemState['isExpanded']
  
  const toggleAccordion = () => {
    // console.log(itemExpanded)

    //アイテムの状態を変更
    context.setItemState( itemState =>({
      ...itemState,
      isExpanded: itemExpanded ? false : true
    }));

    //開いているパネルのindexを保存
    if(rootContext.accordionState['multipleExpanded']) {
      if(!(rootContext.accordionState['expandedPanels'] === undefined)) {
        itemExpanded 
          ? rootContext.accordionState['expandedPanels'].delete(context.itemState['index'])
          : rootContext.accordionState['expandedPanels'].add(context.itemState['index'])
      } else {

      }
      
      rootContext.setAccordionState( accordionState =>({
        ...accordionState,
        expandedPanels: rootContext.accordionState['expandedPanels']
      }));
    } else {
      rootContext.setAccordionState( accordionState =>({
        ...accordionState,
        //自身が開いている場合は閉じる
        expandedPanels: itemExpanded ? new Set() : new Set([context.itemState['index']])
      }));
    }

   };


  return (
    <button css={styles.accordion_item__triger} type="button" onClick={toggleAccordion} {...context.triggerAttributes}>
      {props.children}
      <FontAwesomeIcon icon={itemExpanded ? faMinus : faPlus} />
    </button>
  );
}

export default AccordionTrigger;