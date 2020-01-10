var React = require('react');

var HomeTitle = React.createClass({
	render: function () {
		return(
			<div className="home-title">
				<div className="title">
					<h1>Siege | NYC</h1>
					<h2>Siege Leagues, For The Community, By The Community</h2>
				</div>
				<div className="title-actions">
						<a href="/sign-up" className="ui button">Join Now</a>
				</div>
			</div>
		)
	}
});

module.exports = HomeTitle;