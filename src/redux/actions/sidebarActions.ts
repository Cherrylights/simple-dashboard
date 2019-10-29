import { TOGGLE_SIDEBAR } from "../constants/actionTypes";

interface ToggleSidebarAction {
	type: typeof TOGGLE_SIDEBAR;
}

export type SidebarActions = ToggleSidebarAction;

export const toggleSidebar = (): ToggleSidebarAction => {
	return {
		type: TOGGLE_SIDEBAR
	};
};
