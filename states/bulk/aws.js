const elasticsearch = require('elasticsearch');
// @Notes: https://github.com/elastic/elasticsearch-js/issues/274
const AWSConnector = require('http-aws-es');
const envs = require('dotenv').config();

module.exports = function () {
	return new elasticsearch.Client({
		connectionClass: AWSConnector,
		apiVersion: '2.3',
		port: 443,
		protocol: 'https',
		host:`${envs.endpoint}`,
		amazonES: {
			region: 'us-east-1',
			accessKey: envs.accessKeyId,
			secretKey: envs.secretAccessKey
		}
	})
}

