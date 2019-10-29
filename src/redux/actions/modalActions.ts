import { SHOW_MODAL, HIDE_MODAL } from "../constants/actionTypes";

interface ShowModalAction {
	type: typeof SHOW_MODAL;
	payload: {
		modalType: string;
		modalProps?: {
			[k: string]: any;
		};
	};
}

interface HideModalAction {
	type: typeof HIDE_MODAL;
}

export type ModalActionTypes = ShowModalAction | HideModalAction;

export const showModal = (
	modalType: string,
	modalProps?: { [k: string]: any }
): ShowModalAction => {
	return {
		type: SHOW_MODAL,
		payload: { modalType, modalProps }
	};
};

export const hideModal = (): HideModalAction => {
	return {
		type: HIDE_MODAL
	};
};
