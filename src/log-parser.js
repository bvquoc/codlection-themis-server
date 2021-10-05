const getTestDetail = (rawPoint, rawTime, rawStatus) => {
  if (!rawPoint || !rawTime || !rawStatus) return {};
  const result = {};
  rawPoint = rawPoint.split('‣')[rawPoint.split('‣').length - 1];
  result.test = rawPoint.split(':')[0];
  result.score = Number.parseFloat(rawPoint.split(':')[1].trim());
  result.time = Number.parseFloat(rawTime.split(' ')[3].trim());
  result.status = rawStatus;
  return result;
};

function parseLogs(data) {
  data = data.split('\r\n');

  const result = {};
  const details = [];
  let tmp = data[0].split('‣');
  result.userId = tmp[0];
  tmp = tmp[1].split(': ');
  result.problemId = tmp[0];
  result.score = Number.parseFloat(tmp[1]);
  result.filename = data[1];
  result['compile_cmd'] = data[2];
  result['compile_status'] = data[3];

  for (let i = 5; i + 2 < data.length; i += 3) details.push(getTestDetail(data[i], data[i + 1], data[i + 2]));
  result.details = details;

  return result;
}

module.exports = { parseLogs };
