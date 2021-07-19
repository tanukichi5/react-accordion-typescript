

import React, { useContext, useState, useRef } from "react";
import Provider, { Context, InjectedAccordionState } from 'components/AccordionContext';
import Sample from 'components/Sample';
import AccordionItem from "components/AccordionItem";
import AccordionTrigger from "components/AccordionTrigger";
import AccordionPanel from "components/AccordionPanel";



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

          console.log(options.accordionState.duration)

          return (
            <>
              {/* <div className="Accordion">{childrenWithProps}</div> */}
              <div className="Accordion">
                {options.accordionState.content.map((content, index) => {
                  return (
                    <>
                      <AccordionItem panelIndex={index} key={index}>
                        <div className="AccordionItem__header">
                          <AccordionTrigger>{content.title}</AccordionTrigger>
                        </div>
                        <AccordionPanel>
                          <p>{content.detail}</p>
                        </AccordionPanel>
                      </AccordionItem>
                    </>
                  );
                })}
                <Sample />
              </div>
            </>
          );
        }}
      </Context.Consumer>
    </Provider>
  );
};

export default Accordion;
