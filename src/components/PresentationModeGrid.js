import React from "react";
import { Responsive as ResponsiveReactGridLayout } from "react-grid-layout";
import { connect } from "react-redux";
import { updateLayout } from "../redux/actions/dashboardActions";
import { Carousel } from "antd";
import CreateCard from "./CreateCard";

const settings = {
	dots: false,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	speed: 1000,
	fade: true,
	autoplaySpeed: 5000,
	cssEase: "linear",
	pauseOnHover: false
};

class PresentationModeGrid extends React.PureComponent {
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
		// rowHeight = (((viewportHeight - topNavbar - 4*margins) / 3 ) - difference) / rowsNumberInNormalSize
		const rowHeightResult = ((this.state.windowHeight - 10 - 40) / 3 - 30) / 4;
		const dashboards = this.props.tabs.map(tab => {
			const dashboard = this.props.dashboards.filter(
				dashboard => dashboard.id === tab.key
			)[0];
			return dashboard;
		});
		return (
			<Carousel {...settings}>
				{dashboards.map((dashboard, index) => {
					const cards = dashboard.data;
					return (
						<div key={index}>
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
								// onLayoutChange={this.onLayoutChange} // have to disable onLayoutChange event listener otherwise will generate unique key issue
								onResize={this.onResize}
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
				})}
			</Carousel>
		);
	}
}

const mapStateToProps = state => {
	return {
		dashboards: state.dashboardReducer.dashboards,
		tabs: state.tabReducer.tabs,
		currentDashboardId: state.tabReducer.activeKey,
		isDarkTheme: state.themeReducer.darkTheme
	};
};

export default connect(
	mapStateToProps,
	{ updateLayout }
)(PresentationModeGrid);
