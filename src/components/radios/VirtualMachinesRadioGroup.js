import React, { Component } from "react";
import { Radio, Row, Col } from "antd";

export default class VirtualMachinesRadioGroup extends Component {
	state = {};

	componentDidUpdate(prevProps) {
		if (this.props.activeKey && this.props.activeKey !== prevProps.activeKey) {
			this.setState({ selected: null });
		}
	}

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
				value={this.state.selected}
				name="cardName"
			>
				<Row gutter={16}>
					<Col className="gutter-row" span={20}>
						<h3>Hardware Info</h3>
						<Radio
							key="top_merchants_declines"
							style={radioStyle}
							name="cardName"
							value="top_merchants_declines"
						>
							Merchant Top Declines in Last 7 Days
						</Radio>
						<Radio
							key="top_tps_last_31_days"
							style={radioStyle}
							name="cardName"
							value="top_tps_last_31_days"
						>
							Top TPS Per Day in Last 31 Days
						</Radio>
					</Col>
				</Row>
			</Radio.Group>
		);
	}
}
