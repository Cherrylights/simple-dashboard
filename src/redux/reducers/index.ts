import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { dashboardReducer } from "./dashboardReducer";
import { sidebarReducer } from "./sidebarReducer";
import { themeReducer } from "./themeReducer";
import { modeReducer } from "./modeReducer";
import { tabReducer } from "./tabReducer";

const rootReducer = combineReducers({
	tabReducer,
	dashboardReducer,
	modalReducer,
	sidebarReducer,
	themeReducer,
	modeReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
