import React, { Component } from "react";
import { Dropdown, Menu, Icon } from "antd";
import { connect } from "react-redux";

import { showModal } from "../redux/actions/modalActions";
import { removeCard } from "../redux/actions/dashboardActions";

class CardDropdown extends Component {
	render() {
		return (
			<Dropdown
				overlay={
					<Menu>
						<Menu.Item
							key="1"
							onClick={() =>
								this.props.showModal("CardSettingsModal", { el: this.props.el })
							}
						>
							Settings
						</Menu.Item>
						<Menu.Divider />
						<Menu.Item
							key="2"
							onClick={() =>
								this.props.removeCard(this.props.el.i, this.props.dashboardId)
							}
						>
							Delete
						</Menu.Item>
					</Menu>
				}
				trigger={["click"]}
			>
				<Icon type="ellipsis" />
			</Dropdown>
		);
	}
}

const mapStateToProps = state => {
	return {
		dashboardId: state.tabReducer.activeKey
	};
};

export default connect(
	mapStateToProps,
	{ removeCard, showModal }
)(CardDropdown);
