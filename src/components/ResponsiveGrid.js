import React from "react";
import { Responsive as ResponsiveReactGridLayout } from "react-grid-layout";

import { connect } from "react-redux";
import { updateLayout } from "../redux/actions/dashboardActions";

import CreateCard from "./CreateCard";

class ResponsiveGrid extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			cols: 12,
			windowWidth: 0,
			windowHeight: 0,
			theme: this.props.isDarkTheme ? "candy" : "fusion",
			layoutArr: []
		};
		this.layoutArr = [];
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", () => this.updateWindowDimensions());
		this.onBreakpointChange("lg", 12);
	}

	componentDidUpdate(prevProps) {
		if (this.props.isDarkTheme !== prevProps.isDarkTheme) {
			this.setState({
				theme: this.state.theme === "fusion" ? "candy" : "fusion"
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", () => this.updateWindowDimensions());
	}

	onLayoutChange = layout => {
		if (JSON.stringify(layout) !== JSON.stringify(this.layoutArr)) {
			this.layoutArr = layout;
			this.props.updateLayout(layout, this.props.currentDashboardId);
		}
	};

	updateWindowDimensions = () => {
		this.setState({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		});
	};

	onBreakpointChange = (breakpoint, cols) => {
		this.setState({
			breakpoint: breakpoint,
			cols: cols
		});
	};

	editSettings = i => {
		this.setState({ showSettingsModal: true });
	};

	render() {
		// rowHeight = (((viewportHeight - topNavbar - tabPane - 4*margins) / 3 ) - difference) / rowsNumberInNormalSize
		const rowHeightResult =
			((this.state.windowHeight - 60 - 30 - 40) / 3 - 30) / 4;
		const currentDashboard = this.props.dashboards.filter(
			dashboard => dashboard.id === this.props.id
		)[0];
		const cards =
			currentDashboard &&
			this.props.dashboards.filter(
				dashboard => dashboard.id === this.props.id
			)[0].data;
		return (
			<div>
				<ResponsiveReactGridLayout
					className="layout"
					width={this.state.windowWidth}
					breakpoints={{
						lg: 1200,
						md: 996,
						sm: 768,
						xs: 480,
						xxs: 0
					}}
					cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					rowHeight={rowHeightResult}
					onLayoutChange={this.onLayoutChange}
					// onResizeStop={this.onResizeStop}
					onBreakpointChange={this.onBreakpointChange}
					layouts={{ lg: cards }}
					compactType="vertical"
				>
					{cards.map(card => (
						<div key={card.i} data-grid={card}>
							<CreateCard el={card} />
						</div>
					))}
				</ResponsiveReactGridLayout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		dashboards: state.dashboardReducer.dashboards,
		currentDashboardId: state.tabReducer.activeKey,
		isDarkTheme: state.themeReducer.darkTheme
	};
};

export default connect(
	mapStateToProps,
	{ updateLayout }
)(ResponsiveGrid);

// onResizeStop = (layout, oldLayoutItem, layoutItem, placeholder) => {
// 	const cardId = layoutItem.i;
// 	const card = this.props.cards.filter(card => card.i === cardId)[0];

// 	if (layoutItem.h <= card.params.height.minimum) {
// 		this.props.updateCardSize({ cardId: layoutItem.i, size: "minimum" });
// 	} else if (
// 		layoutItem.h < card.params.height.full &&
// 		layoutItem.h > card.params.height.normal
// 	) {
// 		this.props.updateCardSize({ cardId: layoutItem.i, size: "normal" });
// 	} else if (layoutItem.h >= card.params.height.full) {
// 		this.props.updateCardSize({ cardId: layoutItem.i, size: "full" });
// 	}
// };

// onLayoutChange = layout => {
// Solution 1: For some reason, this.state.layout returns wrong layout data, even setState sets the correct one back
// if (JSON.stringify(layout) !== JSON.stringify(this.state.layoutArr)) {
// 	console.log("This.state.layout: " + JSON.stringify(this.state.layoutArr));
// 	console.log("Layout passed in: " + JSON.stringify(layout));
// 	this.setState({ layoutArr: layout });
// 	console.log(
// 		"Updated this.state.layout: " + JSON.stringify(this.state.layoutArr)
// 	);
// }

// Solution 2: Don't use state, use a regular property to track layout changes
// if (JSON.stringify(layout) !== JSON.stringify(this.layoutArr)) {
// 	console.log("this.layout: " + JSON.stringify(this.layoutArr));
// 	console.log("Layout passed in: " + JSON.stringify(layout));
// 	this.layoutArr = layout;
// 	console.log(
// 		"Updated this.state.layout: " + JSON.stringify(this.layoutArr)
// 	);
// }
// if (JSON.stringify(layout) !== JSON.stringify(this.layoutArr)) {
// 	this.layoutArr = layout;
// 	this.props.updateLayout(layout, this.props.currentDashboardId);
// setTimeout(() => {
// 	// removing a dashboard also triggers onLayoutChange so we need to check if dashboardId exists first
// 	if (this.props.currentDashboardId) {
// 		this.props.updateDashboard({
// 			id: this.props.currentDashboardId,
// 			data: this.props.cards
// 		});
// 	}
// }, 0);
// }
// console.log("layout change");
// };
