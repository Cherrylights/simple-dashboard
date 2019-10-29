import React from "react";
import { Card, List } from "antd";
import Loader from "react-loaders";
import { getData } from "../../../../helpers/api";
import { connect } from "react-redux";
import CardDropdown from "../../../CardDropdown";

import { showModal } from "../../../../redux/actions/modalActions";

import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";

charts(fusioncharts);

class InstitutionInfo extends React.Component {
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
		this.getData(
			"inst_list",
			null,
			null,
			this.props.el.params.node ? this.props.el.params.node : null
		);
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
						{this.props.el.params.size === "full" && (
							<div>
								<List
									grid={{
										gutter: 5,
										xs: 1,
										sm: 2,
										md: 2,
										lg: 2,
										xl: 2,
										xxl: 2
									}}
								>
									{Object.keys(this.state.data.institutions).map((key, i) => (
										<List.Item key={i}>
											<Card
												className={
													key !== "MONERIS"
														? "modules-card"
														: "modules-card-inactive"
												}
												title={key}
												onClick={() =>
													key !== "MONERIS"
														? this.props.showModal("InstitutionInfoModal", {
																module: key
														  })
														: {}
												}
											>
												<div style={{ fontSize: "0.8rem" }}>
													ID: {this.state.data.institutions[key].ID}
													<br />
													State:{this.state.data.institutions[key].state}
													<br />
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
)(InstitutionInfo);
