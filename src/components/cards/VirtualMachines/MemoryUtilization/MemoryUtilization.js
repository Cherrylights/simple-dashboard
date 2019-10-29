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

class MemoryUtilization extends Component {
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
		let mem_data = sessionStorage.getItem(
			`mem_util_${this.props.el.params.node}`
		);
		mem_data = JSON.parse(mem_data);

		if (mem_data) {
			if (mem_data.chart_id === this.props.el.i) {
				this.getData(
					"mem_util",
					null,
					null,
					this.props.el.params.node ? this.props.el.params.node : null
				);
				sessionStorage.setItem(
					`mem_util_${this.props.el.params.node}`,
					JSON.stringify({
						data: this.state.data,
						chart_id: this.props.el.i
					})
				);
			} else {
				if (JSON.stringify(mem_data.data) === JSON.stringify(this.state.data)) {
					this.setState({ resetCounter: this.state.resetCounter + 1 }, () => {
						this.state.resetCounter > 4 &&
							sessionStorage.removeItem(
								`mem_util_${this.props.el.params.node}`
							);
						if (
							sessionStorage.getItem(
								`mem_util_${this.props.el.params.node}`
							) === null
						) {
							this.setState({ resetCounter: 0 });
						}
					});
				}
				this.setState({ data: mem_data.data });
			}
		} else {
			this.getData(
				"mem_util",
				null,
				null,
				this.props.el.params.node ? this.props.el.params.node : null
			);
			this.state.data &&
				sessionStorage.setItem(
					`mem_util_${this.props.el.params.node}`,
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
		const ramUsed = this.state.data
			? (this.state.data.memory.used / this.state.data.memory.total) * 100
			: 0;
		const bCache = this.state.data
			? (this.state.data.memory.used / this.state.data.memory.total) * 100 +
			  (this.state.data.memory.buffCache / this.state.data.memory.total) * 100
			: 0;
		const bCachePercent = this.state.data
			? (this.state.data.memory.buffCache / this.state.data.memory.total) * 100
			: 0;

		const ramFree = this.state.data
			? (this.state.data.memory.free / this.state.data.memory.total) * 100
			: 0;
		const ramSource = {
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
						maxvalue: ramUsed,
						label: `Used ${ramUsed.toFixed(2)}%`,
						code:
							ramUsed < 50 ? "#62b58f" : ramUsed < 75 ? "#EDD35C" : "#EB4034"
					},
					{
						minvalue: this.state.data
							? (this.state.data.memory.used / this.state.data.memory.total) *
							  100
							: 0,
						maxvalue: bCache,
						label: `Buff Cache ${bCachePercent.toFixed(2)}%`,
						code: "#c6cacc"
					},
					{
						minvalue: this.state.data
							? (this.state.data.memory.used / this.state.data.memory.total) *
									100 +
							  (this.state.data.memory.buffCache /
									this.state.data.memory.total) *
									100
							: 0,
						maxvalue: 100,
						label: `Free ${ramFree.toFixed(2)}%`,
						code: "#51f0b3",
						alpha: 0
					}
				]
			}
		};

		const swapUsed = this.state.data
			? (this.state.data.memory.swapUsed / this.state.data.memory.swapTotal) *
			  100
			: 0;
		const swapFree = this.state.data
			? (this.state.data.memory.swapFree / this.state.data.memory.swapTotal) *
			  100
			: 0;
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
						maxvalue: swapUsed,
						label: `Used ${swapUsed.toFixed(2)}%`,
						code:
							swapUsed < 50 ? "#62b58f" : swapUsed < 75 ? "#EDD35C" : "#EB4034"
					},
					{
						minvalue: this.state.data
							? (this.state.data.memory.swapUsed /
									this.state.data.memory.swapTotal) *
							  100
							: 0,
						maxvalue: 100,
						label: `Free ${swapFree.toFixed(2)}%`,
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
					<div className="mem_container">
						{this.props.el.params.size !== "minimum" && (
							<span>RAM Utilization</span>
						)}
						<div className="mem_util">
							<ReactFusioncharts
								type="hlineargauge"
								width="100%"
								height="90%"
								dataFormat="JSON"
								renderAt="chartContainer"
								dataSource={ramSource}
							/>
						</div>
						{this.props.el.params.size !== "minimum" && (
							<span>Swap Utilization</span>
						)}
						<div className="mem_util">
							<ReactFusioncharts
								type="hlineargauge"
								width="100%"
								height="90%"
								dataFormat="JSON"
								renderAt="chartContainer"
								dataSource={swapSource}
							/>
						</div>
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
)(MemoryUtilization);
