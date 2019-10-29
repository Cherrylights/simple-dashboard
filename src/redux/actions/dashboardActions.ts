import {
	FETCH_DASHBOARDS,
	CREATE_DASHBOARD,
	REM_DASHBOARD,
	ADD_CARD,
	REM_CARD,
	UPDATE_LAYOUT,
	UPDATE_CARD_SETTINGS
} from "../constants/actionTypes";

interface Card {
	chartType: string;
	i: string;
	x: number;
	y: number;
	w: number;
	h: number;
	minW: number;
	maxW: number;
	minH: number;
	maxH: number;
	params: {
		fin_inst: string;
		node: string;
		cardName: string;
		size: string;
		height: {
			minimum: number;
			normal: number;
			full: number;
		};
	};
}

interface Dashboard {
	id: string;
	name: string;
	comment: string;
	data: Card[];
}

interface Layout {
	w: number;
	h: number;
	x: number;
	y: number;
	i: string;
	minW: number;
	maxW: number;
	minH: number;
	maxH: number;
	moved: boolean;
	static: boolean;
}

export type DashboardActionTypes =
	| FetchDashboardsActions
	| CreateDashboardAction
	| RemoveDashboardAction
	| AddCardAction
	| RemoveCardAction
	| UpdateLayoutAction
	| UpdateCardSettingsAction;

interface FetchDashboardsActions {
	type: typeof FETCH_DASHBOARDS;
	payload: Dashboard[];
}

export const fetchDashboards = (): FetchDashboardsActions => {
	let dashboards = loadDashboardsFromServer();
	return {
		type: FETCH_DASHBOARDS,
		payload: dashboards
	};
};

interface CreateDashboardAction {
	type: typeof CREATE_DASHBOARD;
	payload: Dashboard;
}

export const createDashboard = (
	dashboard: Dashboard
): CreateDashboardAction => {
	return {
		type: CREATE_DASHBOARD,
		payload: dashboard
	};
};

interface RemoveDashboardAction {
	type: typeof REM_DASHBOARD;
	payload: string;
}

export const removeDashboard = (dashboardId: string): RemoveDashboardAction => {
	return {
		type: REM_DASHBOARD,
		payload: dashboardId
	};
};

interface AddCardAction {
	type: typeof ADD_CARD;
	payload: {
		card: Card;
		dashboardId: string;
	};
}

export const addCard = (card: Card, dashboardId: string): AddCardAction => {
	return {
		type: ADD_CARD,
		payload: { card, dashboardId }
	};
};

interface RemoveCardAction {
	type: typeof REM_CARD;
	payload: {
		cardId: string;
		dashboardId: string;
	};
}

export const removeCard = (
	cardId: string,
	dashboardId: string
): RemoveCardAction => {
	return {
		type: REM_CARD,
		payload: { cardId, dashboardId }
	};
};

interface UpdateLayoutAction {
	type: typeof UPDATE_LAYOUT;
	payload: {
		layout: Layout[];
		dashboardId: string;
	};
}

export const updateLayout = (
	layout: Layout[],
	dashboardId: string
): UpdateLayoutAction => {
	return {
		type: UPDATE_LAYOUT,
		payload: { layout, dashboardId }
	};
};

interface UpdateCardSettingsAction {
	type: typeof UPDATE_CARD_SETTINGS;
	payload: {
		card: Card;
		size: string;
		dashboardId: string;
	};
}

export const updateCardSettings = (
	card: Card,
	size: string,
	dashboardId: string
): UpdateCardSettingsAction => {
	return {
		type: UPDATE_CARD_SETTINGS,
		payload: { card, size, dashboardId }
	};
};

// Sync to Server Methods

const loadDashboardsFromServer = () => {
	let dashboardsData = JSON.parse(localStorage.getItem("dashboards") || "[]");
	return dashboardsData;
};

// const saveNewDashboardToServer = dashboard => {
// 	let currentDashboards;
// 	if (localStorage.getItem("dashboards")) {
// 		currentDashboards = JSON.parse(localStorage.getItem("dashboards"));
// 	} else {
// 		currentDashboards = [];
// 	}
// 	currentDashboards.push(dashboard);
// 	localStorage.setItem("dashboards", JSON.stringify(currentDashboards));
// };

// const removeDashboardToServer = dashboardId => {
// 	const currentDashboards = JSON.parse(localStorage.getItem("dashboards"));
// 	const updatedDashboards = currentDashboards.filter(
// 		dashboard => dashboard.id !== dashboardId
// 	);
// 	localStorage.setItem("dashboards", JSON.stringify(updatedDashboards));
// };
