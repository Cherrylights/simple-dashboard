import React from "react";
import { Card, List } from "antd";
import Loader from "react-loaders";
import { getData } from "../../../../helpers/api";
import { connect } from "react-redux";
import CardDropdown from "../../../CardDropdown";

import { showModal } from "../../../../redux/actions/modalActions";

import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import { Descriptions, Badge } from "antd";
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
	}

	componentDidMount() {
		this.getData("core_status");
	}

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

	render() {
		return (
			<Card
				className="grid-card"
				title={<span>{`Chart : ${this.props.el.params.cardName}`}</span>}
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
								<br />
								<List
									grid={{
										gutter: 5,
										xs: 1,
										sm: 2,
										md: 4,
										lg: 4,
										xl: 4,
										xxl: 4
									}}
								>
									{Object.keys(this.state.data.modules).map((key, i) => (
										<List.Item key={i}>
											<Card
												className={
													this.state.data.modules[key].status === "RUNNING"
														? "modules-card"
														: "modules-card-inactive"
												}
												title={key}
											>
												{this.state.data.modules[key].status === "RUNNING" ? (
													<Badge
														status="default"
														text="Running"
														color="#11bf85"
													/>
												) : this.state.data.modules[key].status ===
												  "STOPPED" ? (
													<Badge
														status="default"
														text="Stopped"
														color="#4aa4ed"
													/>
												) : this.state.data.modules[key].status === "DEAD" ? (
													<Badge status="default" text="Dead" color="#d65729" />
												) : (
													<Badge
														status="default"
														text="Unknown"
														color="#c0c7cc"
													/>
												)}
												<br />
												<div style={{ fontSize: "0.7rem" }}>
													Type: {this.state.data.modules[key].type}
													<br />
													Restarts: {this.state.data.modules[key].restarts}
												</div>
											</Card>
										</List.Item>
									))}
								</List>
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
