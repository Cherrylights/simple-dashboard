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

class AverageTPS7 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: undefined,
			chart: {
				xAxisName: "Day",
				yAxisName: "Transactions per Second",
				theme: this.props.isDarkTheme ? "candy" : "fusion",
				bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff",
				lineColor: this.props.isDarkTheme ? "#90F7EC" : "#28C76F",
				anchorBgColor: this.props.isDarkTheme ? "#90F7EC" : "#28C76F"
			}
		};
		this.getData = getData.bind(this);
	}

	componentDidMount() {
		this.getData("avg_tps_last_7_days", undefined);
	}

	componentDidUpdate(prevProps) {
		if (this.props.isDarkTheme !== prevProps.isDarkTheme) {
			this.setState(prevState => ({
				chart: {
					...prevState.chart,
					theme: this.props.isDarkTheme ? "candy" : "fusion",
					bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff",
					lineColor: this.props.isDarkTheme ? "#90F7EC" : "#28C76F",
					anchorBgColor: this.props.isDarkTheme ? "#90F7EC" : "#28C76F"
				}
			}));
		}
	}

	render() {
		return (
			<Card
				className="grid-card"
				title={<span>{`CHART: ${this.props.el.params.cardName}`}</span>}
				extra={<CardDropdown el={this.props.el} />}
			>
				{this.state.data ? (
					<div className="chart-container">
						<ReactFusioncharts
							type="line"
							width="100%"
							height="100%"
							dataFormat="JSON"
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
)(AverageTPS7);
