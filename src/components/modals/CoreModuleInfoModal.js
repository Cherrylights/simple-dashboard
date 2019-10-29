import React, { Component } from "react";

import { Modal, Button, Descriptions, Table } from "antd";
import { connect } from "react-redux";
import { hideModal } from "../../redux/actions/modalActions";
import { getData } from "../../helpers/api";
import Loader from "react-loaders";
import {
	transformDataIntoTable,
	transformDataIntoDescriptions
} from "../../helpers/functions";

class CoreModuleInfoModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
		this.transformDataIntoTable = transformDataIntoTable.bind(this);
		this.transformDataIntoDescriptions = transformDataIntoDescriptions.bind(
			this
		);
		this.getData = getData.bind(this);
	}

	transformDataIntoObject = res => {
		return {
			Status: res.data.module.info
		};
	};

	dataFetching(module) {
		switch (module) {
			case "core_batch": {
				this.getData(
					"module_info",
					{ module: "core_batch" },
					this.transformDataIntoObject
				);
				break;
			}

			case "core_amex": {
				this.getData(
					"module_info",
					{ module: "core_amex" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			case "core_mc": {
				this.getData(
					"module_info",
					{ module: "core_mc" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			case "core_visa": {
				this.getData(
					"module_info",
					{ module: "core_visa" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			case "core_visadirect": {
				this.getData(
					"module_info",
					{ module: "core_visadirect" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			case "core_discover": {
				this.getData(
					"module_info",
					{ module: "core_discover" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			case "core_saf": {
				this.getData(
					"module_info",
					{ module: "core_saf" },
					this.transformDataIntoTable
				);
				break;
			}

			case "core_fraud": {
				this.getData(
					"module_info",
					{ module: "core_fraud" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			case "core_security": {
				this.getData(
					"module_info",
					{ module: "core_security" },
					this.transformDataIntoTable
				);
				break;
			}

			case "core_httpapi": {
				this.getData(
					"module_info",
					{ module: "core_httpapi" },
					this.transformDataIntoTable
				);
				break;
			}

			case "core_spdh": {
				this.getData(
					"module_info",
					{ module: "core_spdh" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			case "core_tcpip": {
				this.getData(
					"module_info",
					{ module: "core_tcpip" },
					this.transformDataIntoTable
				);
				break;
			}

			case "core_monitor": {
				this.getData(
					"module_info",
					{ module: "core_monitor" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			case "core_mqm": {
				this.getData(
					"module_info",
					{ module: "core_mqm" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			case "core_kafka": {
				this.getData(
					"module_info",
					{ module: "core_kafka" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			case "core_rbc_dms": {
				this.getData(
					"module_info",
					{ module: "core_rbc_dms" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			case "core_stats": {
				this.getData(
					"module_info",
					{ module: "core_stats" },
					this.transformDataIntoDescriptions
				);
				break;
			}

			default: {
				return;
			}
		}
	}

	dataRendering = module => {
		const { data } = this.state;
		if (
			module === "core_tcpip" ||
			module === "core_saf" ||
			module === "core_security" ||
			module === "core_httpapi"
		) {
			return (
				<>
					<Descriptions
						bordered
						column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
					>
						{data.techData.map(val => (
							<Descriptions.Item label={val[0]} key={val[0]}>
								{val[1]}
							</Descriptions.Item>
						))}
					</Descriptions>
					<br />
					<Table bordered columns={data.columns} dataSource={data.dataSource} />
				</>
			);
		} else {
			return (
				<Descriptions
					bordered
					column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
				>
					{Object.keys(data).map(key => (
						<Descriptions.Item label={key.replace(/-/g, " ")} key={key}>
							{data[key]}
						</Descriptions.Item>
					))}
				</Descriptions>
			);
		}
	};

	componentDidMount() {
		const { module } = this.props;
		this.dataFetching(module);
	}

	render() {
		const { module } = this.props;
		return (
			<div>
				<Modal
					centered={true}
					width={"70%"}
					title="Core module details"
					visible={this.props.isModalShow}
					onOk={this.props.hideModal}
					onCancel={this.props.hideModal}
					footer={[
						<Button key="submit" type="primary" onClick={this.props.hideModal}>
							Close
						</Button>
					]}
				>
					{this.state.data ? (
						this.dataRendering(module)
					) : (
						<Loader className="loader-bubble" type="ball-scale-multiple" />
					)}
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isModalShow: state.modalReducer.isModalShow
	};
};

export default connect(
	mapStateToProps,
	{ hideModal }
)(CoreModuleInfoModal);
