import React from "react";
import { Card } from "antd";
import Loader from "react-loaders";
import { getData } from "../../../../helpers/api";
import { connect } from "react-redux";
import CardDropdown from "../../../CardDropdown";

import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

charts(fusioncharts);

class DailyAmountVolumes20 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: undefined,
			chart: {
				xAxisName: "Day",
				yAxisName: "Volume",
				theme: this.props.isDarkTheme ? "candy" : "fusion",
				bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff",
				usePlotGradientColor: true,
				plotFillColor: this.props.isDarkTheme ? "#4facfe" : "#ff5858",
				plotGradientColor: this.props.isDarkTheme ? "#00f2fe" : "#f09819",
				plotFillAngle: 140,
				plotFillRatio: 10
			}
		};
		this.getData = getData.bind(this);
	}

	componentDidMount() {
		this.getData(
			"get_report",
			{ report_type: "daily_amount_volumes_last20" },
			null
		);
	}

	componentDidUpdate(prevProps) {
		if (this.props.isDarkTheme !== prevProps.isDarkTheme) {
			this.setState(prevState => ({
				chart: {
					...prevState.chart,
					theme: this.props.isDarkTheme ? "candy" : "fusion",
					bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff",
					usePlotGradientColor: true,
					plotFillColor: this.props.isDarkTheme ? "#4facfe" : "#ff5858",
					plotGradientColor: this.props.isDarkTheme ? "#00f2fe" : "#f09819",
					plotFillAngle: 140,
					plotFillRatio: 10
					// "#f43b47"  "#453a94"
				}
			}));
		}
	}

	render() {
		return (
			<Card
				className="grid-card"
				title={<span>{`PHX CANADA : ${this.props.el.params.cardName}`}</span>}
				extra={<CardDropdown el={this.props.el} />}
			>
				{this.state.data ? (
					<div id="chartContainer" className="chart-container">
						<ReactFusioncharts
							type="area2d"
							width="100%"
							height="100%"
							dataFormat="JSON"
							renderAt="chartContainer"
							dataSource={this.state}
						/>
					</div>
				) : (
					<Loader className="loader-bubble" type="ball-scale-multiple" />
				)}
			</Card>
		);
	}
}

const mapStateToProps = state => {
	return {
		isDarkTheme: state.themeReducer.darkTheme
	};
};

export default connect(
	mapStateToProps,
	null
)(DailyAmountVolumes20);
