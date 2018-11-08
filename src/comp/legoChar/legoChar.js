import Axios from 'axios';
import $ from 'jquery';
import 'bootstrap';
import '../../index.scss';

const legoBuilder = (partType, partIndex) => {
  let tempString = '';
  if (partIndex === undefined) {
    tempString = `<div id='${partType[0].id}' class='printedDiv'>
                        <img src=${partType[0].imageUrl}>
                      </div>`;
  } else if (partIndex === 8) {
    tempString = `<div id='${partType[0].id}' class='printedDiv'>
                        <img src=${partType[0].imageUrl}>
                      </div>`;
  } else {
    tempString = `<div id='${partType[partIndex].id}' class='printedDiv'>
                        <img src=${partType[partIndex].imageUrl}>
                      </div>`;
  }
  return tempString;
};

const nameBuilder = (partType, partIndex) => {
  let tempString = '';
  if (partIndex === undefined) {
    tempString = `<p>${partType[0].name}</p>`;
  } else if (partIndex === 8) {
    tempString = `<p>${partType[0].name}</p>`;
  } else {
    tempString = `<p>${partType[partIndex].name}</p>`;
  }
  return tempString;
};

const getAndPrintLegos = (partType, partIndex) => {
  Axios.get(`http://localhost:3003/${partType}`).then((part) => {
    $(`#${partType}Div`).html(legoBuilder(part.data, partIndex));
    $(`#${partType}NameDiv`).html(nameBuilder(part.data, partIndex));
  });
};

const partsAtInit = () => {
  getAndPrintLegos('heads');
  getAndPrintLegos('torsos');
  getAndPrintLegos('legs');
};

const clickedPart = () => {
  $('.partDiv').on('click', (event) => {
    const partDiv = event.currentTarget.id;
    const part = partDiv.replace('Div', '');
    const partId = $(event.target).closest('.printedDiv')[0].id;
    const partIndex = parseInt((partId.replace('head', '').replace('torso', '').replace('leg', '')), 10);
    getAndPrintLegos(part, partIndex);
  });
};

const randomizer = () => {
  $('#randomizer').click(() => {
    let randomNum = Math.floor(Math.random() * 8);
    getAndPrintLegos('heads', randomNum);
    randomNum = Math.floor(Math.random() * 8);
    getAndPrintLegos('torsos', randomNum);
    randomNum = Math.floor(Math.random() * 8);
    getAndPrintLegos('legs', randomNum);
  });
};

const getAndFilterLegos = (partType, partId) => {
  Axios.get(`http://localhost:3003/${partType}`).then((parts) => {
    const filteredParts = parts.data.filter(part => part.id === partId);
    $(`#${partType}Div`).html(legoBuilder(filteredParts, 0));
    $(`#${partType}NameDiv`).html(nameBuilder(filteredParts, 0));
  });
};

const dropDownSelector = () => {
  $('.dropdown').on('click', (event) => {
    let partId = '';
    if (event.target.id !== 'dropdownMenuButton') {
      partId = event.target.id;
    }
    const partType = event.currentTarget.id.replace('DropDown', '');
    getAndFilterLegos(partType, partId);
  });
};

const dropDownBuilder = (partType) => {
  Axios.get(`http://localhost:3003/${partType}`).then((part) => {
    const tempString = `<div class="dropdown" id='${partType}DropDown'>
                          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ${partType}
                          </button>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id='${partType}Menu'>
                          </div>
                        </div>`;
    $(`#${partType}Drop`).html(tempString);
    let menuString = '';
    for (let i = 0; i < part.data.length; i += 1) {
      menuString += `<p class="dropdown-item" href="#" id='${part.data[i].id}'>${part.data[i].name}</p>`;
    }
    $(`#${partType}Menu`).append(menuString);
    dropDownSelector();
  });
};

export default {
  getAndPrintLegos,
  legoBuilder,
  partsAtInit,
  clickedPart,
  randomizer,
  dropDownBuilder,
  dropDownSelector,
  nameBuilder,
};
