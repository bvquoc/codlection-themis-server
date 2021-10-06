const { submitDir } = require('./config.js');
const { watchLogs } = require('./src/watch-submit-logs.js');
const { subscribeSubmissionsByStatus } = require('./src/listen-submission.js');

const logDir = `${submitDir}/Logs`;
watchLogs(logDir);
subscribeSubmissionsByStatus();
