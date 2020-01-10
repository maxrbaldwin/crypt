var React = require('react');

var lookup = React.createClass({
	getInitialState: function () {
		var initialState = {
			value: 'Zip Code'
		}

		return initialState
	},
	handleChange: function (e) {
		this.setState({
			value: e.target.value
		})
	},
	render: function () {
		return (
			<div className="lookup-form form">
				<input type="text" value={this.state.value} onChange={this.handleChange} />
			</div>
		)
	}
});

module.exports = lookup;