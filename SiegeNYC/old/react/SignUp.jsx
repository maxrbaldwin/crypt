var React = require('react');
var ReactDom = require('react-dom');

var Nav = require('./components/NavBar/NavBar.jsx');
var SignUp = require('./components/SignUp/SignUp.jsx');

ReactDom.render(<Nav />, document.querySelector('#Nav'));
ReactDom.render(<SignUp />, document.querySelector('#SignUp'));