import React from "react";
import { connect } from "react-redux";
import CardModal from "./CardModal";
import CreateDashboardModal from "./CreateDashboardModal";
import LoadDashboardModal from "./LoadDashboardModal";
import SettingsModal from "./SettingsModal";
import SummaryActionModal from "./SummaryActionModal";
import CardSettingsModal from "./CardSettingsModal";
import CannotAddCardModal from "./CannotAddCardModal";
import CoreModuleInfoModal from "./CoreModuleInfoModal";
import InstitutionInfoModal from "./InstitutionInfoModal";

const modalLookup = {
	CardModal,
	CreateDashboardModal,
	LoadDashboardModal,
	SettingsModal,
	SummaryActionModal,
	CardSettingsModal,
	CannotAddCardModal,
	CoreModuleInfoModal,
	InstitutionInfoModal
};

const ModalManager = ({ currentModal }) => {
	let renderedModal;

	if (currentModal.modalType) {
		const { modalType, modalProps } = currentModal;
		const ModalComponent = modalLookup[modalType];
		renderedModal = <ModalComponent {...modalProps} />;
	}
	return <div id="modal-manager">{renderedModal}</div>;
};

const mapStateToProps = state => ({
	currentModal: state.modalReducer
});

export default connect(
	mapStateToProps,
	null
)(ModalManager);
