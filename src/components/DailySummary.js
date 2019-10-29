import React from "react";
import { List, Icon, Button } from "antd";

import { connect } from "react-redux";
import { showModal } from "../redux/actions/modalActions";

const data = [
	{
		time: "19:00",
		descr: "GENERATE GAF FILE",
		status: true
	},
	{
		time: "19:10",
		descr: "GENERATE THX SUMMARY FILE",
		status: true
	},
	{
		time: "19:15",
		descr: "SUBMIT SOMETHIN SOMEWHERE",
		status: true
	},
	{
		time: "19:40",
		descr: "SEND FILE TO SFG",
		status: false
	}
];

class DailySummary extends React.Component {
	render() {
		return (
			<List
				itemLayout="horizontal"
				dataSource={data}
				renderItem={item => (
					<List.Item
						actions={[
							<Button
								type="dashed"
								onClick={() => {
									this.props.showModal("SummaryActionModal");
								}}
							>
								Details
							</Button>
						]}
					>
						<List.Item.Meta
							avatar={
								item.status ? (
									<Icon
										type="check-circle"
										style={{ fontSize: "26px", color: "#62B58F" }}
									/>
								) : (
									<Icon
										type="warning"
										style={{ fontSize: "26px", color: "#F2726F" }}
									/>
								)
							}
							title={item.time}
							description={item.descr}
						/>
					</List.Item>
				)}
			/>
			// <ListGroup>
			// 	<ListGroupItem className="d-flex justify-content-between align-items-center">
			// 		<h5>19:00 - GENERATE GAF FILE </h5>
			// 		<Badge color="success">Success</Badge>
			// 	</ListGroupItem>
			// 	<ListGroupItem className="d-flex justify-content-between align-items-center">
			// 		<h5>19:15 - GENERATE THX SUMMARY </h5>
			// 		<Badge color="success">Success</Badge>
			// 	</ListGroupItem>
			// 	<ListGroupItem className="d-flex justify-content-between align-items-center">
			// 		<h5>19:20 - SUBMIT SOMETHIN SOMEWHERE </h5>
			// 		<Badge color="success">Success</Badge>
			// 	</ListGroupItem>
			// 	<ListGroupItem className="d-flex justify-content-between align-items-center">
			// 		<h5>19:25 - SEND FILE TO SFG </h5>
			// 		<Button
			// 			onClick={() => {
			// 				this.props.showModal("SummaryActionModal");
			// 			}}
			// 		>
			// 			Action
			// 		</Button>
			// 		<Badge color="warning">Failed</Badge>
			// 	</ListGroupItem>
			// 	<ListGroupItem className="d-flex justify-content-between align-items-center">
			// 		<h5>19:35 - RECEIVE FILE FROM SHELL </h5>
			// 		<Badge color="success">Success</Badge>
			// 	</ListGroupItem>
			// </ListGroup>
		);
	}
}

export default connect(
	null,
	{ showModal }
)(DailySummary);
