const { db } = require('../config.js');
const chokidar = require('chokidar');
const fs = require('fs');
const { parseLogs } = require('./log-parser.js');

function getArgs(filename) {
  if (!filename || typeof filename !== 'string' || filename.length <= 4 || filename.slice(-3) !== 'log') return;
  let tmpArr = filename.split('.');
  const language = tmpArr[tmpArr.length - 2];
  tmpArr = tmpArr[0].split(']');
  const submissionId = tmpArr[tmpArr.length - 1];
  const problemId = tmpArr[1].slice(1);
  tmpArr = tmpArr[0].split('[');
  const userId = tmpArr[tmpArr.length - 1];
  return {
    userId,
    problemId,
    language,
    submissionId,
  };
}

function watchLogs(logDir) {
  const watcher = chokidar.watch(logDir);
  console.log(`Watching ${logDir} folder...`);
  watcher.on('add', function (path) {
    const tmpArr = path.split('/');
    const filename = tmpArr[tmpArr.length - 1];
    if (typeof filename === 'string' && filename.slice(-3) === 'log') {
      const props = getArgs(filename);
      const subId = props.submissionId;
      const userId = props.userId;
      console.log(subId);

      db.collection('submissions')
        .doc(subId)
        .get()
        .then((doc) => {
          if (doc.exists && doc.data().status === 'pending') {
            fs.readFile(path, { encoding: 'utf8', flag: 'r' }, function (err, data) {
              if (err) return console.log(err);
              if (data === '') return;
              const cur = { ...props, ...parseLogs(data) };
              db.collection('submissions')
                .doc(subId)
                .update(cur)
                .then(() => console.log('Updated submission', subId))
                .catch((error) => console.error('Error update submission: ', error));

              // -> update problem score for userId
            });
          }
        })
        .catch((error) => console.log('Error getting document:', error));
    }
  });
}

module.exports = { watchLogs };

// fs.watch('./log', (eventType, filename) => {
//   db.collection('logs')
//     .add({
//       filename,
//     })
//     .then((docRef) => {
//       console.log('Document written with ID: ', docRef.id);
//     })
//     .catch((error) => {
//       console.error('Error adding document: ', error);
//     });
// });
