import React, { Component } from "react";
import { Statistic, Row, Col } from "antd";

export default class BasicStatistic extends Component {
	render() {
		return (
			<Row gutter={16}>
				<Col span={12}>
					<Statistic title="Transaction Amount" value={112893} precision={2} />
				</Col>
				<Col span={12}>
					<Statistic title="Highest Transaction" value={2893} precision={2} />
				</Col>
			</Row>
		);
	}
}
