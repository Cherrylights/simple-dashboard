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

class IssuerAuthTimes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: undefined,
			chart: {
				xAxisName: "Issuers",
				yAxisName: "Seconds",
				numberSuffix: "s",
				theme: this.props.isDarkTheme ? "candy" : "fusion",
				bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff",
				palettecolors: this.props.isDarkTheme ? "0396FF" : "#28C76F",
				plotGradientColor: this.props.isDarkTheme ? "#ABDCFF" : "#81FBB8",
				usePlotGradientColor: "1",
				plotFillAngle: 90
			}
		};
		this.getData = getData.bind(this);
	}

	componentDidMount() {
		this.getData("issuer_auth_times", undefined);
	}

	componentDidUpdate(prevProps) {
		if (this.props.isDarkTheme !== prevProps.isDarkTheme) {
			this.setState(prevState => ({
				chart: {
					...prevState.chart,
					theme: this.props.isDarkTheme ? "candy" : "fusion",
					bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff",
					palettecolors: this.props.isDarkTheme ? "0396FF" : "#28C76F",
					plotGradientColor: this.props.isDarkTheme ? "#ABDCFF" : "#81FBB8"
				}
			}));
		}
	}

	render() {
		// this.state.data && console.log(this.state.data);
		return (
			<Card
				className="grid-card"
				title={<span>{`CHART: ${this.props.el.params.cardName}`}</span>}
				extra={<CardDropdown el={this.props.el} />}
			>
				{this.state.data ? (
					this.state.data.length === 0 ? (
						<h5 className="message-no-data">NO DATA CURRENTLY AVAILABLE</h5>
					) : (
						<div id="chartContainer" className="chart-container">
							<ReactFusioncharts
								type="column2d"
								width="100%"
								height="100%"
								dataFormat="JSON"
								renderAt="chartContainer"
								dataSource={this.state}
							/>
						</div>
					)
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
)(IssuerAuthTimes);
