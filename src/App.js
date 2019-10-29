import React from "react";

import "react-grid-layout/css/styles.css";
import { Route, Switch } from "react-router-dom";

import { Layout } from "antd";

import { connect } from "react-redux";
import { fetchDashboards } from "./redux/actions/dashboardActions";
import { syncTheme } from "./redux/actions/themeActions";

import ModalManager from "./components/modals/ModalManager";
import DashNavbar from "./components/DashNavbar";
import PresentationModeGrid from "./components/PresentationModeGrid";
import InfoSidebar from "./components/InfoSidebar";
import TabsPanel from "./components/TabsPanel";

import { defaultLightTheme, defaultDarkTheme } from "./helpers/themes";
import dashboardData from "./dashboardData";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		if (!localStorage.getItem("dashboards")) {
			localStorage.setItem("dashboards", JSON.stringify(dashboardData));
		}
		this.props.fetchDashboards();
		this.props.syncTheme();
		let vars = {};
		try {
			let theme = JSON.parse(localStorage.getItem("darkTheme"));

			if (theme) {
				vars = {
					...defaultDarkTheme,
					...JSON.parse(localStorage.getItem("userDarkTheme"))
				};
			} else {
				vars = {
					...defaultLightTheme,
					...JSON.parse(localStorage.getItem("userLightTheme"))
				};
			}
		} finally {
			window.less.modifyVars(vars).catch(error => {
				console.log(error);
			});
		}
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	render() {
		const { Content } = Layout;
		return (
			<div
				className={`${
					this.props.isPresentationMode ? "presentation-mode" : ""
				} app`}
			>
				<InfoSidebar />
				<Layout className="layout">
					<DashNavbar />
					<Content>
						<Switch>
							<Route
								path="/"
								exact
								render={props =>
									this.props.isPresentationMode ? (
										<PresentationModeGrid {...props} />
									) : (
										<TabsPanel {...props} />
									)
								}
							/>
						</Switch>
					</Content>
				</Layout>
				<ModalManager />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isPresentationMode: state.modeReducer.isPresentationMode
	};
}

export default connect(
	mapStateToProps,
	{ fetchDashboards, syncTheme }
)(App);
