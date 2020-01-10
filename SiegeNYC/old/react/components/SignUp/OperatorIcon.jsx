var React = require('react');

var OperatorIcon = React.createClass({
	getInitialState: function () {
		return {
			disabled: ''
		}
	},
	componentDidMount: function () {
		$('.op-select img').popup();
	},
	setDisabled: function (e) {
		this.setState({
			disabled: (this.state.disabled) ? '' : 'disabled'
		});

		this.props.onUpdate(this.props.value, this.props.type);

		e.preventDefault();
	},
	render: function () {
		return (
			<div className="four wide column">
				<a href="#" className="op-select" onClick={this.setDisabled} data-id={this.props.value} data-type={this.props.type}>
					<img className={"ui tiny image " + this.state.disabled} src={this.props.src} data-content={this.props.name}/>
				</a>
			</div>
		)
	}
});

module.exports = OperatorIcon;