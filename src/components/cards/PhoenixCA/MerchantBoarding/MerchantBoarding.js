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

class MerchantBoarding extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: undefined,
			chart: {
				xAxisName: "Month",
				yAxisName: "Merchants",
				theme: this.props.isDarkTheme ? "candy" : "fusion",
				bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff",
				palettecolors: this.props.isDarkTheme ? "#9F44D3" : "#1D6FA3",
				plotGradientColor: this.props.isDarkTheme ? "#E2B0FF" : "#65FDF0",
				usePlotGradientColor: "1",
				plotFillAngle: 90
			}
		};
		this.getData = getData.bind(this);
	}

	componentDidMount() {
		this.getData("get_report", { report_type: "merchant_boarding_ytd" }, null);
	}

	componentDidUpdate(prevProps) {
		if (this.props.isDarkTheme !== prevProps.isDarkTheme) {
			this.setState(prevState => ({
				chart: {
					...prevState.chart,
					theme: this.props.isDarkTheme ? "candy" : "fusion",
					bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff",
					palettecolors: this.props.isDarkTheme ? "#9F44D3" : "#1D6FA3",
					plotGradientColor: this.props.isDarkTheme ? "#E2B0FF" : "#65FDF0"
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
							type="column2d"
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
)(MerchantBoarding);
