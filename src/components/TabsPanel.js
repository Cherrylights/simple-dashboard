import React, { Component } from "react";
import { Tabs } from "antd";

import { connect } from "react-redux";

import ResponsiveGrid from "./ResponsiveGrid";
import {
	fetchTabs,
	removeTab,
	setScreenIsPristine,
	fetchActiveKey,
	setActiveKey
} from "../redux/actions/tabActions";

const { TabPane } = Tabs;

class TabsPanel extends Component {
	componentDidMount() {
		this.props.fetchTabs();
		// this.props.fetchActiveKey();
	}

	componentDidUpdate(prevProps) {
		if (this.props.tabs.length !== prevProps.tabs.length) {
			if (this.props.tabs.length > prevProps.tabs.length) {
				this.add();
			}
			if (this.props.tabs.length > 0) {
				this.props.setScreenIsPristine(false);
			} else {
				this.props.setScreenIsPristine(true);
			}
		}

		if (
			JSON.stringify(prevProps.dashboards) !==
			JSON.stringify(this.props.dashboards)
		) {
			localStorage.setItem("dashboards", JSON.stringify(this.props.dashboards));
			// console.log("push to server");
			// console.log(this.props.dashboards);
		}
	}

	onChange = activeKey => {
		this.props.setActiveKey(activeKey);
	};

	onEdit = (targetKey, action) => {
		this[action](targetKey);
	};

	add = () => {
		const activeKey = this.props.tabs[this.props.tabs.length - 1].key;
		this.props.setActiveKey(activeKey);
	};

	remove = targetKey => {
		let { activeKey } = this.props;
		let lastIndex;
		this.props.tabs.forEach((tab, i) => {
			if (tab.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		this.props.removeTab(targetKey);
		if (this.props.tabs.length && activeKey === targetKey) {
			if (lastIndex >= 0) {
				activeKey = this.props.tabs[lastIndex].key;
			} else {
				activeKey = this.props.tabs[0].key;
			}
		}
		this.props.setActiveKey(activeKey);
	};

	render() {
		return (
			<Tabs
				hideAdd
				onChange={this.onChange}
				activeKey={this.props.activeKey}
				type="editable-card"
				onEdit={this.onEdit}
			>
				{this.props.tabs.map(tab => (
					<TabPane tab={tab.title} key={tab.key}>
						<ResponsiveGrid id={tab.key} />
					</TabPane>
				))}
			</Tabs>
		);
	}
}

const mapStateToProps = state => {
	return {
		tabs: state.tabReducer.tabs,
		activeKey: state.tabReducer.activeKey,
		dashboards: state.dashboardReducer.dashboards
	};
};

export default connect(
	mapStateToProps,
	{ fetchTabs, removeTab, setActiveKey, fetchActiveKey, setScreenIsPristine }
)(TabsPanel);
