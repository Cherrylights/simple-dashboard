import React, { Component } from "react";
import { Checkbox } from "antd";

export default class CheckboxGroup extends Component {
	state = {};

	onChange = checkedValues => {
		this.setState({
			selected: checkedValues
		});
		// console.log("checked = ", checkedValues);
	};

	componentDidUpdate(prevProps) {
		if (this.props.activeKey && this.props.activeKey !== prevProps.activeKey) {
			this.setState({ selected: null });
		}
	}

	render() {
		return (
			<Checkbox.Group
				options={this.props.data}
				onChange={this.onChange}
				value={this.state.selected}
			/>
		);
	}
}
