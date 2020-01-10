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
		this.props.onChange(this.props.stateKey, e.target.value, this.props.validation);
	},
	render: function () {
		var isValid = (this.props.valid === true) ? 'valid' : (this.props.valid === null || this.props.valid === undefined) ? '' : 'invalid';

		return (
			<div className="field">
				<label>{this.props.label}</label>
				<input className={isValid} type={this.props.type} onBlur={this.onBlur} onChange={this.onChange} value={this.state.value} placeholder={this.props.placeholder}/>
			</div>
		)
	}
});

module.exports = TextInput;