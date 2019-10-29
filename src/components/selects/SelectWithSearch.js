import React, { Component } from "react";
import { Select } from "antd";

const { Option } = Select;

export default class SelectWithSearch extends Component {
	state = {};

	handleSelect = value => {
		this.setState({ selected: value });
	};

	clearSelect = () => {
		this.setState({ selected: undefined });
	};
	componentDidUpdate(prevProps) {
		if (this.props.activeKey && this.props.activeKey !== prevProps.activeKey) {
			this.clearSelect();
		}
	}
	render() {
		return (
			<>
				<Select
					defaultValue={this.props.defaultValue}
					defaultActiveFirstOption={this.props.defaultActiveFirstOption}
					style={{ width: "100%" }}
					placeholder={this.props.placeholder}
					onSelect={(value, option) => {
						this.handleSelect(value);
						this.props.handleSelectChange(value, option);
					}}
				>
					{this.props.data.map(data => (
						<Option key={data.value} title={data.name} value={data.value}>
							{data.text}
						</Option>
					))}
				</Select>
			</>
		);
	}
}
