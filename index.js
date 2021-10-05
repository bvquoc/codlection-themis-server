const { submitDir } = require('./config.js');
const { watchLogs } = require('./src/watch-submit-logs.js');

const logDir = `${submitDir}/Logs`;
watchLogs(logDir);
