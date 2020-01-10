module.exports = function getTimeStamp() {
    const currentdate = new Date();
    // eslint-disable-next-line
    const datetime = `${currentdate.getMonth() + 1}:${currentdate.getDate()}:${currentdate.getFullYear()}@${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
  
    return datetime;
  };
  