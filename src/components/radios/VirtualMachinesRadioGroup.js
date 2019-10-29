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
							key="cpu_utilization"
							style={radioStyle}
							name="cardType"
							value="cpu_utilization"
						>
							CPU Utilization
						</Radio>
						<Radio
							key="disk_util"
							style={radioStyle}
							name="cardType"
							value="disk_util"
						>
							Disk Utilization
						</Radio>
					</Col>
				</Row>
			</Radio.Group>
		);
	}
}
