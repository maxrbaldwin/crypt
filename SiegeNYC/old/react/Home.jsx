var React = require('react');
var ReactDom = require('react-dom');

var Nav = require('./components/NavBar/NavBar.jsx');
var HomeTitle = require('./components/HomeTitle/HomeTitle.jsx');

ReactDom.render(<Nav />, document.querySelector('#Nav'));
ReactDom.render(<HomeTitle />, document.querySelector('#Title'));