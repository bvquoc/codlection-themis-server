const { db, submitDir } = require('../config.js');
const fs = require('fs');

const makeFile = (data) => {
  if (data === void 0) return;
  console.log('Making', data);
  const path = `${submitDir}/[${data.userId}][${data.problemId}]${data.submissionId}.${data.language}`;
  if (fs.existsSync(path)) return;

  fs.writeFile(path, data.code, function (err) {
    if (err) return console.log(err);

    console.log('The file was saved!');
  });
};

subscribeSubmissionsByStatus = (status = 'pending') => {
  this.unsubcribesubmissions = db
    .collection('submissions')
    .where('status', '==', status)
    .orderBy('sentAt')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const curSubmission = {
            ...change.doc.data(),
            submissionId: change.doc.id,
          };
          makeFile(curSubmission);
        }
        if (change.type === 'modified') {
          // handle on message modified
        }
        if (change.type === 'removed') {
          // handle on remove submissions
        }
      });
    });
};

subscribeSubmissionsByStatus('pending');
