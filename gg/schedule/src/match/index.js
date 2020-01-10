const propTypes = require('prop-types');
const scheduler = require('node-schedule');
// send email, send notification
class Match {
  constructor(props) {
    this.start = props.begin;
  }
  schedule() {
    const start = this.start;
    const job = scheduler.scheduleJob(start, function(){
      console.log('The world is going to end today.');
    });
    return job;
  }
  rescheduleMatch() {

  }
}

Match.propTypes = {
  start: propTypes.instanceOf(Date).isRequired,
}

module.exports = Match;