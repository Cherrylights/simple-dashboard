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
							key="most_freq_q"
							style={radioStyle}
							name="cardName"
							value="most_freq_q"
						>
							10 most frequent queries
						</Radio>
						<Radio
							key="q_exec_time"
							style={radioStyle}
							name="cardName"
							value="q_exec_time"
						>
							Average query execution time
						</Radio>
						<Radio
							key="db_uptime"
							style={radioStyle}
							name="cardName"
							value="db_uptime"
						>
							Uptime
						</Radio>
						<Radio
							key="other-stuff"
							style={radioStyle}
							name="cardName"
							value="other-stuff"
						>
							Other Stuff
						</Radio>
					</Col>
				</Row>
			</Radio.Group>
		);
	}
}
