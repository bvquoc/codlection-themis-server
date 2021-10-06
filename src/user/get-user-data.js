const { db } = require('../../config.js');

function getUserData(id, doAfterGet) {
  if (!id || !doAfterGet) return;
  db.collection('users')
    .doc(id)
    .get()
    .then((doc) => doAfterGet(doc.data()))
    .catch((err) => console.log(err));
}

module.exports = { getUserData };
// getUserData('t0eFk47dMPM78zGCsHI1RyGk5P93', (data) => console.log(data));
