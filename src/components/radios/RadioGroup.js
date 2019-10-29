import React, { Component } from "react";
import { Radio } from "antd";

export default class RadioGroup extends Component {
	state = {};

	// componentDidUpdate(prevProps) {
	// 	if (this.props.activeKey && this.props.activeKey !== prevProps.activeKey) {
	// 		this.setState({ selected: null });
	// 	}
	// }

	onChange = e => {
		this.setState({
			selected: e.target.value
		});
		this.props.handleChange(e);
	};

	render() {
		const radioStyle = {
			display: "block",
			height: "30px",
			lineHeight: "30px"
		};
		return (
			<Radio.Group
				onChange={this.onChange}
				value={this.state.value}
				name="cardName"
			>
				{this.props.data.map(data => (
					<Radio
						key={data.value}
						style={radioStyle}
						name={data.name}
						value={data.value}
					>
						{data.text}
					</Radio>
				))}
			</Radio.Group>
		);
	}
}
