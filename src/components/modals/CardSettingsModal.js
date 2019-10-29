import React, { Component } from "react";
import { Modal, Radio, Button, Col, Row } from "antd";

import { connect } from "react-redux";
import { hideModal } from "../../redux/actions/modalActions";
import {
	removeCard,
	updateCardSettings
} from "../../redux/actions/dashboardActions";

class CardSettingsModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			size: this.props.el.params.size
		};
	}
	onChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	};

	submitSettings = () => {
		// remove card from cards array
		this.props.removeCard(this.props.el.i, this.props.dashboardId);
		// re-add it with new params
		this.props.updateCardSettings(
			this.props.el,
			this.state.size,
			this.props.dashboardId
		);
		this.props.hideModal();
	};

	render() {
		return (
			<div>
				<Modal
					centered
					title="Chart Settings"
					visible={this.props.isModalShow}
					onOk={this.props.hideModal}
					onCancel={this.props.hideModal}
					footer={[
						<Button
							key="save"
							type="primary"
							onClick={() => {
								this.submitSettings();
							}}
						>
							Save
						</Button>,
						<Button
							key="cancel"
							color="secondary"
							onClick={() => {
								this.props.hideModal();
							}}
						>
							Cancel
						</Button>
					]}
				>
					<Row type="flex" justify="space-around" align="middle">
						<Col>
							<Radio.Group
								name="size"
								onChange={this.onChange}
								value={this.state.size}
							>
								<Radio value="minimum">Mimimum</Radio>
								<Radio value="normal">Normal</Radio>
								<Radio value="full">Full</Radio>
							</Radio.Group>
						</Col>
					</Row>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		dashboardId: state.tabReducer.activeKey,
		isModalShow: state.modalReducer.isModalShow,
		isDarkTheme: state.themeReducer
	};
};

export default connect(
	mapStateToProps,
	{ hideModal, updateCardSettings, removeCard }
)(CardSettingsModal);
