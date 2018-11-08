import 'bootstrap';
import './index.scss';
import legoChar from './comp/legoChar/legoChar';

const init = () => {
  legoChar.partsAtInit();
  legoChar.clickedPart();
  legoChar.randomizer();
  legoChar.dropDownBuilder('heads');
  legoChar.dropDownBuilder('torsos');
  legoChar.dropDownBuilder('legs');
};

init();
