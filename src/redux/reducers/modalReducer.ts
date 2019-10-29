import { SHOW_MODAL, HIDE_MODAL } from "../constants/actionTypes";
import { ModalActionTypes } from "../actions/modalActions";

interface StateType {
	modalType: string;
	modalProps:
		| {
				[k: string]: any;
		  }
		| undefined;
	isModalShow: boolean;
}

const initialState: StateType = {
	modalType: "",
	modalProps: undefined,
	isModalShow: false
};

export const modalReducer = (
	state = initialState,
	action: ModalActionTypes
): StateType => {
	switch (action.type) {
		case SHOW_MODAL:
			const { modalType, modalProps } = action.payload;
			return { modalType, modalProps, isModalShow: true };

		case HIDE_MODAL:
			return { modalType: "", modalProps: undefined, isModalShow: false };

		default:
			return state;
	}
};
