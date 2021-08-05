import Reac, {useContext} from "react";
import Provider, { Context } from './AccordionContext';
// import { InjectedContext } from 'components/AccordionContext';

const Sample: React.FC = (InjectedContext) => {

  const context = useContext(Context)
  // console.log(context.accordionState)

  // Context.accordionState['easing']

  // Context.setAccordionState((accordionState) => ({
  //   ...accordionState,
    
  // }));
  return (
    <>
      <p>あああああ</p>
    </>
  );
}

export default Sample;