var React = require('react');

// Child componenets
var TextInput = require('./../Inputs/TextInput.jsx');

var SignUp = React.createClass({
	getInitialState: function () {
		return {
			value: 'Email'
		}
	},
	handleChange: function (value) {
		this.setState(value);
	},
	handleSubmit: function (e) {
		
		if (this.isFormValid(this.state)) {
			this.submitForm();
		}
		
		e.preventDefault();
	},
	submitForm: function () {
		// submit via ajax
	},
	isFormValid: function () {
		return true
	}
	render: function () {
		return (
			<form className="form" onSubmit={this.handleSubmit}>
				<TextInput onChange={this.handleChange} label="Email" type="text" value={this.state.value} />
				<button className="submit" type="submit">Submit</button>
			</form>
		)
	}
});

module.exports = SignUp;