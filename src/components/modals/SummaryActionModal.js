import React, { Component } from "react";

import { Modal, Icon, Button, notification, Steps } from "antd";
import { connect } from "react-redux";
import { hideModal } from "../../redux/actions/modalActions";

class SummaryActionModal extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	openNotification = () => {
		notification.open({
			duration: 1.5,
			message: "Success",
			description: "File is being resubmitted to SFG",
			onClick: () => {
				console.log("Notification Clicked!");
			}
		});
	};

	render() {
		const { Step } = Steps;
		return (
			<div>
				<Modal
					centered={true}
					width={"35%"}
					title="Job status"
					visible={this.props.isModalShow}
					onOk={this.props.hideModal}
					onCancel={this.props.hideModal}
					footer={[
						<Button key="back" onClick={this.openNotification}>
							Take Action
						</Button>,
						<Button key="submit" type="primary" onClick={this.props.hideModal}>
							Close
						</Button>
					]}
				>
					<Steps current={1} status="error">
						<Step title="Generate file" icon={<Icon type="file-done" />} />
						<Step title="Transfer to SFG" icon={<Icon type="swap" />} />
						<Step title="Complete" icon={<Icon type="check-square" />} />
					</Steps>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isModalShow: state.modalReducer.isModalShow,
		isDarkTheme: state.themeReducer
	};
};

export default connect(
	mapStateToProps,
	{ hideModal }
)(SummaryActionModal);
