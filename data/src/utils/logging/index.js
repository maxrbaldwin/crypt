const path = require('path');
const Logging = require('@google-cloud/logging');
const { ErrorReporting } = require('@google-cloud/error-reporting');
const getTimeStamp = require('@logging/getTimeStamp');

const isProduction = () => process.NODE_ENV === 'production';

const getLogging = () => {}
  new Logging({
    projectId,
  });
const getErrorReporting = () => {}
  new ErrorReporting({
    projectId,
  });

const logging = isProduction() ? getLogging() : {};
const errors = isProduction() ? getErrorReporting() : {};

const withTimestamp = message => `${getTimeStamp()} : ${message}`;
const withErrorObject = (message, err) => `${message} : ${err}`;

function logError(message) {
  errors.report(withTimestamp(message));
}

function logErrorDev(message) {
  console.error(withTimestamp(message));
}

async function log(message, type = 'global') {
  const logName = 'general';
  const writeTo = logging.log(logName);
  const text = withTimestamp(message);
  const metadata = { resource: { type } };
  const entry = writeTo.entry(metadata, text);

  await log.write(entry).catch(err => {
    logError(err);
  });
}

function logDev(message) {
  console.log(withTimestamp(message));
}

module.exports = {
  log: isProduction() ? log : logDev,
  logError: isProduction() ? logError : logErrorDev,
  withErrorObject,
};
