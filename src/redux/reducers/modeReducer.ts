import { TOGGLE_MODE } from "../constants/actionTypes";
import { ModeActionTypes } from "../actions/modeActions";

const initialState = { isPresentationMode: false };

interface StateType {
	isPresentationMode: boolean;
}

export const modeReducer = (
	state = initialState,
	action: ModeActionTypes
): StateType => {
	switch (action.type) {
		case TOGGLE_MODE:
			return { ...state, isPresentationMode: action.payload };

		default:
			return state;
	}
};
