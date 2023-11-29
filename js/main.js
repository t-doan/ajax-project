const xhr = new XMLHttpRequest();
const arrayOps = [];
xhr.open(
  'GET',
  'https://api.rhodesapi.com/api/operator?exclude=talents,rarity,artist,va,description,quote,voicelines,alter,affiliation,tags,range,statistics,trait,potential,trust,skills,costs,module,base,headhunting,recruitable,availability,release_dates',
);
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log(xhr.status);
  console.log(xhr.response);
  for (const ops of xhr.response) {
    /* get all characters */
    if (ops.art.length >= 0) {
      art = ops.art[1].link;
      const newImg = document.createElement('img');
      const newLi = document.createElement('li');
      newImg.classList.add('ops');
      newImg.setAttribute('src', art);
      newImg.setAttribute('alt', ops.name);
      $ul.appendChild(newLi);
      newLi.appendChild(newImg);
    }
  }
});
xhr.send();

const $ul = document.querySelector('ul');
