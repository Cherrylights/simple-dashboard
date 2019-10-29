import {
	ADD_TAB,
	REM_TAB,
	SET_PRISTINE,
	FETCH_TABS,
	FETCH_ACTIVE_KEY,
	SET_ACTIVE_KEY
} from "../constants/actionTypes";

import { Tab, TabActionTypes } from "../actions/tabActions";

interface StateType {
	tabs: Tab[];
	currentScreenIsPristine: boolean;
	activeKey: string;
}

const initialState: StateType = {
	tabs: [],
	currentScreenIsPristine: true,
	activeKey: "key"
};

export const tabReducer = (
	state: StateType = initialState,
	action: TabActionTypes
): StateType => {
	switch (action.type) {
		case FETCH_TABS: {
			return { ...state, tabs: action.payload };
		}

		case ADD_TAB: {
			// Test if the tab is already in the tab pane, if so don't add it, if not, add it
			const currentTabs = state.tabs;
			if (currentTabs.some(tab => tab.key === action.payload.key)) {
				return { ...state };
			} else {
				const updatedTabs = [...state.tabs, action.payload];
				return { ...state, tabs: updatedTabs };
			}
		}

		case REM_TAB: {
			const updatedTabs = state.tabs.filter(tab => tab.key !== action.payload);
			return {
				...state,
				tabs: updatedTabs
			};
		}

		case SET_PRISTINE:
			return { ...state, currentScreenIsPristine: action.payload };

		case FETCH_ACTIVE_KEY:
			return { ...state, activeKey: action.payload };

		case SET_ACTIVE_KEY:
			return { ...state, activeKey: action.payload };

		default:
			return state;
	}
};
