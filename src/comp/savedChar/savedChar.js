import 'bootstrap';
import $ from 'jquery';
import './savedChar.scss';

const savedLegos = [];

const savedLegosBuilder = () => {
  let tempString = '<p id="savedTitle">Saved Lego People</p>';
  savedLegos.forEach((legoPerson) => {
    tempString += `<div class='savedLegosDiv'>
                          <p>${legoPerson.name}</p>
                          <img src=${legoPerson.head}>
                          <img src=${legoPerson.torso}>
                          <img src=${legoPerson.legs}>
                        </div>`;
  });
  $('#savedDiv').html(tempString);
};

const saveLegos = () => {
  $('#saveButton').click(() => {
    const head = $('#headsDiv').find('img').attr('src');
    const torso = $('#torsosDiv').find('img').attr('src');
    const legs = $('#legsDiv').find('img').attr('src');
    const name = $('.nameDiv').text();
    savedLegos.push({
      name, head, legs, torso,
    });
    savedLegosBuilder();
  });
};

export default { saveLegos, savedLegosBuilder };
