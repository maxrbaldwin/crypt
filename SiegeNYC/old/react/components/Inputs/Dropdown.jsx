var React = require('react');

var Dropdown = React.createClass({
	componentDidMount: function () {
		$('select.dropdown').dropdown();
	},
	renderInputByKey: function (options) {
		var inputValues = [];

		inputValues.push(
			<option value="" key="">{options['0']}</option>
		)
		
		if(options) {
			for(var key in options) {
				inputValues.push(
					<option value={key} key={key}>{options[key]}</option>
				)
			}
		}

		return inputValues;
	},
	render: function () {
		return (
			<div className={"field " + this.props.classes}>
				<label>{this.props.label}</label>
				<select onChange={this.props.onUpdate} data-key={this.props.stateKey} multiple={this.props.multi} className="ui dropdown">
					{this.renderInputByKey(this.props.options)}
    			</select>
			</div>
		)
	}
});

module.exports = Dropdown;