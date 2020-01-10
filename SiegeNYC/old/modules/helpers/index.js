var Helpers = {
	isNumbersOnly: function (number) {
		var reg = new RegExp(/^\d+$/);
		return reg.test(number);
	},
	isEmail: function (email) {
		var reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		return reg.test(email);
	}
}

module.exports = Helpers;