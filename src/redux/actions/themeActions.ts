import { TOGGLE_THEME, SYNC_THEME } from "../constants/actionTypes";

interface SyncThemeAction {
	type: typeof SYNC_THEME;
	payload: boolean;
}

interface ToggleThemeAction {
	type: typeof TOGGLE_THEME;
	payload: boolean;
}

export type ThemeActionTypes = SyncThemeAction | ToggleThemeAction;

export const syncTheme = (): SyncThemeAction => {
	let isDarkTheme = loadThemeFromServer();
	return {
		type: SYNC_THEME,
		payload: isDarkTheme
	};
};

export const toggleTheme = (theme: boolean): ToggleThemeAction => {
	return {
		type: TOGGLE_THEME,
		payload: theme
	};
};

const loadThemeFromServer = (): boolean => {
	let isDarkTheme = JSON.parse(localStorage.getItem("darkTheme") || "false");
	return isDarkTheme ? isDarkTheme : false;
};
