var React = require('react');
var request = require('request');
var static = require('staticdb');
var help = require('helpers');

// Inital form data
var initialState = require('./initialState.jsx');

// Child componenets
var Dropdown = require('./../Inputs/Dropdown.jsx');
var TextInput = require('./../Inputs/TextInput.jsx');
var Operatorslist = require('./OperatorsList.jsx');

var SignUp = React.createClass({
	static: static,
	getInitialState: function () {
		return {
			gamerTag: { value: 'MXPrime3333', valid: null },
			email: { value: 'email@siege.nyc', valid: null },
			password: { value: 'password', valid: null, temp: '', sibKey: 'confirm' },
			confirm: { value: 'password', valid: null, temp: '', sibKey: 'password' },
			rank: { value: '1', valid: null },
			esl: [],
			platform: [],
			country: [],
			hours: [],
			operators: {
				attackers: [],
				defenders: []
			}
		}
	},
	handleChange: function (stateKey, value, validation) {
		var inputObject = {};

		inputObject[stateKey] = this.state[stateKey];

		if (validation && validation(value, stateKey) || !validation) {
			inputObject[stateKey].valid = true;
			
			if (inputObject[stateKey].sibKey) {
				inputObject = this.setSiblingInput(true, inputObject, stateKey);
			}

		} else {
			inputObject[stateKey].valid = false;

			if (inputObject[stateKey].sibKey) {
				inputObject = this.setSiblingInput(false, inputObject, stateKey);
			}
		}

		inputObject[stateKey].value = value;

		this.setState(inputObject);
	},
	handleDropDown: function (e) {
		var options = e.target.options;
		var key = e.target.dataset.key;
		var values = [];
		var stateObject = {};

		for (var i = 0; i < options.length; i++) {
			if (options[i].selected) {
		    	values.push(options[i].value);
		    }
  		}

  		stateObject[key] = values;

  		this.setState(stateObject);
	},
	handleOperators: function (value, type) {
		var ops = this.state.operators[type];
		var index = ops.indexOf(value);
		var opsObject = this.state.operators;
		
		if(ops.indexOf(value) > -1) {
			ops.splice(index, 1);
		} else {
			ops.push(value);
		}

		opsObject[type] = ops;

		this.setState({operators: opsObject});
	},
	handleSubmit: function (e) {
		
		if (this.isFormValid(this.state)) {
			this.submitForm();
		}
		
		e.preventDefault();
	},
	isFormValid: function (state) {

		if (!state.gamerTag.valid || !state.gamerTag.value) {
			return this.setInvalid('gamerTag');
		}

		if (!state.email.valid || !help.isEmail(state.email.value)) {
			return this.setInvalid('email');
		}

		if (!state.password.valid || !this.matchPasswords(state.password.value, 'password', true)) {
			return this.setInvalid('password');
		}

		if (!state.confirm.valid || !this.matchPasswords(state.confirm.value, 'confirm', true)) {
			return this.setInvalid('confirm');
		}

		if (!state.rank.valid || !help.isNumbersOnly(state.rank.value)) {
			return this.setInvalid('rank');
		}

		if (!state.esl.length) {
			return this.setInvalid('esl');
		}

		if (!state.platform.length) {
			return this.setInvalid('platform');
		}

		if (!state.country.length) {
			return this.setInvalid('country');
		}

		if (!state.hours.length) {
			return this.setInvalid('hours');
		}

		return true;
	},
	setInvalid: function (input) {
		var stateObject = this.state[input];
		
		stateObject.valid = false;
		this.setState(stateObject);
		console.log(input);
		
		return false;
	},
	matchPasswords: function (value, stateKey, doNotSet) {
		var tempStateObject = {};

		tempStateObject[stateKey] = this.state[stateKey];
		tempStateObject[stateKey].temp = value;

		if (!doNotSet) {
			this.setState(tempStateObject);
		}
		
		return (value === this.state.password.value) ? true : (value === this.state.confirm.value) ? true : false;
	},
	setSiblingInput: function (bool, inputObject, stateKey) {
		var sibKey = inputObject[stateKey].sibKey
		
		inputObject[sibKey] = this.state[sibKey];
		inputObject[sibKey].valid = bool;

		return inputObject;
	},
	submitForm: function () {
		var url = 'http://localhost:5000/api/v1/register';
		var qs = this.state;

		request.get({url: url, qs: qs}, function (err, res, body) {
			console.log(res);
		})
	},
	render: function () {
		return (
			<form className="ui form" onSubmit={this.handleSubmit}>
				<h2 className="ui center aligned header">Create Profile and Get In Matchmaking</h2>
				<div className="two fields">
					<TextInput onChange={this.handleChange} label="Gamer Tag" stateKey="gamerTag" type="text" value={this.state.gamerTag.value} placeholder={this.state.gamerTag.value} />
					<TextInput onChange={this.handleChange} validation={help.isEmail} valid={this.state.email.valid} label="Email" stateKey="email" type="text" value={this.state.email.value} placeholder={this.state.email.value} />
				</div>
				<div className="two fields">
					<TextInput onChange={this.handleChange} validation={this.matchPasswords} valid={this.state.password.valid} label="Password" stateKey="password" type="password" value={this.state.password.value} placeholder={this.state.password.value} />
					<TextInput onChange={this.handleChange} validation={this.matchPasswords} valid={this.state.confirm.valid} label="Confirm Password" stateKey="confirm" type="password" value={this.state.confirm.value} placeholder={this.state.confirm.value} />
				</div>
				<div className="two fields">
					<TextInput onChange={this.handleChange} validation={help.isNumbersOnly} valid={this.state.rank.valid} label="Number Rank" stateKey="rank" type="text" value={this.state.rank.value} placeholder={this.state.rank.value} />
					<Dropdown onUpdate={this.handleDropDown} stateKey="esl" label="ESL Rank" options={this.static.eslRank} />
				</div>
				<div className="three fields">
					<Dropdown onUpdate={this.handleDropDown} stateKey="platform" label="Platform" options={this.static.platforms} />
					<Dropdown onUpdate={this.handleDropDown} stateKey="country"  label="Country" options={this.static.countries} />
					<Dropdown onUpdate={this.handleDropDown} stateKey="hours" label="Hours Available" options={this.static.time} multi={true} classes="twelve wide"/>
				</div>
				<div className="ui center aligned header op-header">
					<h1>Which Operators Do You Run?</h1>
				</div>
				<div className="op-select left-float">
					<Operatorslist onUpdate={this.handleOperators} type="defenders" />
				</div>
				<div className="op-select right-float">
					<Operatorslist onUpdate={this.handleOperators} type="attackers" />
				</div>
				<div className="clear"></div>
				<button className="ui button op-submit" type="submit">Submit</button>
			</form>
		)
	}
});

module.exports = SignUp;