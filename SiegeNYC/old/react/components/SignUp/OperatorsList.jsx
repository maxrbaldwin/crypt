var React = require('react');
var initialState = require('./initialState.jsx');

// Child components
var OperatorIcon = require('./OperatorIcon.jsx');

var OperatorsList = React.createClass({
	renderGridUnits: function (type) {
		var gridUnits = [];

		for(var key in initialState.static.operators[type]) {
			gridUnits.push(
				<OperatorIcon 
					onUpdate={this.props.onUpdate} src={'/assets/op_icons/' + initialState.static.operators[type][key] + '.png'} 
					name={initialState.static.operators[type][key]} 
					value={key}
					key={key}
					type={type}
				/>
			)
		}

		return gridUnits;
	},
	render: function () {
		return (
			<div className="op-list">
				<h2 className={"ui center aligned header"}>{this.props.type}</h2>
				<div className="ui grid">
					{this.renderGridUnits(this.props.type)}
				</div>
			</div>
		)
	}
});

module.exports = OperatorsList;