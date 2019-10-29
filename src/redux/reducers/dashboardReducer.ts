import {
	FETCH_DASHBOARDS,
	CREATE_DASHBOARD,
	REM_DASHBOARD,
	ADD_CARD,
	REM_CARD,
	UPDATE_LAYOUT,
	UPDATE_CARD_SETTINGS
} from "../constants/actionTypes";

import { DashboardActionTypes } from "../actions/dashboardActions";

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

interface StateType {
	dashboards: Dashboard[];
}

const initialState: StateType = {
	dashboards: []
};

export const dashboardReducer = (
	state: StateType = initialState,
	action: DashboardActionTypes
): StateType => {
	switch (action.type) {
		case FETCH_DASHBOARDS:
			return {
				...state,
				dashboards: [...action.payload]
			};

		case CREATE_DASHBOARD: {
			return {
				...state,
				dashboards: [...state.dashboards, action.payload]
			};
		}

		case REM_DASHBOARD: {
			const updatedDashboards = state.dashboards.filter(
				dashboard => dashboard.id !== action.payload
			);
			return {
				...state,
				dashboards: updatedDashboards
			};
		}

		case ADD_CARD: {
			// Remember, the return value must be pure! Otherwise the prevProps won't work properly in componentDidUpdate
			const currentDashboards = state.dashboards;
			const currentDashboardId = action.payload.dashboardId;
			const newDashboards = currentDashboards.map(dashboard => {
				if (dashboard.id === currentDashboardId) {
					const newDashboard = {
						...dashboard,
						data: [...dashboard.data, action.payload.card]
					};
					return newDashboard;
				} else {
					return dashboard;
				}
			});
			return {
				...state,
				dashboards: newDashboards
			};
		}

		case REM_CARD: {
			const currentDashboards = state.dashboards;
			const currentDashboardId = action.payload.dashboardId;
			const currentDashboard = currentDashboards.filter(
				dashboard => dashboard.id === currentDashboardId
			)[0];
			const currentCards = currentDashboard.data;
			if (currentCards) {
				const updatedCards = currentCards.filter(
					card => card.i !== action.payload.cardId
				);
				const updatedDashboard = { ...currentDashboard, data: updatedCards };
				const updatedDashboards = currentDashboards.map(dashboard => {
					if (dashboard.id === currentDashboardId) {
						return updatedDashboard;
					} else {
						return dashboard;
					}
				});
				return {
					...state,
					dashboards: updatedDashboards
				};
			} else {
				return { ...state };
			}
		}

		case UPDATE_LAYOUT: {
			const currentDashboards = state.dashboards;
			const currentDashboardId = action.payload.dashboardId;
			const currentDashboard = currentDashboards.filter(
				dashboard => dashboard.id === currentDashboardId
			)[0];
			const currentCards = currentDashboard.data;
			if (currentCards) {
				const updatedCards = action.payload.layout.map(layout => {
					const currentCard = currentCards.filter(
						card => card.i === layout.i
					)[0];
					const updatedCard = {
						...currentCard,
						w: layout.w,
						h: layout.h,
						x: layout.x,
						y: layout.y
					};
					return updatedCard;
				});
				const updatedDashboard = { ...currentDashboard, data: updatedCards };
				const updatedDashboards = currentDashboards.map(dashboard => {
					if (dashboard.id === currentDashboardId) {
						return updatedDashboard;
					} else {
						return dashboard;
					}
				});
				return {
					...state,
					dashboards: updatedDashboards
				};
			} else {
				return { ...state };
			}
		}

		case UPDATE_CARD_SETTINGS: {
			const currentDashboards = state.dashboards;
			const currentDashboardId = action.payload.dashboardId;
			const currentDashboard = currentDashboards.filter(
				dashboard => dashboard.id === currentDashboardId
			)[0];
			const currentCards = currentDashboard.data;
			let updatedHeight;
			if (currentCards) {
				const card = action.payload.card;
				switch (action.payload.size) {
					case "minimum":
						updatedHeight = card.params.height.minimum;
						break;
					case "normal":
						updatedHeight = card.params.height.normal;
						break;
					case "full":
						updatedHeight = card.params.height.full;
						break;
					default:
						updatedHeight = card.params.height.normal;
				}
				const updatedCard = {
					...card,
					y: card.y,
					h: updatedHeight,
					minH: updatedHeight,
					maxH: updatedHeight,
					params: { ...card.params, size: action.payload.size }
				};
				const updatedCards = [...currentCards, updatedCard];
				const updatedDashboard = { ...currentDashboard, data: updatedCards };
				const updatedDashboards = currentDashboards.map(dashboard => {
					if (dashboard.id === currentDashboardId) {
						return updatedDashboard;
					} else {
						return dashboard;
					}
				});
				return {
					...state,
					dashboards: updatedDashboards
				};
			} else {
				return { ...state };
			}
		}

		// case UPDATE_DASHBOARD: {
		// 	const currentDashboards = state.dashboards;
		// 	if (currentDashboards.length > 0) {
		// 		const dashboardIndex = currentDashboards.findIndex(
		// 			dashboard => dashboard.id === action.payload.id
		// 		);
		// 		currentDashboards[dashboardIndex].data = action.payload.data;
		// 		return {
		// 			...state,
		// 			dashboards: [...currentDashboards]
		// 		};
		// 	}
		// 	return {
		// 		...state
		// 	};
		// }

		// case UPDATE_CARD_SIZE: {
		// 	const currentCards = state.cards;
		// 	if (currentCards) {
		// 		const updatedCardIndex = currentCards.findIndex(
		// 			card => card.i === action.payload.cardId
		// 		);
		// 		currentCards[updatedCardIndex].params.size = action.payload.size;
		// 	}
		// 	return {
		// 		...state,
		// 		cards: [...currentCards]
		// 	};
		// }

		default:
			return state;
	}
};
