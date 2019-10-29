// React
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// Stylesheet
import "normalize.css/normalize.css";
import "antd/dist/antd.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/paymentfont.min.css";
import "loaders.css/src/animations/ball-scale-multiple.scss";
import "./assets/styles/index.less";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store/store";

// Components
import App from "./App";
// Service Worker
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
