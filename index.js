const { app, db } = require('./config.js');
const fs = require('fs');

console.log('Watching log folder...');
fs.watch('./log', (eventType, filename) => {
  db.collection('logs')
    .add({
      filename,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
});
