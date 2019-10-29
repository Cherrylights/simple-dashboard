import React, { Component } from "react";

import { Tabs, Modal, Button, Col, Row } from "antd";

import {
	FaMoneyCheckAlt,
	FaServer,
	FaInfoCircle,
	FaDatabase
} from "react-icons/fa";

import CheckboxGroup from "../checkboxs/CheckboxGroup";
import SelectWithSearch from "../selects/SelectWithSearch";
import FinancialInstitutionsRadioGroup from "../radios/FinancialInstitutionsRadioGroup";
import VirtualMachinesRadioGroup from "../radios/VirtualMachinesRadioGroup";
import PhoenixCanadaRadioGroup from "../radios/PhoenixCanadaRadioGroup";
import DatabaseRadioGroup from "../radios/DatabaseRadioGroup";

import { connect } from "react-redux";
import { hideModal } from "../../redux/actions/modalActions";
import { addCard } from "../../redux/actions/dashboardActions";

import {
	handleChange,
	handleSelectChange,
	makeid
} from "../../helpers/functions";
import { PhxLogo } from "../../helpers/PhxLogo";

const { TabPane } = Tabs;

class CardModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category: "",
			fin_inst: "core_visa",
			cardType: "",
			node: "VLAD_DEV",
			vm: "",
			activeKey: "1",
			cardName: "",
			cols: 12
		};
		this.handleChange = handleChange.bind(this);
		this.handleSelectChange = handleSelectChange.bind(this);
		const currentDashboard = this.props.dashboards.filter(
			dashboard => dashboard.id === this.props.dashboardId
		)[0];
		this.cards = currentDashboard ? currentDashboard.data : [];
	}

	toggleTabs = activeKey => {
		this.setState({
			category: "",
			fin_inst: "core_visa",
			cardType: "",
			node: "VLAD_DEV",
			vm: "",
			activeKey: activeKey,
			cardName: "",
			cols: 12
		});
	};

	addCard = () => {
		this.props.hideModal();

		if (this.state.activeKey === "1") {
			switch (this.state.cardName) {
				case "connection_status": {
					this.props.addCard(
						{
							chartType: "connection_status",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Connection Status",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "inst_info": {
					this.props.addCard(
						{
							chartType: "inst_info",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Institution Info",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				default: {
					this.props.addCard(
						{
							chartType: "4",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: this.state.cardName,
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
				}
			}
		} else if (this.state.activeKey === "2") {
			switch (this.state.cardName) {
				case "cpu_utilization": {
					this.props.addCard(
						{
							chartType: "cpu_utilization",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity,
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 2,
							maxH: 12,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "CPU Utilization",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}
				case "iowait": {
					this.props.addCard(
						{
							chartType: "iowait",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity,
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 2,
							maxH: 12,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "I/O wait",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "mem_util": {
					this.props.addCard(
						{
							chartType: "mem_util",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity,
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 2,
							maxH: 12,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Memory Utilization",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "disk_util": {
					this.props.addCard(
						{
							chartType: "disk_util",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity,
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 2,
							maxH: 12,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Disk Utilization",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				default:
					return;
			}
		} else if (this.state.activeKey === "3") {
			switch (this.state.cardName) {
				case "merchant_boarding": {
					this.props.addCard(
						{
							chartType: "merchant_boarding",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Merchant Boarding",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "daily_volumes_last_60days": {
					this.props.addCard(
						{
							chartType: "daily_volumes_last_60days",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Daily Volumes Last 60 Days",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "daily_amount_volumes_last20": {
					this.props.addCard(
						{
							chartType: "daily_amount_volumes_last20",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Daily Amount Volumes Last 20 Days",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "top_merchants_declines": {
					this.props.addCard(
						{
							chartType: "top_merchants_declines",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Top Merchants Declines",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "merchant_active_inactive": {
					this.props.addCard(
						{
							chartType: "merchant_active_inactive",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Merchant Active/Inactive Status",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "avg_tps_last_7_days": {
					this.props.addCard(
						{
							chartType: "avg_tps_last_7_days",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Average TPS Last 7 Days",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "top_tps_last_31_days": {
					this.props.addCard(
						{
							chartType: "top_tps_last_31_days",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Top TPS Last 31 Days",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "issuer_auth_times": {
					this.props.addCard(
						{
							chartType: "issuer_auth_times",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Issuer Auth Times",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "issuer_approval": {
					this.props.addCard(
						{
							chartType: "issuer_approval",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Issuer Approval Ratio",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				case "core_modules_status": {
					this.props.addCard(
						{
							chartType: "core_modules_status",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Core Modules Status",
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 12
								}
							}
						},
						this.props.dashboardId
					);
					break;
				}

				default: {
					this.props.addCard(
						{
							chartType: "4",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 4,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 4,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: this.state.cardName,
								size: "normal",
								height: {
									minimum: 2,
									normal: 4,
									full: 8
								}
							}
						},
						this.props.dashboardId
					);
				}
			}
		} else if (this.state.activeKey === "4") {
			this.props.addCard(
				{
					chartType: "daily-summary",
					i: makeid(10),
					x: (this.cards.length * 2) % (this.state.cols || 12),
					y: Infinity,
					w: 4,
					h: 4,
					minW: 4,
					maxW: 8,
					minH: 4,
					maxH: 4,
					params: {
						fin_inst: this.state.fin_inst,
						node: this.state.node,
						cardName: this.state.cardName,
						size: "normal",
						height: {
							minimum: 2,
							normal: 4,
							full: 8
						}
					}
				},
				this.props.dashboardId
			);
		}
	};

	render() {
		return (
			<Modal
				centered
				title="Add new Widget"
				visible={this.props.isModalShow}
				onCancel={this.props.hideModal}
				footer={[
					<Button
						key="ok"
						type="primary"
						onClick={this.addCard}
						// disabled={this.state.fin_inst === ""}
					>
						Ok
					</Button>,
					<Button key="cancel" type="secondary" onClick={this.props.hideModal}>
						Cancel
					</Button>
				]}
				width="70%"
				bodyStyle={{ minHeight: "500px" }}
			>
				<Tabs
					defaultActiveKey="1"
					onChange={activeKey => {
						this.toggleTabs(activeKey);
					}}
				>
					<TabPane
						tab={
							<span className="nav-link-icon d-block">
								<FaMoneyCheckAlt />
							</span>
						}
						key="1"
					>
						<h1>Financial Institutions</h1>
						<Row gutter={16}>
							{this.state.cardName !== "inst_info" && (
								<Col className="gutter-row" span={8}>
									<h3>Select Financial Vendor</h3>
									<SelectWithSearch
										defaultActiveFirstOption
										defaultValue="core_visa"
										handleSelectChange={this.handleSelectChange}
										activeKey={this.state.activeKey}
										data={[
											{
												name: "fin_inst",
												value: "core_visa",
												text: "VISA"
											},
											{
												name: "fin_inst",
												value: "core_mc",
												text: "MASTERCARD"
											},
											{
												name: "fin_inst",
												value: "core_amex",
												text: "AMEX"
											},
											{
												name: "fin_inst",
												value: "core_discover",
												text: "DISCOVER"
											},
											{
												name: "fin_inst",
												value: "core_jcb",
												text: "JCB"
											},
											{
												name: "fin_inst",
												value: "core_interac",
												text: "INTERAC"
											}
										]}
									/>
								</Col>
							)}
							<Col className="gutter-row" span={8}>
								<h3>Select Node</h3>
								<SelectWithSearch
									defaultActiveFirstOption
									defaultValue="VLAD_DEV"
									handleSelectChange={this.handleSelectChange}
									activeKey={this.state.activeKey}
									data={[
										this.state.cardName !== "inst_info" && {
											name: "node",
											value: "SUMMARY",
											text: "SUMMARY"
										},
										{
											name: "node",
											value: "VLAD_DEV",
											text: "VLAD_DEV"
										},
										{
											name: "node",
											value: "MATT_DEV",
											text: "MATT_DEV"
										}
									]}
								/>
							</Col>
						</Row>
						<br />
						<br />
						<FinancialInstitutionsRadioGroup
							handleChange={this.handleChange}
							activeKey={this.state.activeKey}
						/>
					</TabPane>
					<TabPane
						tab={
							<span className="nav-link-icon d-block">
								<FaServer />
							</span>
						}
						key="2"
					>
						<h1>Virtual Machines</h1>
						<Row gutter={16}>
							<Col className="gutter-row" span={8}>
								<h3>Select Node</h3>
								<SelectWithSearch
									defaultActiveFirstOption
									defaultValue="VLAD_DEV"
									handleSelectChange={this.handleSelectChange}
									activeKey={this.state.activeKey}
									data={[
										{
											name: "node",
											value: "VLAD_DEV",
											text: "VLAD_DEV"
										},
										{
											name: "node",
											value: "MATT_DEV",
											text: "MATT_DEV"
										}
									]}
								/>
							</Col>
						</Row>
						<br />
						<br />
						<VirtualMachinesRadioGroup
							handleChange={this.handleChange}
							activeKey={this.state.activeKey}
						/>
					</TabPane>
					<TabPane
						tab={
							<span className="nav-link-icon d-block">
								<PhxLogo fill="#e6e6e6" />
							</span>
						}
						key="3"
					>
						<h1>Phoenix Canada</h1>
						<Row gutter={16}>
							<Col className="gutter-row" span={8}>
								<h3>Select Node</h3>
								<SelectWithSearch
									defaultActiveFirstOption
									defaultValue="VLAD_DEV"
									handleSelectChange={this.handleSelectChange}
									activeKey={this.state.activeKey}
									data={[
										{
											name: "node",
											value: "VLAD_DEV",
											text: "VLAD_DEV"
										},
										{
											name: "node",
											value: "MATT_DEV",
											text: "MATT_DEV"
										}
									]}
								/>
							</Col>
						</Row>
						<br />
						<PhoenixCanadaRadioGroup
							handleChange={this.handleChange}
							activeKey={this.state.activeKey}
						/>
					</TabPane>
					<TabPane
						tab={
							<span className="nav-link-icon d-block">
								<FaInfoCircle />
							</span>
						}
						key="4"
					>
						<h1>Summary End of the Day</h1>
						<Row>
							<Col span={8}>
								<SelectWithSearch
									handleSelectChange={this.handleSelectChange}
									activeKey={this.state.activeKey}
									placeholder="SELECT SYSTEM"
									data={[
										{
											name: "sum_end_of_day",
											value: "phoenix_ca",
											text: "PHOENIX CANADA"
										},
										{
											name: "sum_end_of_day",
											value: "petrotrack",
											text: "PETROTRACK"
										},
										{
											name: "sum_end_of_day",
											value: "tms",
											text: "TMS"
										}
									]}
								/>
							</Col>
						</Row>
						<br />
						<br />
						<Row>
							<Col span={12}>
								<CheckboxGroup
									handleChange={this.handleChange}
									activeKey={this.state.activeKey}
									data={[
										{ label: "Some setting", value: "Some setting" },
										{
											label: "Monitoring tool enable",
											value: "Monitoring tool enable"
										},
										{
											label: "Show connections status",
											value: "Show connections status"
										},
										{
											label: "Display real-time transactions",
											value: "Display real-time transactions"
										}
									]}
								/>
							</Col>
							<Col span={12}>
								<CheckboxGroup
									handleChange={this.handleChange}
									activeKey={this.state.activeKey}
									data={[
										{ label: "Sale volumes", value: "Sale volumes" },
										{ label: "Some statistics", value: "Some statistics" },
										{ label: "VM status chart", value: "VM status chart" },
										{ label: "One more setting", value: "One more setting" }
									]}
								/>
							</Col>
						</Row>
					</TabPane>
					<TabPane
						tab={
							<span className="nav-link-icon d-block">
								<FaDatabase />
							</span>
						}
						key="5"
					>
						<h1>Database</h1>
						<Row>
							<Col span={8}>
								<SelectWithSearch
									handleSelectChange={this.handleSelectChange}
									activeKey={this.state.activeKey}
									placeholder="Select DB"
									data={[
										{
											name: "fin_inst",
											value: "db-1",
											text: "DB-1 TOR"
										},
										{
											name: "fin_inst",
											value: "db-2",
											text: "BD-2 BR"
										}
									]}
								/>
							</Col>
						</Row>
						<br />
						<br />
						<DatabaseRadioGroup
							handleChange={this.handleChange}
							activeKey={this.state.activeKey}
						/>
					</TabPane>
				</Tabs>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		isModalShow: state.modalReducer.isModalShow,
		dashboards: state.dashboardReducer.dashboards,
		dashboardId: state.tabReducer.activeKey
	};
};

export default connect(
	mapStateToProps,
	{ hideModal, addCard }
)(CardModal);
