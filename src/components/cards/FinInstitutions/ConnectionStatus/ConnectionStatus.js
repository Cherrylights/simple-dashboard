import React, { Component } from "react";
import { Card } from "antd";
import Loader from "react-loaders";
import { getData } from "../../../../helpers/api";
import { connect } from "react-redux";
import CardDropdown from "../../../CardDropdown";
import { Badge, Tooltip, List, Row, Col } from "antd";
import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import { transformDataIntoTable } from "../../../../helpers/functions";

charts(fusioncharts);

class ConnectionStatus extends Component {
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
		this.transformDataIntoTable = transformDataIntoTable.bind(this);
		this.getData = getData.bind(this);
	}

	componentDidMount() {
		this.getData(
			"module_info",
			{ module: "core_tcpip" },
			this.transformDataIntoTable
		);
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
		const fin_inst = this.props.el.params.fin_inst;
		const dataSource = this.state.data ? this.state.data.dataSource : [];
		const data = dataSource.filter(entry => entry.interface === fin_inst);
		return (
			<Card
				className="grid-card"
				title={
					<>
						{fin_inst === "core_visa" ? (
							<i class="pf pf-visa phx-icon"></i>
						) : fin_inst === "core_mc" ? (
							<i class="pf pf-mastercard-alt phx-icon"></i>
						) : fin_inst === "core_amex" ? (
							<i class="pf pf-american-express phx-icon"></i>
						) : fin_inst === "core_discover" ? (
							<i class="pf pf-discover phx-icon"></i>
						) : fin_inst === "core_jcb" ? (
							<i class="pf pf-jcb phx-icon"></i>
						) : fin_inst === "core_interac" ? (
							<i class="pf pf-interac phx-icon"></i>
						) : (
							<i class="pf pf-credit-card phx-icon"></i>
						)}

						<span>{`  PHX CANADA : ${this.props.el.params.cardName}`}</span>
					</>
				}
				extra={<CardDropdown el={this.props.el} />}
			>
				{this.state.data ? (
					<div className="chart-container connection-status-table">
						<Row gutter={16}>
							<Col span={12}>
								<List
									size="small"
									bordered
									dataSource={data}
									renderItem={conn => (
										<List.Item>
											{" "}
											<Tooltip title={conn.status}>
												<Badge
													style={{ fontSize: "0.5rem" }}
													color={
														conn.status === "DISABLED"
															? "#72B5CD"
															: conn.status === "DISCONNECTED"
															? "#D65729"
															: conn.status === "CONNECTED"
															? "#11BF85"
															: "#ECECEC"
													}
													text={
														conn["line-name"] + " " + conn["ip-address/port"]
													}
												/>
											</Tooltip>
										</List.Item>
									)}
								/>
							</Col>
							<Col span={12}>
								<List
									size="small"
									bordered
									dataSource={data}
									renderItem={conn => (
										<List.Item>
											{" "}
											<Tooltip title={conn.status}>
												<Badge
													color={
														conn.status === "DISABLED"
															? "#72B5CD"
															: conn.status === "DISCONNECTED"
															? "#D65729"
															: conn.status === "CONNECTED"
															? "#11BF85"
															: "#ECECEC"
													}
													text={
														conn["line-name"] + " " + conn["ip-address/port"]
													}
												/>
											</Tooltip>
										</List.Item>
									)}
								/>
							</Col>
						</Row>
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
)(ConnectionStatus);
