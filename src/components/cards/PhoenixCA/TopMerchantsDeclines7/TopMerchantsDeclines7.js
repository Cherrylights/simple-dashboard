import React, { Component } from "react";
import { Card } from "antd";
import Loader from "react-loaders";
import { getData } from "../../../../helpers/api";
import { connect } from "react-redux";
import CardDropdown from "../../../CardDropdown";

import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

charts(fusioncharts);

class TopMerchantsDeclines7 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			chart: {
				yAxisName: "Decline Avg",
				numberSuffix: "%",
				theme: this.props.isDarkTheme ? "candy" : "fusion",
				bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff",
				usePlotGradientColor: true,
				paletteColors: this.props.isDarkTheme ? "#5aa6cc" : "#FEB692",
				plotGradientColor: this.props.isDarkTheme ? "#BB4E75" : "#EA5455",
				plotFillAngle: 180,
				// plotFillRatio: 10
				plotFillRatio: 23
			}
		};
		this.getData = getData.bind(this);
	}

	componentDidMount() {
		this.getData("get_report", { report_type: "top_merchants_declines" }, null);
	}

	componentDidUpdate(prevProps) {
		if (this.props.isDarkTheme !== prevProps.isDarkTheme) {
			this.setState(prevState => ({
				chart: {
					...prevState.chart,
					theme: this.props.isDarkTheme ? "candy" : "fusion",
					bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff",
					usePlotGradientColor: true,
					paletteColors: this.props.isDarkTheme ? "6fb4d6" : "#FEB692",
					plotGradientColor: this.props.isDarkTheme ? "#BB4E75" : "#EA5455",
					plotFillAngle: 180,
					plotFillRatio: 10
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
					<div className="chart-container">
						<ReactFusioncharts
							type="bar2d"
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
)(TopMerchantsDeclines7);
