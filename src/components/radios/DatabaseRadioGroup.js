import React, { Component } from "react";
import { Radio, Row, Col } from "antd";

export default class DatabaseRadioGroup extends Component {
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
					</Col>
					<Col className="gutter-row" span={12}>
						<h3>Indicators</h3>
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
