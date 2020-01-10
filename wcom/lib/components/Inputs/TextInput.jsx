var React = require('react');

/*
* @module Text Input
* Props: label, stateKey, type, value, placeholder, validation
*/

var TextInput = React.createClass({
	getInitialState: function () {
		return {
			value: ''
		}
	},
	onChange: function (e) {
		this.setState({value: e.target.value});
	},
	onBlur: function (e) {
		// using function from props
		this.props.onChange();
	},
	render: function () {
		return (
			<div className="field">
				<label>{this.props.label}</label>
				<input className="textInput" type={this.props.type} onBlur={this.onBlur} onChange={this.onChange} value={this.state.value} placeholder={this.props.placeholder}/>
			</div>
		)
	}
});

module.exports = TextInput;