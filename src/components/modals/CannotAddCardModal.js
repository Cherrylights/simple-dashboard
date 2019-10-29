import React, { Component } from "react";
import { Modal, Button, Col, Row } from "antd";

import { connect } from "react-redux";
import { hideModal } from "../../redux/actions/modalActions";

class CannotAddCardModal extends Component {
	render() {
		return (
			<Modal
				centered
				title="This screen is full"
				visible={this.props.isModalShow}
				onOk={this.props.hideModal}
				onCancel={this.props.hideModal}
				footer={[
					<Button key="ok" type="primary" onClick={this.props.hideModal}>
						Ok
					</Button>,
					<Button key="cancel" color="secondary" onClick={this.props.hideModal}>
						Cancel
					</Button>
				]}
			>
				<Row type="flex" justify="space-around" align="middle">
					<Col>Each screen can only have maximum 9 charts.</Col>
				</Row>
			</Modal>
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
)(CannotAddCardModal);
