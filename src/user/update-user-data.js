const { db } = require('../../config.js');

/**
 * Update collection 'users' on firestore
 * @param {string} id The of the user want update.
 * @param {object} data The data will merge with current user data
 */
function updateUserById(id, data) {
  if (!id || !data) return;
  db.collection('users')
    .doc(id)
    .update(data)
    .catch((error) => console.log('Error updating document:', error));
}

module.exports = { updateUserById };
