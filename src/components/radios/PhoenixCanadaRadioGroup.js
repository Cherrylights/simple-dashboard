import React, { Component } from "react";
import { Radio, Row, Col } from "antd";

export default class PhoenixCanadaRadioGroup extends Component {
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
					<Col className="gutter-row" span={12}>
						<h3>Indicators</h3>
						<Radio
							key="core_modules_status"
							style={radioStyle}
							name="cardName"
							value="core_modules_status"
						>
							Core/Modules info
						</Radio>
					</Col>
					<Col className="gutter-row" span={12}>
						<h3>Info</h3>
						<Radio
							key="merchant_boarding"
							style={radioStyle}
							name="cardName"
							value="merchant_boarding"
						>
							Merchant Boarding in Last 15 Months
						</Radio>
						<Radio
							key="top_merchants_declines"
							style={radioStyle}
							name="cardName"
							value="top_merchants_declines"
						>
							Merchant Top Declines in Last 7 Days
						</Radio>
						<Radio
							key="merchant_active_inactive"
							style={radioStyle}
							name="cardName"
							value="merchant_active_inactive"
						>
							Merchant Active/Inactive Status
						</Radio>
					</Col>
				</Row>
			</Radio.Group>
		);
	}
}
