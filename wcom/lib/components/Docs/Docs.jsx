const React = require('react');
const request = require('request');

const Doc = require('./Doc/Doc.jsx');

const Docs = React.createClass({
	getInitialState: function () {
		return {
			userId: null,
			docs: []
		}
	},
	componentDidMount: function () {
		var self = this;

		var userId = window.location.pathname.split('/')[2];
		var route = 'http://localhost:5000/api/user/' + userId;

		request(route, function(err, resp, body) {
			if (!err) {
				self.setState({
					userId: userId,
					docs : JSON.parse(body).docs
				});
			} else {
				console.log(err);
			}

		});
	},
	renderDocs: function (docs) {
		var self = this;

		return docs.map(function (doc, i) {
			return <Doc className={'doc doc' + i} key={i} values={doc} userId={self.state.userId} />	
		});
	},
	render: function () {
		return (
			<div className="docs">
				{this.renderDocs(this.state.docs)}
			</div>
		)
	}
});

module.exports = Docs;