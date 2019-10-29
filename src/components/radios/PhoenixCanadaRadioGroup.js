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
					<Col className="gutter-row" span={6}>
						<h3>Indicators</h3>
						<Radio
							key="core_modules_status"
							style={radioStyle}
							name="cardName"
							value="core_modules_status"
						>
							Core/Modules info
						</Radio>
						<Radio
							key="coremod_logging"
							style={radioStyle}
							name="cardName"
							value="coremod_logging"
						>
							Core modules logging
						</Radio>
					</Col>
					<Col className="gutter-row" span={10}>
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
							key="daily_volumes_last_60days"
							style={radioStyle}
							name="cardName"
							value="daily_volumes_last_60days"
						>
							Daily Volumes Last 60 days
						</Radio>
						<Radio
							key="daily_amount_volumes_last20"
							style={radioStyle}
							name="cardName"
							value="daily_amount_volumes_last20"
						>
							Daily Amount Volumes Last 20 days
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
					<Col className="gutter-row" span={8}>
						<h3>Info</h3>
						<Radio
							key="issuer_auth_times"
							style={radioStyle}
							name="cardName"
							value="issuer_auth_times"
						>
							Issuer Auth Times
						</Radio>
						<Radio
							key="issuer_approval"
							style={radioStyle}
							name="cardName"
							value="issuer_approval"
						>
							Issuer Average Approval
						</Radio>
						<Radio
							key="avg_tps_last_7_days"
							style={radioStyle}
							name="cardName"
							value="avg_tps_last_7_days"
						>
							Average TPS in Last 7 Days
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
