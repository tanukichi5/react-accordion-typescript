import React from "react";
import Provider, { Context, InjectedAccordionState } from './AccordionContext';
import AccordionItem from "./AccordionItem";
import AccordionTrigger from "./AccordionTrigger";
import AccordionPanel from "./AccordionPanel";


import * as styles from "styles/AccordionStyle";


const Accordion: React.FC<InjectedAccordionState> = (props) => {
  // const childrenWithProps = React.Children.map(props.children, (child, i) => {
  //   // 各子要素をクローンしつつ index を渡す
  //   // console.log(i)
  //   return React.cloneElement(child, { panelIndex: i });
  // });

  return (
    <Provider>
      <Context.Consumer>
        {(options) => {
          const overrideOptions = {
            defaultExpandedPanels: !(props.defaultExpandedPanels === undefined)
              ? props.defaultExpandedPanels
              : options.accordionState.defaultExpandedPanels,
            multipleExpanded: !(props.multipleExpanded === undefined)
              ? props.multipleExpanded
              : options.accordionState.multipleExpanded,
            easing: !(props.easing === undefined)
              ? props.easing
              : options.accordionState.easing,
            duration: !(props.duration === undefined)
              ? props.duration
              : options.accordionState.duration,
            notTransition: !(props.notTransition === undefined)
              ? props.notTransition
              : options.accordionState.notTransition,
            content: !(props.content === undefined)
              ? props.content
              : options.accordionState.content,
            onOpen: !(props.onOpen === undefined)
              ? props.onOpen
              : options.accordionState.onOpen,
            onClose: !(props.onClose === undefined)
              ? props.onClose
              : options.accordionState.onClose,
          };
          Object.assign(options.accordionState, overrideOptions || {});

          return (
            <>
              {/* <div className="Accordion">{childrenWithProps}</div> */}
              <div css={styles.accordion}>
                {options.accordionState.content.map((content, index) => {
                  return (
                    <AccordionItem panelIndex={index} key={index}>
                      <div className="AccordionItem__header">
                        <AccordionTrigger>{content.title}</AccordionTrigger>
                      </div>
                      <AccordionPanel>
                        <div
                          css={styles.accordion_item__panel_content}
                          dangerouslySetInnerHTML={{
                            __html: content.detail,
                          }}
                        ></div>
                        {/* <p>{content.detail}</p> */}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </div>
            </>
          );
        }}
      </Context.Consumer>
    </Provider>
  );
};

export default Accordion;
