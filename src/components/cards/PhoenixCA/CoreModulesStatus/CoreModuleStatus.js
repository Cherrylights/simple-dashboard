import React from "react";
import { Card, List } from "antd";
import Loader from "react-loaders";
import { getData } from "../../../../helpers/api";
import { connect } from "react-redux";
import CardDropdown from "../../../CardDropdown";

import { showModal } from "../../../../redux/actions/modalActions";

import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import { Descriptions, Badge, Col, Row } from "antd";

charts(fusioncharts);

class CoreModulesStatus extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: undefined,
			chart: {
				xAxisName: "Day",
				yAxisName: "Volume",
				theme: this.props.isDarkTheme ? "candy" : "fusion",
				bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff"
			}
		};
		this.getData = getData.bind(this);
		this.timerId = 0;
		this.getData(
			"core_status",
			null,
			null,
			this.props.el.params.node ? this.props.el.params.node : null
		);
		this.timerId = setInterval(() => {
			this.getData(
				"core_status",
				null,
				null,
				this.props.el.params.node ? this.props.el.params.node : null
			);
		}, 30000);
	}

	componentDidMount() {}

	componentDidUpdate(prevProps) {
		if (this.props.isDarkTheme !== prevProps.isDarkTheme) {
			this.setState(prevState => ({
				chart: {
					...prevState.chart,
					theme: this.props.isDarkTheme ? "candy" : "fusion",
					bgColor: this.props.isDarkTheme ? "#202a3b" : "#ffffff"
				}
			}));
		}
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	render() {
		return (
			<Card
				className="grid-card"
				title={
					<span>{`PHX CANADA: ${this.props.el.params.cardName} - ${this.props.el.params.node}`}</span>
				}
				extra={<CardDropdown el={this.props.el} />}
			>
				{this.state.data ? (
					<div>
						{this.props.el.params.size === "minimum" && (
							<div>
								{this.state.data ? (
									<Badge status="default" text="Running" color="#11bf85" />
								) : (
									<Badge status="default" text="Stopped" />
								)}
							</div>
						)}
						{this.props.el.params.size === "normal" && (
							<Descriptions layout="vertical" bordered size="small">
								<Descriptions.Item label="Core Switch">
									{this.state.data ? (
										<Badge status="default" text="Running" color="#11bf85" />
									) : (
										<Badge status="default" text="Stopped" />
									)}
								</Descriptions.Item>
								<Descriptions.Item label="Start time">
									{this.state.data.core_switch.start_time}
								</Descriptions.Item>
							</Descriptions>
						)}
						{this.props.el.params.size === "full" && (
							<div>
								<Descriptions layout="vertical" bordered size="small">
									<Descriptions.Item label="Core Switch">
										{this.state.data ? (
											<Badge status="default" text="Running" color="#11bf85" />
										) : (
											<Badge status="default" text="Stopped" />
										)}
									</Descriptions.Item>
									<Descriptions.Item label="Start time">
										{this.state.data.core_switch.start_time}
									</Descriptions.Item>
								</Descriptions>
								<Row style={{ marginTop: 5, marginBottom: 5 }}>
									<Col span={24}>
										<div style={{ textAlign: "center" }}>
											<Badge
												text="Dead"
												color="#d65729"
												style={{ marginRight: 15 }}
											/>
											<Badge
												text="Up and Running"
												status="default"
												className="badge-runnnig"
												style={{ marginRight: 15 }}
											/>
											<Badge
												text="Stopped"
												color="#72b5cd"
												style={{ marginRight: 15 }}
											/>
										</div>
									</Col>
								</Row>

								<div style={{ display: "inline-block" }}>
									<List
										grid={{
											gutter: 5,
											xs: 1,
											sm: 2,
											md: 3,
											lg: 3,
											xl: 3,
											xxl: 3
										}}
									>
										{Object.keys(this.state.data.modules).map((key, i) => (
											<List.Item key={i}>
												<Card
													className={
														this.state.data.modules[key].status === "RUNNING"
															? "modules-card"
															: this.state.data.modules[key].status === "DEAD"
															? "modules-card-inactive alert-flashing-card"
															: this.state.data.modules[key].status ===
															  "STOPPED"
															? "modules-card-inactive stopped-card"
															: "modules-card-inactive"
													}
													title={key}
													onClick={() =>
														this.state.data.modules[key].status === "RUNNING" &&
														this.props.showModal("CoreModuleInfoModal", {
															module: key
														})
													}
												>
													<div style={{ fontSize: "0.8rem" }}>
														{/* Type: {this.state.data.modules[key].type}
											<br /> */}
														Restarts: {this.state.data.modules[key].restarts}
													</div>
												</Card>
											</List.Item>
										))}
									</List>
								</div>
								<br />
								<div style={{ display: "block" }}>
									<List
										grid={{
											gutter: 5,
											xs: 1,
											sm: 2,
											md: 3,
											lg: 3,
											xl: 3,
											xxl: 3
										}}
									>
										{Object.keys(this.state.data.standalone).map((key, i) => (
											<List.Item key={i}>
												<Card
													className={
														this.state.data.standalone[key].status === "RUNNING"
															? "modules-card"
															: this.state.data.standalone[key].status ===
															  "DEAD"
															? "modules-card-inactive alert-flashing-card"
															: this.state.data.standalone[key].status ===
															  "STOPPED"
															? "modules-card-inactive stopped-card"
															: "modules-card-inactive"
													}
													title={key}
													onClick={() =>
														this.state.data.standalone[key].status ===
															"RUNNING" &&
														this.props.showModal("CoreModuleInfoModal", {
															module: key
														})
													}
												>
													<div style={{ fontSize: "0.8rem" }}>
														{/* Type: {this.state.data.modules[key].type}
													<br /> */}
														Restarts: {this.state.data.standalone[key].restarts}
													</div>
												</Card>
											</List.Item>
										))}
									</List>
								</div>
							</div>
						)}
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
	{ showModal }
)(CoreModulesStatus);
