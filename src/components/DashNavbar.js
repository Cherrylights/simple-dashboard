import React from "react";

// Redux
import { connect } from "react-redux";
import { showModal } from "../redux/actions/modalActions";
import { toggleSidebar } from "../redux/actions/sidebarActions";

import { FaBell, FaCog } from "react-icons/fa";

import { Menu, Icon, Dropdown, Button } from "antd";

class DashNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.nav = React.createRef();
	}

	componentDidMount() {
		document.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				this.nav.current.classList.add("shrink");
			} else {
				this.nav.current.classList.remove("shrink");
			}
		});
	}
	render() {
		const currentDashboard = this.props.dashboards.filter(
			dashboard => dashboard.id === this.props.dashboardId
		)[0];
		const cards = currentDashboard && currentDashboard.data;
		return (
			<>
				<header className="header-global" ref={this.nav}>
					<div>
						<h1 className="navbar-title">Phoenix CA Monitoring</h1>
						<div>
							<Dropdown
								overlay={
									<Menu>
										{this.props.currentScreenIsPristine ? null : (
											<Menu.Item
												key="add-widget"
												onClick={() => {
													cards.length >= 9
														? this.props.showModal("CannotAddCardModal")
														: this.props.showModal("CardModal");
												}}
											>
												Add Widget
											</Menu.Item>
										)}
										<Menu.Item
											key="create-new-dashboard"
											onClick={() => {
												this.props.showModal("CreateDashboardModal");
											}}
										>
											Create New Dashboard
										</Menu.Item>
										<Menu.Item
											key="load-existing-dashboard"
											onClick={() => {
												// this.props.syncDashboards();
												this.props.showModal("LoadDashboardModal");
											}}
										>
											Your Dashboard Library
										</Menu.Item>
									</Menu>
								}
							>
								<Button className="navbar-button">
									<i className="fa fa-bars mr-2" />
									<span>Actions</span>
									<Icon type="down" />
								</Button>
							</Dropdown>
							<Button
								className="navbar-button"
								onClick={() => {
									this.props.showModal("SettingsModal");
								}}
							>
								<FaCog style={{ position: "relative", top: "1px" }} />
								<span>Settings </span>
							</Button>
							<Button
								className="navbar-button"
								onClick={this.props.toggleSidebar}
							>
								<FaBell style={{ position: "relative", top: "1px" }} />
								<span>Notifications</span>
							</Button>
						</div>
					</div>
				</header>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		dashboards: state.dashboardReducer.dashboards,
		dashboardId: state.tabReducer.activeKey,
		isDarkTheme: state.themeReducer,
		isPresentationMode: state.modeReducer.isPresentationMode,
		currentScreenIsPristine: state.tabReducer.currentScreenIsPristine
	};
}

export default connect(
	mapStateToProps,
	{ showModal, toggleSidebar }
)(DashNavbar);
