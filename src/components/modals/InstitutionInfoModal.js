import React, { Component } from "react";

import { Modal, Button } from "antd";
import { connect } from "react-redux";
import { hideModal } from "../../redux/actions/modalActions";
import { getData } from "../../helpers/api";
import Loader from "react-loaders";
import {
	transformDataIntoTable,
	transformInstInfo
} from "../../helpers/functions";

class InstitutionInfoModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
		this.transformDataIntoTable = transformDataIntoTable.bind(this);
		this.transformInstInfo = transformInstInfo.bind(this);
		this.getData = getData.bind(this);
	}

	transformDataIntoObject = res => {
		return {
			Status: res.data.module.info
		};
	};

	dataFetching(module) {
		switch (module) {
			case "AMEX": {
				this.getData("inst_info", { instID: "3000" }, this.transformInstInfo);
				break;
			}

			case "VISA": {
				this.getData("inst_info", { instID: "4000" }, this.transformInstInfo);
				break;
			}

			case "MASTERCARD": {
				this.getData("inst_info", { instID: "5000" }, this.transformInstInfo);
				break;
			}

			case "DISCOVER": {
				this.getData("inst_info", { instID: "8000" }, this.transformInstInfo);
				break;
			}

			case "JCB": {
				this.getData("inst_info", { instID: "10000" }, this.transformInstInfo);
				break;
			}

			default: {
				return;
			}
		}
	}

	dataRendering = module => {
		const { data } = this.state;

		return (
			<>
				<table className="inst-info">
					<tbody>
						<tr>
							<td>
								<b>Settlement Date</b>
							</td>
							<td>{data[1]}</td>
						</tr>
						<tr>
							<td>
								<b>Online keys</b>
							</td>
							<td>{data[2]}</td>
						</tr>
						<tr>
							<td>
								<b>Messages count</b>
							</td>
						</tr>

						{data[3].map(val => (
							<tr>
								{val.split("|").map(val => (
									<td width="20%">{val}</td>
								))}
							</tr>
						))}
						<tr>
							<td>
								<b>Responses count</b>
							</td>
						</tr>
						{data[4].map(val => (
							<tr>
								{val.split("|").map(val => (
									<td width="20%">{val}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
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
					width={"50%"}
					title="Institution Info"
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
)(InstitutionInfoModal);
