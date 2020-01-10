const React = require('react');
const request = require('request');

const Doc = React.createClass({
	getInitialState: function () {
		return {}
	},
	handleClick: function (e) {
		var docId = this.props.values.id;
		var route = 'http://localhost:5000/api/docs/' + docId + '?user=' + this.props.userId;

		request(route, function (err, resp, body) {
			if(!err) {
				console.log(body);
			}
		});
	},
	render: function () {
		return (
			<div onClick={this.handleClick}>{this.props.values.name}</div>	
		)
	}
});

module.exports = Doc;