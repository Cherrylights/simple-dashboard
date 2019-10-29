import React, { Component } from "react";
import { Card } from "antd";
import Loader from "react-loaders";
import { getData } from "../../../../helpers/api";
import { connect } from "react-redux";
import CardDropdown from "../../../CardDropdown";

// Fusion Charts
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme, CandyTheme);

const getRandomTimer = max => {
	return Math.floor(Math.random() * Math.floor(max)) * 100;
};

class CPUutilization extends Component {
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
		let cpu_data = sessionStorage.getItem(
			`cpu_utilization_${this.props.el.params.node}`
		);
		cpu_data = JSON.parse(cpu_data);

		if (cpu_data) {
			if (cpu_data.chart_id === this.props.el.i) {
				this.getData(
					"cpu_util",
					null,
					null,
					this.props.el.params.node ? this.props.el.params.node : null
				);
				sessionStorage.setItem(
					`cpu_utilization_${this.props.el.params.node}`,
					JSON.stringify({
						data: this.state.data,
						chart_id: this.props.el.i
					})
				);
			} else {
				if (JSON.stringify(cpu_data.data) === JSON.stringify(this.state.data)) {
					this.setState({ resetCounter: this.state.resetCounter + 1 }, () => {
						this.state.resetCounter > 4 &&
							sessionStorage.removeItem(
								`cpu_utilization_${this.props.el.params.node}`
							);
						if (
							sessionStorage.getItem(
								`cpu_utilization_${this.props.el.params.node}`
							) === null
						) {
							this.setState({ resetCounter: 0 });
						}
					});
				}
				this.setState({ data: cpu_data.data });
			}
		} else {
			this.getData(
				"cpu_util",
				null,
				null,
				this.props.el.params.node ? this.props.el.params.node : null
			);
			this.state.data &&
				sessionStorage.setItem(
					`cpu_utilization_${this.props.el.params.node}`,
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
		}, 5000 + getRandomTimer(5));
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
		const dataSource = {
			chart: {
				lowerlimit: "0",
				upperlimit: "100",
				showvalue: "1",
				numbersuffix: "%",
				theme: this.state.theme,
				bgColor: this.state.bgColor,
				showtooltip: "0"
			},
			colorrange: {
				color: [
					{
						minvalue: "0",
						maxvalue: "75",
						code: "#52c48b"
					},
					{
						minvalue: "75",
						maxvalue: "90",
						code: "#edd35c"
					},
					{
						minvalue: "90",
						maxvalue: "100",
						code: "#eb4034"
					}
				]
			},
			dials: {
				dial: [
					{
						value: this.state.data ? this.state.data.cpu.total : 0
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
						<ReactFC
							type="angulargauge"
							width="100%"
							height="100%"
							dataFormat="JSON"
							renderAt="chartContainer"
							dataSource={dataSource}
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
)(CPUutilization);
