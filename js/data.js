/* exported data */

let data = {
  view: 'squads',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', function () {
  const dataJSON = JSON.stringify(data);
  this.localStorage.setItem('ajax-project', dataJSON);
});

const previousDataJSON = localStorage.getItem('ajax-project');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
