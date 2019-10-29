import React, { Component } from "react";
import { Descriptions, Badge } from "antd";

export default class DescriptionList extends Component {
	render() {
		return (
			<Descriptions title="User Info" layout="vertical" bordered>
				<Descriptions.Item label="Status">
					<Badge status="processing" text="Running" />
				</Descriptions.Item>
				<Descriptions.Item label="Order time">
					2018-04-24 18:00:00
				</Descriptions.Item>
				<Descriptions.Item label="Usage Time">
					2019-04-24 18:00:00
				</Descriptions.Item>
				<Descriptions.Item label="Config Info">
					Data disk type: MongoDB
					<br />
					Database version: 3.4
					<br />
					Package: dds.mongo.mid
					<br />
					Storage space: 10 GB
				</Descriptions.Item>
			</Descriptions>
		);
	}
}
