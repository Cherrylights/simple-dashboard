// AntD Version
import React, { Component } from "react";
import { Modal, Button, List, message } from "antd";

import { connect } from "react-redux";
import { hideModal } from "../../redux/actions/modalActions";
import { removeDashboard } from "../../redux/actions/dashboardActions";
import {
	addTab,
	removeTab,
	setActiveKey
} from "../../redux/actions/tabActions";

class LoadDashboardModal extends Component {
	render() {
		return (
			<Modal
				centered
				title="Load Dashboard"
				visible={this.props.isModalShow}
				onOk={this.props.hideModal}
				onCancel={this.props.hideModal}
				footer={[
					<Button type="secondary" key="cancel" onClick={this.props.hideModal}>
						Cancel
					</Button>
				]}
			>
				<List
					itemLayout="horizontal"
					dataSource={this.props.dashboards}
					renderItem={dashboard => (
						<List.Item
							actions={[
								<Button
									type="primary"
									onClick={() => {
										this.props.addTab({
											title: dashboard.name,
											key: dashboard.id
										});
										this.props.setActiveKey(dashboard.id);
										this.props.hideModal();
										message.success(`${dashboard.name} loaded.`);
									}}
								>
									Load
								</Button>,
								<Button
									type="secondary"
									onClick={() => {
										this.props.removeTab(dashboard.id);
										this.props.removeDashboard(dashboard.id);
										// if deleted dashboard is currently active in the tab pane, we need to reset the active key
										if (dashboard.id === this.props.activeKey) {
											const newActiveKey = this.props.tabs[0]
												? this.props.tabs[0].key
												: "key";
											this.props.setActiveKey(newActiveKey);
										}
										this.props.hideModal();
										message.success(`${dashboard.name} deleted.`);
									}}
								>
									Delete
								</Button>
							]}
						>
							<List.Item.Meta
								title={dashboard.name}
								description={dashboard.comment}
							/>
						</List.Item>
					)}
				/>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		dashboards: state.dashboardReducer.dashboards,
		tabs: state.tabReducer.tabs,
		activeKey: state.tabReducer.activeKey,
		isModalShow: state.modalReducer.isModalShow
	};
};

export default connect(
	mapStateToProps,
	{
		hideModal,
		removeDashboard,
		addTab,
		removeTab,
		setActiveKey
	}
)(LoadDashboardModal);
