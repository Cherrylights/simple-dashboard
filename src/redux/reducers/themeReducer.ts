import { TOGGLE_THEME, SYNC_THEME } from "../constants/actionTypes";
import { ThemeActionTypes } from "../actions/themeActions";

const initialState = { darkTheme: false };

export const themeReducer = (
	state = initialState,
	action: ThemeActionTypes
): { darkTheme: boolean } => {
	switch (action.type) {
		case TOGGLE_THEME:
			return { ...state, darkTheme: action.payload };

		case SYNC_THEME:
			return { ...state, darkTheme: action.payload };

		default:
			return state;
	}
};
