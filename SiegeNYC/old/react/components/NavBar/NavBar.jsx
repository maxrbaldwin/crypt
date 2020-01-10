var React = require('react');

var NavBar = React.createClass({

	render: function () {
		return(
			<div className="ui container navbar">
				<div className="nav-left left-float">
					<ul>
						<li><a href="#">Mission</a></li>
						<li><a href="#">Game Types</a></li>
						<li><a href="#">FAQs</a></li>
					</ul>
				</div>
				<div className="nav-right right-float"></div>
				<div className="clear"></div>
			</div>
		)
	}
});

module.exports = NavBar;