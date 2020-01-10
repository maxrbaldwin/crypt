var ReactDOM = require('react-dom');
var React = require('React');
var components = require('./app/index.jsx');

var Lookup = components.lookup;

ReactDOM.render(<Lookup />, document.querySelector('#lookup-form'));