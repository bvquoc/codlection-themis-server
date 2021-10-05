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
    console.log(filename);
    if (typeof filename === 'string' && filename.slice(-3) === 'log') {
      fs.readFile(path, { encoding: 'utf8', flag: 'r' }, function (err, data) {
        if (err) return console.log(err);
        const props = getArgs(filename);
        db.collection('submissions')
          .doc('0001')
          .update({
            ...props,
            ...parseLogs(data),
            status: 'complete',
          })
          .then(() => console.log('Updated submission', props.submissionId))
          .catch((error) => console.error('Error adding document: ', error));
      });
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
