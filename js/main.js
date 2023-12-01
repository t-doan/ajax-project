const $ul = document.querySelector('ul');
const $modal = document.querySelector('#modal-section');
const $class = document.querySelector('#classes-box');
const $classBox = document.querySelectorAll('.class-box');

$ul.addEventListener('click', handleOperator);
$class.addEventListener('click', handleFilter);

const xhr = new XMLHttpRequest();
xhr.open(
  'GET',
  'https://lfz-cors.herokuapp.com/?url=https://api.rhodesapi.com/api/operator?exclude=talents,rarity,artist,va,description,quote,voicelines,alter,affiliation,tags,range,statistics,trait,potential,trust,skills,costs,module,base,headhunting,recruitable,availability,release_dates',
);
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log(xhr.status);
  console.log(xhr.response);
  for (const ops of xhr.response) {
    if (ops.name !== 'Kirin X Yato') {
      if (ops.art.length > 1) {
        createList(ops);
      }
    }
  }
});
xhr.send();

function createList(ops) {
  art = ops.art[1].link;
  const newImg = document.createElement('img');
  const newLi = document.createElement('li');
  newLi.setAttribute('data-id', ops.name);
  newLi.setAttribute('data-class', ops.class[0]);
  newImg.classList.add('ops');
  newImg.setAttribute('src', art);
  newImg.setAttribute('alt', ops.name);
  $ul.appendChild(newLi);
  newLi.appendChild(newImg);
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
    event.target.getAttribute('id') === 'caster' ||
    event.target.getAttribute('alt') === 'caster' ||
    event.target.innerText === 'Caster'
  ) {
    filterOps('Caster');
    selected('caster');
  } else if (
    event.target.getAttribute('id') === 'defender' ||
    event.target.getAttribute('alt') === 'defender' ||
    event.target.innerText === 'Defender'
  ) {
    filterOps('Defender');
    selected('defender');
  } else if (
    event.target.getAttribute('id') === 'guard' ||
    event.target.getAttribute('alt') === 'guard' ||
    event.target.innerText === 'Guard'
  ) {
    filterOps('Guard');
    selected('guard');
  } else if (
    event.target.getAttribute('id') === 'medic' ||
    event.target.getAttribute('alt') === 'medic' ||
    event.target.innerText === 'Medic'
  ) {
    filterOps('Medic');
    selected('medic');
  } else if (
    event.target.getAttribute('id') === 'sniper' ||
    event.target.getAttribute('alt') === 'sniper' ||
    event.target.innerText === 'Sniper'
  ) {
    filterOps('Sniper');
    selected('sniper');
  } else if (
    event.target.getAttribute('id') === 'specialist' ||
    event.target.getAttribute('alt') === 'specialist' ||
    event.target.innerText === 'Specialist'
  ) {
    filterOps('Specialist');
    selected('specialist');
  } else if (
    event.target.getAttribute('id') === 'supporter' ||
    event.target.getAttribute('alt') === 'supporter' ||
    event.target.innerText === 'Supporter'
  ) {
    filterOps('Supporter');
    selected('supporter');
  } else if (
    event.target.getAttribute('id') === 'vanguard' ||
    event.target.getAttribute('alt') === 'vanguard' ||
    event.target.innerText === 'Vanguard'
  ) {
    filterOps('Vanguard');
    selected('vanguard');
  }
}

function filterOps(classTag) {
  const $li = document.querySelectorAll('li');
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
    if ($classBox[i].id === classTag) {
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
