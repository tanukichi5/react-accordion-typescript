import React from "react";
import { Provider, Context } from "./ItemContext";

interface Props {
  panelIndex: number
}

const AccordionItem: React.FC<Props> = (props) => {
  return (
    <Provider panelIndex={props.panelIndex}>
      <Context.Consumer>
        {(options) => {
          // console.log(options)
          return (
            <>
              <div className="AccordionItem">{props.children}</div>
            </>
          )
        }}
      </Context.Consumer>
    </Provider>
  );
};
// const AccordionItem = (props) => {
//   return (
//     <Provider panelIndex={props.panelIndex}>
//       <Context.Consumer>
//         {(options) => {
//           return (
//             <>
//               <div className="AccordionItem">{props.children}</div>
//             </>
//           )
//         }}
//       </Context.Consumer>
//     </Provider>
//   );
// };

export default AccordionItem;
