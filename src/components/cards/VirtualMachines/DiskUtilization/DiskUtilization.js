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

const getRandomTimer = max => {
	return Math.floor(Math.random() * Math.floor(max)) * 100;
};

class DiskUtilization extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			theme: this.props.isDarkTheme ? "candy" : "fusion",
			bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff",
			resetCounter: 0
		};
		this.getData = getData.bind(this);
		this.timerId = 0;
	}

	getValue = () => {
		let disk_data = sessionStorage.getItem(
			`disk_util_${this.props.el.params.node}`
		);
		disk_data = JSON.parse(disk_data);

		if (disk_data) {
			if (disk_data.chart_id === this.props.el.i) {
				this.getData(
					"disk_util",
					null,
					null,
					this.props.el.params.node ? this.props.el.params.node : null
				);
				sessionStorage.setItem(
					`disk_util_${this.props.el.params.node}`,
					JSON.stringify({
						data: this.state.data,
						chart_id: this.props.el.i
					})
				);
			} else {
				if (
					JSON.stringify(disk_data.data) === JSON.stringify(this.state.data)
				) {
					this.setState({ resetCounter: this.state.resetCounter + 1 }, () => {
						this.state.resetCounter > 4 &&
							sessionStorage.removeItem(
								`disk_util_${this.props.el.params.node}`
							);
						if (
							sessionStorage.getItem(
								`disk_util_${this.props.el.params.node}`
							) === null
						) {
							this.setState({ resetCounter: 0 });
						}
					});
				}
				this.setState({ data: disk_data.data });
			}
		} else {
			this.getData(
				"disk_util",
				null,
				null,
				this.props.el.params.node ? this.props.el.params.node : null
			);
			this.state.data &&
				sessionStorage.setItem(
					`disk_util_${this.props.el.params.node}`,
					JSON.stringify({
						data: this.state.data,
						chart_id: this.props.el.i
					})
				);
		}
	};

	componentDidMount() {
		this.getValue();
		this.timerId = setInterval(() => {
			this.getValue();
		}, 10000 + getRandomTimer(5));
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	componentDidUpdate(prevProps) {
		if (this.props.isDarkTheme !== prevProps.isDarkTheme) {
			this.setState(prevState => ({
				...prevState,
				theme: this.props.isDarkTheme ? "candy" : "fusion",
				bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff"
			}));
		}
	}

	render() {
		const diskUsed = this.state.data ? this.state.data.disk.utilization : 0;
		const swapSource = {
			chart: {
				lowerlimit: "0",
				upperlimit: "100",
				theme: this.state.theme,
				bgColor: this.state.bgColor,
				showLegend: false,
				labelFontSize: 15,
				showtickmarks: "0",
				showGaugeBorder: 1,
				gaugeBorderColor: this.props.isDarkTheme ? "#dfeff2" : "#555",
				gaugeBorderThickness: 0.3,
				baseFontColor: this.props.isDarkTheme ? "#ffffff" : "#353738"
			},
			colorrange: {
				color: [
					{
						minvalue: 0,
						maxvalue: diskUsed,
						label: `Used ${diskUsed}%`,
						code:
							diskUsed < 50 ? "#62b58f" : diskUsed < 75 ? "#EDD35C" : "#EB4034"
					},
					{
						minvalue: diskUsed,
						maxvalue: 100,
						label: `Free ${100 - diskUsed}%`,
						alpha: 0,
						code: "#ffffff",
						valueFontColor: "#ffffff"
					}
				]
			}
		};

		return (
			<Card
				className="grid-card"
				title={
					<span>{`PHX CANADA: ${this.props.el.params.cardName} - ${this.props.el.params.node}`}</span>
				}
				extra={<CardDropdown el={this.props.el} />}
			>
				{this.state.data ? (
					<div className="chart-container">
						<ReactFusioncharts
							type="hlineargauge"
							width="100%"
							height="90%"
							dataFormat="JSON"
							renderAt="chartContainer"
							dataSource={swapSource}
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
)(DiskUtilization);
