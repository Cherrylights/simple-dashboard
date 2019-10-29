import React, { Component } from "react";
import { Radio, Row, Col } from "antd";

export default class FinancialInstitutionsRadioGroup extends Component {
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
						<h3>Widgets</h3>
						<Radio
							key="tps_on_node"
							style={radioStyle}
							name="cardName"
							value="tps_on_node"
						>
							TPS on Node
						</Radio>
					</Col>
					<Col className="gutter-row" span={12}>
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
					</Col>
				</Row>
			</Radio.Group>
		);
	}
}
