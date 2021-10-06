const getTestDetail = (rawPoint, rawTime, rawStatus) => {
  if (!rawPoint || !rawTime || !rawStatus) return undefined;
  let test, score, time, status;
  rawPoint = rawPoint.split('‣')[rawPoint.split('‣').length - 1];
  test = rawPoint.split(':')[0];
  score = Number.parseFloat(rawPoint.split(':')[1]);
  if (score === 0) {
    status = rawTime;
    time = NaN;
    return [1, { test, score, time, status }];
  }
  time = Number.parseFloat(rawTime.split(' ')[3]);
  status = rawStatus;
  return [2, { test, score, time, status }];
};

function parseLogs(data) {
  data = data.split('\r\n');

  const result = {};
  const details = [];
  let tmp = data[0].split('‣');
  result.userId = tmp[0];
  tmp = tmp[1].split(': ');
  result.problemId = tmp[0];

  if ('ℱ Dịch lỗi' === tmp[1]) {
    result.score = 0;
    result['compile_status'] = tmp[1];
    result['compile_cmd'] = data[2];
    for (let i = 3; i < data.length; i++) {
      if (data[i] === '') continue;
      result['compile_status'] += `\n${data[i]}`;
    }
    result.details = [];
    return result;
  }

  result.score = Number.parseFloat(tmp[1]);
  result.filename = data[1];
  result['compile_cmd'] = data[2];
  result['compile_status'] = data[3];

  let sliceAt = 5;
  if (result.filename.slice(-3) === '.py') {
    result['compile_cmd'] = `python3 ${result.filename}`;
    result['compile_status'] = data[2];
    sliceAt = 4;
  }

  if (result.filename.slice(-4) === '.pas') {
    result['compile_cmd'] = data[2];
    result['compile_status'] = data.slice(3, 10).join('\n');
    console.log(data);
    sliceAt = 11;
  }

  data = data.slice(sliceAt);
  let i = 0;
  while (i < data.length) {
    const cur = getTestDetail(data[i], data[i + 1], data[i + 2]);
    if (cur) {
      details.push(cur[1]);
      i += cur[0];
    }
    i++;
  }
  result.details = details;
  console.log(details);
  return result;
}

// const fs = require('fs');
// fs.readFile('./[vq][plus]err.log', { encoding: 'utf8', flag: 'r' }, function (err, data) {
//   if (err) return console.log(err);
//   console.log(parseLogs(data));
// });

module.exports = { parseLogs };
