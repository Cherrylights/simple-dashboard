import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../redux/actions/sidebarActions";
import { Timeline, Icon } from "antd";
import { Drawer, Card } from "antd";

class InfoSidebar extends Component {
	state = { visible: false, placement: "left" };

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};

	onChange = e => {
		this.setState({
			placement: e.target.value
		});
	};

	render() {
		const { isSidebarOpen, toggleSidebar } = this.props;
		const { Meta } = Card;
		return (
			<div>
				<Drawer
					title="Recent events"
					placement={"right"}
					closable={true}
					onClose={toggleSidebar}
					visible={isSidebarOpen}
					width={"30%"}
					zIndex={2000}
				>
					<Timeline>
						<Timeline.Item
							dot={<Icon type="warning" style={{ fontSize: "25px" }} />}
							color="red"
						>
							<p style={{ marginBottom: 0 }}>12:00</p>
							<Card style={{ width: "100%" }}>
								<Meta
									title="Visa Brampton down"
									description="Reason: TIMEOUT"
								/>
							</Card>
						</Timeline.Item>
						<Timeline.Item
							dot={<Icon type="check-circle" style={{ fontSize: "25px" }} />}
							color="green"
						>
							<p style={{ marginBottom: 0 }}>12:00</p>
							<Card style={{ width: "100%" }}>
								<Meta title="Visa Brampton up" description="Reason: TIMEOUT" />
							</Card>
						</Timeline.Item>
					</Timeline>
				</Drawer>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isSidebarOpen: state.sidebarReducer
	};
}
export default connect(
	mapStateToProps,
	{ toggleSidebar }
)(InfoSidebar);
