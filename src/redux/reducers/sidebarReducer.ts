import { TOGGLE_SIDEBAR } from "../constants/actionTypes";
import { SidebarActions } from "../actions/sidebarActions";

const initialState = false;

export const sidebarReducer = (
	state = initialState,
	action: SidebarActions
): boolean => {
	switch (action.type) {
		case TOGGLE_SIDEBAR:
			return !state;

		default:
			return state;
	}
};
