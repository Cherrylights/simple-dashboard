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
					<Col className="gutter-row" span={16}>
						<h3>Widgets</h3>
						<Radio
							key="inst_info"
							style={radioStyle}
							name="cardName"
							value="inst_info"
						>
							Institution Info
						</Radio>
						<Radio
							key="connection_status"
							style={radioStyle}
							name="cardName"
							value="connection_status"
						>
							Connections State
						</Radio>
						<Radio
							key="tps_on_node"
							style={radioStyle}
							name="cardName"
							value="tps_on_node"
						>
							TPS on Node
						</Radio>
					</Col>
				</Row>
			</Radio.Group>
		);
	}
}
