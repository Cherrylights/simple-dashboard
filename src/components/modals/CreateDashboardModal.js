import React, { Component } from "react";
import { Modal, Button, Form, Input, message } from "antd";

import { connect } from "react-redux";
import { hideModal } from "../../redux/actions/modalActions";
import { createDashboard } from "../../redux/actions/dashboardActions";
import { addTab, setActiveKey } from "../../redux/actions/tabActions";

import { handleChange, makeid } from "../../helpers/functions";

class CreateDashboardModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dashboardName: "",
			dashboardComment: ""
		};
		this.handleChange = handleChange.bind(this);
	}

	createDashboard = () => {
		const dashboard = {
			id: makeid(10),
			name: this.state.dashboardName,
			comment: this.state.dashboardComment,
			data: []
		};
		this.props.createDashboard(dashboard);
		this.props.addTab({ key: dashboard.id, title: dashboard.name });
		this.props.setActiveKey(dashboard.id);
		this.props.hideModal();
	};

	render() {
		return (
			<Modal
				centered
				title="Create Dashboard"
				visible={this.props.isModalShow}
				onCancel={this.props.hideModal}
				footer={[
					<Button
						key="save"
						type="primary"
						onClick={() => {
							this.createDashboard();
							message.success(`New dashboard created.`);
						}}
						disabled={this.state.dashboardName === ""}
					>
						Create
					</Button>,
					<Button key="cancel" type="secondary" onClick={this.props.hideModal}>
						Cancel
					</Button>
				]}
			>
				<Form layout="horizontal">
					<Form.Item label="Dashboard Name">
						<Input
							placeholder="Name"
							name="dashboardName"
							onChange={this.handleChange}
						/>
					</Form.Item>

					<Form.Item label="Dashboard Comment">
						<Input
							type="textarea"
							rows="4"
							placeholder="Short comment about dashboard"
							name="dashboardComment"
							onChange={this.handleChange}
						/>
					</Form.Item>
				</Form>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		isModalShow: state.modalReducer.isModalShow
	};
};

export default connect(
	mapStateToProps,
	{
		hideModal,
		createDashboard,
		addTab,
		setActiveKey
	}
)(CreateDashboardModal);
