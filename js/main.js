/* global data */

const $ulOperatorList = document.querySelector('.operators-list');
const $modal = document.querySelector('#modal-section');
const $class = document.querySelector('.classes-box');
const $classBox = document.querySelectorAll('.class-box');

const $operatorsTab = document.querySelector('#operators-tab');
const $squadsTab = document.querySelector('#squads-tab');
const $entryTab = document.querySelector('#entry-tab');

const $opsPage = document.querySelector('.opsPage');
const $squadPage = document.querySelector('.squadPage');

const $ulSquadList = document.querySelector('.squads-list');
const $noEntry = document.querySelector('.noEntry');

const $teamSlot = document.querySelector('.team-slot');
const $squadClass = document.querySelector('#squad-class');
const $liSlot = document.querySelectorAll('.op-slot');
const $plusIcon = document.querySelectorAll('.fa-plus');

const $form = document.querySelector('#form');
const $ulEntryList = document.querySelector('.entryList');
const $nameHeader = document.querySelector('.nameHeader');
const $squadHeader = document.querySelector('.squadHeader');
const $opSelector = document.querySelector('.opSelector');

$form.addEventListener('submit', handleSubmit);
$form.addEventListener('onsubmit', replaceSlot);
$ulSquadList.addEventListener('click', handleSelection);
$teamSlot.addEventListener('click', openOps);
$ulOperatorList.addEventListener('click', handleOperator);
$squadClass.addEventListener('click', handleFilter);
$class.addEventListener('click', handleFilter);

$operatorsTab.addEventListener('click', function () {
  $operatorsTab.classList.add('currentTab');
  $squadsTab.classList.remove('currentTab');
  $entryTab.classList.remove('currentTab');
  viewSwap('operators');
});
$squadsTab.addEventListener('click', function () {
  $operatorsTab.classList.remove('currentTab');
  $squadsTab.classList.add('currentTab');
  $entryTab.classList.remove('currentTab');
  viewSwap('squads');
});
$entryTab.addEventListener('click', function () {
  $entryTab.classList.add('currentTab');
  $operatorsTab.classList.remove('currentTab');
  $squadsTab.classList.remove('currentTab');
  viewSwap('new');
});

document.addEventListener('DOMContentLoaded', loadContent);

const xhr = new XMLHttpRequest();
const operatorArray = [];
let squadArray = [];
let imageArray = [];

xhr.open(
  'GET',
  'https://lfz-cors.herokuapp.com/?url=https://api.rhodesapi.com/api/operator?exclude=talents,rarity,artist,va,description,quote,voicelines,alter,affiliation,tags,range,statistics,trait,potential,trust,skills,costs,module,base,headhunting,recruitable,availability,release_dates',
);
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (const ops of xhr.response) {
    if (ops.name !== 'Kirin X Yato') {
      if (ops.art.length > 1) {
        handleList(ops);
        operatorArray.push(ops);
      }
    }
  }
});
xhr.send();

function handleList(ops) {
  $ulOperatorList.appendChild(renderList(ops));
  $ulSquadList.appendChild(renderList(ops));
}

function renderList(ops) {
  const artLink = ops.art[1].link;
  const $newImg = document.createElement('img');
  const $newLi = document.createElement('li');
  $newLi.setAttribute('data-id', ops.name);
  $newLi.setAttribute('data-class', ops.class[0]);
  $newLi.classList.add('operators');
  $newImg.classList.add('ops');
  $newImg.setAttribute('src', artLink);
  $newImg.setAttribute('alt', ops.name);
  $newLi.appendChild($newImg);

  return $newLi;
}

function renderOne(ops) {
  const $slotImg = document.createElement('img');
  for (const operator of operatorArray) {
    if (ops === operator.name) {
      $slotImg.setAttribute('src', operator.art[1].link);
      $slotImg.setAttribute('alt', operator.name);
      $slotImg.setAttribute('name', 'photo');
      $slotImg.classList.add('slotOp', 'photo');
    }
  }

  return $slotImg;
}

function handleOperator(event) {
  const target = event.target.getAttribute('alt');
  if (target !== null) {
    for (const ops of xhr.response) {
      if (ops.name === target) {
        fileLoad(ops);
      }
    }
  }
}

function createFile(operator) {
  const opClasses = setClassImg(operator);
  const lastIndex = operator.class.length - 1;

  const $createModel = document.createElement('div');
  $createModel.classList.add('operator-modal');

  const $modalHead = document.createElement('div');
  $modalHead.classList.add(
    'modal-header',
    'display-flex',
    'flex-direction-column',
    'align-items-center',
  );

  const $opName = document.createElement('h1');
  $opName.id = 'op-name';
  $opName.innerHTML = operator.name;

  const $divImg = document.createElement('div');
  const $operatorImg = document.createElement('img');
  $operatorImg.id = 'operator-img';
  if (operator.art[2]) {
    $operatorImg.setAttribute('src', operator.art[2].link);
  } else {
    $operatorImg.setAttribute('src', operator.art[1].link);
  }
  $operatorImg.setAttribute('alt', operator.name);

  const $divClassImg = document.createElement('div');
  $divClassImg.classList.add(
    'display-flex',
    'justify-content-center',
    'align-items-baseline',
  );

  const $divOperatorClass = document.createElement('div');
  $divOperatorClass.classList.add('operator-class');
  const $operatorClassImg = document.createElement('img');
  $operatorClassImg.classList.add('class-icons');
  $operatorClassImg.setAttribute('src', opClasses[0]);
  $operatorClassImg.setAttribute('alt', operator.class[0]);
  const $operatorImgText = document.createElement('p');
  $operatorImgText.classList.add('class-tag');
  $operatorImgText.innerText = operator.class[0];

  const $divOperatorClass2 = document.createElement('div');
  $divOperatorClass2.classList.add('operator-class');
  const $operatorClassImg2 = document.createElement('img');
  $operatorClassImg2.classList.add('class-icons');
  $operatorClassImg2.setAttribute('src', opClasses[1]);
  $operatorClassImg.setAttribute('alt', operator.class[lastIndex]);
  const $operatorImgText2 = document.createElement('p');
  $operatorImgText2.classList.add('class-tag');
  $operatorImgText2.innerText = operator.class[lastIndex];

  const $divOpLore = document.createElement('div');
  $divOpLore.classList.add('op-bio');
  const $pGender = document.createElement('p');
  const $pBirthplace = document.createElement('p');
  const $pBirthday = document.createElement('p');
  const $pRace = document.createElement('p');
  const $pHeight = document.createElement('p');
  const $pCombat = document.createElement('p');
  $pGender.classList.add('lore');
  $pBirthplace.classList.add('lore');
  $pBirthday.classList.add('lore');
  $pRace.classList.add('lore');
  $pHeight.classList.add('lore');
  $pCombat.classList.add('lore');

  $pGender.innerText = `Gender: ${operator.lore.gender}`;
  $pBirthplace.innerText = `Birthplace: ${operator.lore.place_of_birth}`;
  $pBirthday.innerText = `Birthday: ${operator.lore.birthday}`;
  $pRace.innerText = `Race: ${operator.lore.race}`;
  $pHeight.innerText = `Height: ${operator.lore.height}`;
  $pCombat.innerText = `Combat: ${operator.lore.combat_skill}`;

  const $divBio = document.createElement('div');
  const $opBio = document.createElement('p');
  $opBio.classList.add('lore');
  $opBio.id = 'biography';
  $opBio.innerText = operator.biography;

  $createModel.appendChild($modalHead);

  $modalHead.appendChild($opName);
  $modalHead.appendChild($divImg);
  $divImg.appendChild($operatorImg);

  $createModel.appendChild($divClassImg);
  $divClassImg.appendChild($divOperatorClass);
  $divOperatorClass.appendChild($operatorClassImg);
  $divOperatorClass.appendChild($operatorImgText);
  $divClassImg.appendChild($divOperatorClass2);
  $divOperatorClass2.appendChild($operatorClassImg2);
  $divOperatorClass2.appendChild($operatorImgText2);

  $createModel.appendChild($divOpLore);
  $divOpLore.appendChild($pGender);
  $divOpLore.appendChild($pBirthplace);
  $divOpLore.appendChild($pBirthday);
  $divOpLore.appendChild($pRace);
  $divOpLore.appendChild($pHeight);
  $divOpLore.appendChild($pCombat);

  $createModel.appendChild($divBio);
  $divBio.appendChild($opBio);

  return $createModel;
}

function fileLoad(operator) {
  const $modalExist = document.querySelector('.operator-modal');
  if ($modalExist) {
    $modalExist.remove();
    $modal.appendChild(createFile(operator));
  } else {
    $modal.appendChild(createFile(operator));
  }
}

function setClassImg(operator) {
  const classArray = [];
  const lastIndex = operator.class.length - 1;

  classOne = operator.class[0];
  const classOneLink = './images/' + classOne + '/' + classOne + '.webp';

  classTwo = operator.class[lastIndex];
  const classTwoLink = './images/' + classOne + '/' + classTwo + '.webp';

  classArray.push(classOneLink);
  classArray.push(classTwoLink);

  return classArray;
}

function handleFilter(event) {
  if (
    event.target.classList.contains('caster') ||
    event.target.getAttribute('alt') === 'caster' ||
    event.target.innerText === 'Caster'
  ) {
    filterOps('Caster');
    selected('caster');
  } else if (
    event.target.classList.contains('defender') ||
    event.target.getAttribute('alt') === 'defender' ||
    event.target.innerText === 'Defender'
  ) {
    filterOps('Defender');
    selected('defender');
  } else if (
    event.target.classList.contains('guard') ||
    event.target.getAttribute('alt') === 'guard' ||
    event.target.innerText === 'Guard'
  ) {
    filterOps('Guard');
    selected('guard');
  } else if (
    event.target.classList.contains('medic') ||
    event.target.getAttribute('alt') === 'medic' ||
    event.target.innerText === 'Medic'
  ) {
    filterOps('Medic');
    selected('medic');
  } else if (
    event.target.classList.contains('sniper') ||
    event.target.getAttribute('alt') === 'sniper' ||
    event.target.innerText === 'Sniper'
  ) {
    filterOps('Sniper');
    selected('sniper');
  } else if (
    event.target.classList.contains('specialist') ||
    event.target.getAttribute('alt') === 'specialist' ||
    event.target.innerText === 'Specialist'
  ) {
    filterOps('Specialist');
    selected('specialist');
  } else if (
    event.target.classList.contains('supporter') ||
    event.target.getAttribute('alt') === 'supporter' ||
    event.target.innerText === 'Supporter'
  ) {
    filterOps('Supporter');
    selected('supporter');
  } else if (
    event.target.classList.contains('vanguard') ||
    event.target.getAttribute('alt') === 'vanguard' ||
    event.target.innerText === 'Vanguard'
  ) {
    filterOps('Vanguard');
    selected('vanguard');
  }
}

function filterOps(classTag) {
  const $li = document.querySelectorAll('.operators');
  for (let i = 0; i < $li.length; i++) {
    if ($li[i].getAttribute('data-class') !== classTag) {
      $li[i].classList.add('hidden');
    } else {
      $li[i].classList.remove('hidden');
    }
  }
}

function selected(classTag) {
  for (let i = 0; i < $classBox.length; i++) {
    if ($classBox[i].classList.contains(classTag)) {
      if ($classBox[i].classList.contains('click')) {
        $classBox[i].classList.remove('click');
        unFilterOps();
      } else {
        $classBox[i].classList.add('click');
      }
    } else {
      $classBox[i].classList.remove('click');
    }
  }
}

function unFilterOps() {
  const $li = document.querySelectorAll('li');
  for (let i = 0; i < $li.length; i++) {
    $li[i].classList.remove('hidden');
  }
}

function viewSwap(view) {
  if (view === 'operators') {
    $opsPage.classList.remove('hidden');

    $squadPage.classList.add('hidden');

    data.view = view;
  } else if (view === 'squads') {
    checkEntry();
    $squadPage.classList.remove('hidden');
    $ulEntryList.classList.remove('hidden');

    $opsPage.classList.add('hidden');

    $nameHeader.classList.add('hidden');
    $form.classList.add('hidden');
    $opSelector.classList.add('hidden');

    data.view = view;
  } else if (view === 'new') {
    $noEntry.classList.add('hidden');
    $nameHeader.classList.remove('hidden');
    $form.classList.remove('hidden');
    $opSelector.classList.remove('hidden');
    $squadPage.classList.remove('hidden');

    $opsPage.classList.add('hidden');

    $squadHeader.classList.add('hidden');
    $ulEntryList.classList.add('hidden');

    data.view = view;
  }
}

function openOps() {
  if (event.target.matches('li') || event.target.matches('i')) {
    $squadClass.classList.remove('hidden');
    $ulSquadList.classList.remove('hidden');
  }
}

function handleSelection() {
  if (event.target.getAttribute('alt') !== null) {
    const selectOps = event.target.getAttribute('alt');
    const imageOps = event.target.getAttribute('src');
    if (squadArray.length < 12) {
      if (!squadArray.includes(selectOps)) {
        event.target.classList.add('selected');
        $nameHeader.innerText = 'Added: ' + selectOps;
        imageArray.push(imageOps);
        squadArray.push(selectOps);
      } else {
        event.target.classList.remove('selected');
        $nameHeader.innerText = 'Removed: ' + selectOps;
        imageArray.pop(imageOps);
        squadArray.pop(selectOps);
      }

      if (squadArray.length === 12) {
        replaceSlot(squadArray);
      }
    }
  }
}

function replaceSlot(array) {
  const $plusIcon = document.querySelectorAll('.fa-plus');
  for (let i = 0; i < $plusIcon.length; i++) {
    $plusIcon[i].replaceWith(renderOne(array[i]));
  }
}

function resetSlot(array) {
  const $slotOp = document.querySelectorAll('.slotOp');
  for (let i = 0; i < $slotOp.length; i++) {
    $slotOp[i].replaceWith(createIcon());
  }
}

function createIcon() {
  const $icon = document.createElement('i');
  $icon.classList.add('fa-regular', 'fa-plus');
  return $icon;
}

function clearSelection() {
  const $selected = document.querySelectorAll('.selected');
  for (let i = 0; i < $selected.length; i++) {
    $selected[i].classList.remove('selected');
  }
  squadArray = [];
}

function handleSubmit(event) {
  event.preventDefault();
  replaceSlot(imageArray);
  let squadEntry = {};
  squadEntry = {
    name: $form.elements.teamName.value,
    members: squadArray,
    images: imageArray,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(squadEntry);
  $ulEntryList.prepend(renderEntry(squadEntry));
  clearSelection(squadArray);
  resetSlot();
  $nameHeader.innerText = 'Add your operators';
  $form.reset();
  checkEntry();
}

function renderEntry(entry) {
  const $dataSquadDiv = document.createElement('div');
  $dataSquadDiv.setAttribute('data-entry-id', entry.entryId);
  $dataSquadDiv.classList.add('squad', 'row', 'column-half', 'teamEntry');
  const $squadName = document.createElement('h1');
  $squadName.classList.add('squadName');
  $squadName.innerText = entry.name;

  const $teamSlot = document.createElement('ul');
  $teamSlot.classList.add(
    'team-slot',
    'display-flex',
    'align-items-center',
    'flex-wrap',
    'justify-content-even',
  );

  $dataSquadDiv.appendChild($squadName);
  $dataSquadDiv.appendChild($teamSlot);

  for (let i = 0; i < entry.members.length; i++) {
    const $liSlot = document.createElement('li');
    $liSlot.classList.add(
      'op-slot',
      'display-flex',
      'justify-content-center',
      'align-items-center',
    );
    const $img = document.createElement('img');
    $img.classList.add('slotOp', 'photo');
    $img.setAttribute('src', entry.images[i]);
    $teamSlot.appendChild($liSlot);
    $liSlot.appendChild($img);
  }

  const $notes = document.createElement('p');
  $notes.classList.add('notes');
  $notes.innerText = entry.notes;
  $dataSquadDiv.appendChild($notes);

  return $dataSquadDiv;
}

function loadContent() {
  checkEntry();
  viewSwap(data.view);
  for (let i = 0; i < data.entries.length; i++) {
    $ulEntryList.appendChild(renderEntry(data.entries[i]));
  }
}

function checkEntry() {
  if (data.entries.length === 0) {
    $noEntry.classList.remove('hidden');
  } else {
    $noEntry.classList.add('hidden');
  }
}
