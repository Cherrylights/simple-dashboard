import React, { Component } from "react";

import { Tabs, Modal, Button, Col, Row } from "antd";

import {
	FaMoneyCheckAlt,
	FaServer,
	FaInfoCircle,
	FaDatabase
} from "react-icons/fa";

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

const { TabPane } = Tabs;

class CardModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category: "",
			fin_inst: "core_visa",
			cardType: "",
			node: "TORONTO",
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
			node: "TORONTO",
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

				case "core_modules_status": {
					this.props.addCard(
						{
							chartType: "core_modules_status",
							i: makeid(10),
							x: (this.cards.length * 2) % (this.state.cols || 12),
							y: Infinity, // puts it at the bottom
							w: 4,
							h: 12,
							minW: 4,
							maxW: 8,
							minH: 4,
							maxH: 12,
							params: {
								fin_inst: this.state.fin_inst,
								node: this.state.node,
								cardName: "Core Modules Status",
								size: "full",
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
			switch (this.state.cardName) {
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

				default:
					return;
			}
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
						<br />
						<h1>Tab 1</h1>
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
								<h3>Select Location</h3>
								<SelectWithSearch
									defaultActiveFirstOption
									defaultValue="TORONTO"
									handleSelectChange={this.handleSelectChange}
									activeKey={this.state.activeKey}
									data={[
										this.state.cardName !== "inst_info" && {
											name: "node",
											value: "TORONTO",
											text: "TORONTO"
										},
										{
											name: "node",
											value: "VANCOUVER",
											text: "VANCOUVER"
										},
										{
											name: "node",
											value: "BOSTON",
											text: "BOSTON"
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
						<br />
						<h1>Tab 2</h1>
						<Row gutter={16}>
							<Col className="gutter-row" span={8}>
								<h3>Select Location</h3>
								<SelectWithSearch
									defaultActiveFirstOption
									defaultValue="TORONTO"
									handleSelectChange={this.handleSelectChange}
									activeKey={this.state.activeKey}
									data={[
										{
											name: "node",
											value: "TORONTO",
											text: "TORONTO"
										},
										{
											name: "node",
											value: "VANCOUVER",
											text: "VANCOUVER"
										},
										{
											name: "node",
											value: "BOSTON",
											text: "BOSTON"
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
								<FaInfoCircle />
							</span>
						}
						key="3"
					>
						<br />
						<h1>Tab 3</h1>
						<Row gutter={16}>
							<Col className="gutter-row" span={8}>
								<h3>Select Location</h3>
								<SelectWithSearch
									defaultActiveFirstOption
									defaultValue="TORONTO"
									handleSelectChange={this.handleSelectChange}
									activeKey={this.state.activeKey}
									data={[
										{
											name: "node",
											value: "TORONTO",
											text: "TORONTO"
										},
										{
											name: "node",
											value: "VANCOUVER",
											text: "VANCOUVER"
										},
										{
											name: "node",
											value: "BOSTON",
											text: "BOSTON"
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
								<FaDatabase />
							</span>
						}
						key="4"
					>
						<br />
						<h1>Tab 4</h1>
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
