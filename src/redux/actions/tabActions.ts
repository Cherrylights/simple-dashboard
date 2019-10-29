import {
	FETCH_TABS,
	ADD_TAB,
	REM_TAB,
	SET_PRISTINE,
	SET_ACTIVE_KEY,
	FETCH_ACTIVE_KEY
} from "../constants/actionTypes";

export interface Tab {
	title: string;
	key: string;
}

interface FetchTabsAction {
	type: typeof FETCH_TABS;
	payload: Tab[];
}

interface AddTabAction {
	type: typeof ADD_TAB;
	payload: Tab;
}

interface RemoveTabAction {
	type: typeof REM_TAB;
	payload: string;
}

interface SetScreenIsPristineAction {
	type: typeof SET_PRISTINE;
	payload: boolean;
}

interface FetchActiveKeyAction {
	type: typeof FETCH_ACTIVE_KEY;
	payload: string;
}

interface SetActiveKeyAction {
	type: typeof SET_ACTIVE_KEY;
	payload: string;
}

export type TabActionTypes =
	| FetchTabsAction
	| AddTabAction
	| RemoveTabAction
	| SetScreenIsPristineAction
	| FetchActiveKeyAction
	| SetActiveKeyAction;

export const fetchTabs = (): FetchTabsAction => {
	const tabs = loadTabsFromSessionStorage();
	return {
		type: FETCH_TABS,
		payload: tabs
	};
};

export const addTab = (tab: Tab): AddTabAction => {
	saveNewTabToSessionStorage(tab);
	return {
		type: ADD_TAB,
		payload: tab
	};
};

export const removeTab = (tabId: string): RemoveTabAction => {
	removeTabFromSessionStorage(tabId);
	return {
		type: REM_TAB,
		payload: tabId
	};
};

export const setScreenIsPristine = (
	bool: boolean
): SetScreenIsPristineAction => {
	return {
		type: SET_PRISTINE,
		payload: bool
	};
};

export const fetchActiveKey = (): FetchActiveKeyAction => {
	const activeKey = loadActiveKeyFromSessionStorage();
	return {
		type: FETCH_ACTIVE_KEY,
		payload: activeKey
	};
};

export const setActiveKey = (activeKey: string): SetActiveKeyAction => {
	setActiveKeyToSessionStorage(activeKey);
	return {
		type: SET_ACTIVE_KEY,
		payload: activeKey
	};
};

// Sync to Session Storage Methods

const loadTabsFromSessionStorage = () => {
	let tabsData = JSON.parse(sessionStorage.getItem("tabs") || "[]");
	return tabsData;
};

const saveNewTabToSessionStorage = (tab: Tab) => {
	let currentTabs = JSON.parse(sessionStorage.getItem("tabs") || "[]");
	if (currentTabs.some((tabEle: Tab) => tabEle.key === tab.key)) {
		return;
	} else {
		currentTabs.push(tab);
		sessionStorage.setItem("tabs", JSON.stringify(currentTabs));
	}
};

const removeTabFromSessionStorage = (tabId: string) => {
	const currentTabs = JSON.parse(sessionStorage.getItem("tabs") || "[]");
	const updatedTabs = currentTabs.filter((tab: Tab) => tab.key !== tabId);
	sessionStorage.setItem("tabs", JSON.stringify(updatedTabs));
};

const loadActiveKeyFromSessionStorage = () => {
	let activeKey: string;
	if (sessionStorage.getItem("activeKey")) {
		activeKey = sessionStorage.getItem("activeKey") || "key";
	} else {
		activeKey = "key";
	}
	return activeKey;
};

const setActiveKeyToSessionStorage = (activeKey: string) => {
	sessionStorage.setItem("activeKey", activeKey);
};

// const updateDashboardToServer = dashboardObj => {
// 	const currentDashboards = JSON.parse(localStorage.getItem("dashboards"));
// 	const dashboardIndex = currentDashboards.findIndex(
// 		dashboard => dashboard.id === dashboardObj.id
// 	);
// 	currentDashboards[dashboardIndex].data = dashboardObj.data;
// 	localStorage.setItem("dashboards", JSON.stringify(currentDashboards));
// };
