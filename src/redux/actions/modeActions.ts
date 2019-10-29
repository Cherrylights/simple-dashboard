import { TOGGLE_MODE } from "../constants/actionTypes";

interface ToggleModeAction {
	type: typeof TOGGLE_MODE;
	payload: boolean;
}

export type ModeActionTypes = ToggleModeAction;

export const toggleMode = (isPresentationMode: boolean): ToggleModeAction => {
	return {
		type: TOGGLE_MODE,
		payload: isPresentationMode
	};
};
