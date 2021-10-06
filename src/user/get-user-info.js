const { db } = require('../../config.js');

function getUserInfo(id, doAfterGet) {
  if (!id || !doAfterGet) return;
  db.collection('users')
    .doc(id)
    .get()
    .then((doc) => doAfterGet(doc.data()))
    .catch((err) => console.log(err));
}

module.exports = { getUserInfo };
// getUserInfo('t0eFk47dMPM78zGCsHI1RyGk5P93', (data) => console.log(data));
