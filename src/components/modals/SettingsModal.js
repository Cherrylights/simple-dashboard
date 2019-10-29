import React, { Component, Fragment } from "react";
import { Modal, Button, Row, Col, Switch, message } from "antd";

import { connect } from "react-redux";
import { hideModal } from "../../redux/actions/modalActions";
import { toggleTheme } from "../../redux/actions/themeActions";
import { toggleMode } from "../../redux/actions/modeActions";

import { handleChange } from "../../helpers/functions";
import ColorPicker from "../ColorPicker";

import { defaultLightTheme, defaultDarkTheme } from "../../helpers/themes";

class SettingsModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isdarkTheme: this.props.isDarkTheme,
			vars: {},
			lightTheme: {
				// "@bg-default": "#e9ecf2",
				"@bg-default": "#ececec",
				"@border-color-base": "#cccccc",
				"@btn-primary-bg": "#397dcc",
				"@grid-item-elements": "#ffffff",
				"@header-bg": "#ffffff",
				// "@header-bg": "rgba(255,255,255,0.5)",
				"@heading-color": "#155941",
				"@primary-color": "#00375b",
				"@secondary-color": "#0000ff",
				"@text-color": "#282c34",
				"@text-color-secondary": "#34a37c"
			},
			darkTheme: {
				// "@bg-default": "#2b364e",
				"@bg-default": "#17202e",
				"@border-color-base": "#cfcfcf",
				"@btn-primary-bg": "#429e8b",
				// "@grid-item-elements": "#262A33",
				"@grid-item-elements": "#202a3b",
				"@header-bg": "#1e2430",
				// "@header-bg": "rgba(30,36,48,0.5)",
				"@heading-color": "#e5e5ef",
				"@primary-color": "#43d0ba",
				"@secondary-color": "#4f4ff2",
				"@text-color": "#d2dad9",
				"@text-color-secondary": "#cdd2bf"
			},
			isPresentationMode: this.props.isPresentationMode
		};
		this.handleChange = handleChange.bind(this);
	}

	componentDidMount() {
		let vars = this.state.vars;
		let savedLightTheme = JSON.parse(localStorage.getItem("userLightTheme"));
		let savedDarkTheme = JSON.parse(localStorage.getItem("userDarkTheme"));
		if (this.props.isDarkTheme) {
			if (savedDarkTheme) {
				this.setState({ vars: savedDarkTheme });
			} else {
				this.setState({ vars: defaultDarkTheme });
			}
		} else {
			if (savedLightTheme) {
				this.setState({ vars: savedLightTheme });
			} else {
				this.setState({ vars: defaultLightTheme });
			}
		}

		try {
			let theme = JSON.parse(localStorage.getItem("darkTheme"));

			if (theme) {
				vars = {
					...defaultDarkTheme,
					...JSON.parse(localStorage.getItem("userDarkTheme"))
				};
			} else {
				vars = {
					...defaultLightTheme,
					...JSON.parse(localStorage.getItem("userLightTheme"))
				};
			}
		} finally {
			window.less.modifyVars(vars).catch(error => {
				console.log(error);
			});
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
			}
		});
	};

	normFile = e => {
		console.log("Upload event:", e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};
	onChangeComplete = (varName, color) => {
		const { vars } = this.state;
		vars[varName] = color;
		this.setState({ vars });
	};

	handleColorChange = (varname, color) => {
		const { vars } = this.state;
		if (varname) vars[varname] = color;
		window.less
			.modifyVars(vars)
			.then(() => {
				this.setState({ vars });
				this.state.isdarkTheme
					? localStorage.setItem("userDarkTheme", JSON.stringify(vars))
					: localStorage.setItem("userLightTheme", JSON.stringify(vars));
			})
			.catch(error => {
				message.error(`Failed to update theme`);
			});
	};

	getColorPicker = varName => (
		<Fragment key={varName}>
			<Col xs={20}>{varName}</Col>
			<Col xs={4}>
				<ColorPicker
					type="sketch"
					small
					color={this.state.vars[varName]}
					position="bottom"
					presetColors={[
						"#F5222D",
						"#FA541C",
						"#FA8C16",
						"#FAAD14",
						"#FADB14",
						"#A0D911",
						"#52C41A",
						"#13C2C2",
						"#1890FF",
						"#2F54EB",
						"#722ED1",
						"#EB2F96"
					]}
					onChangeComplete={color => this.handleColorChange(varName, color)}
				/>
			</Col>
		</Fragment>
	);

	resetTheme = () => {
		this.setState(
			prevState => ({
				vars: this.state.isdarkTheme
					? {
							...prevState.vars,
							...defaultDarkTheme
					  }
					: {
							...prevState.vars,
							...defaultLightTheme
					  },
				lightTheme: {
					...prevState.lightTheme,
					...defaultLightTheme
				},
				darkTheme: {
					...prevState.darkTheme,
					...defaultDarkTheme
				}
			}),
			() => {
				localStorage.setItem(
					"userLightTheme",
					JSON.stringify(defaultLightTheme)
				);
				localStorage.setItem("userDarkTheme", JSON.stringify(defaultDarkTheme));
				window.less.modifyVars(this.state.vars).catch(error => {
					message.error(`Failed to reset theme`);
				});
			}
		);
	};

	handleDMSwitch = () => {
		this.props.toggleTheme(this.state.isdarkTheme);
		localStorage.setItem("darkTheme", JSON.stringify(this.state.isdarkTheme));
		let savedLightTheme = JSON.parse(localStorage.getItem("userLightTheme"));
		let savedDarkTheme = JSON.parse(localStorage.getItem("userDarkTheme"));

		this.setState(
			prevState => ({
				vars: this.state.isdarkTheme
					? savedDarkTheme
						? {
								...prevState.vars,
								...savedDarkTheme
						  }
						: {
								...prevState.vars,
								...prevState.darkTheme
						  }
					: savedLightTheme
					? {
							...prevState.vars,
							...savedLightTheme
					  }
					: {
							...prevState.vars,
							...prevState.lightTheme
					  }
			}),
			() => {
				window.less.modifyVars(this.state.vars).catch(error => {
					message.error(`Failed to reset theme`);
				});
			}
		);
	};

	handleSave = () => {
		this.props.hideModal();
	};

	render() {
		const colorPickers = Object.keys(this.state.vars).map(varName =>
			this.getColorPicker(varName)
		);

		return (
			<Modal
				centered
				title="Dashboard Settings"
				visible={this.props.isModalShow}
				onCancel={this.props.hideModal}
				footer={[
					<Button
						key="reset-theme"
						type="primary"
						onClick={() => this.resetTheme()}
						style={{ float: "left" }}
					>
						Reset Theme
					</Button>,
					<Button
						key="reset-data"
						type="primary"
						onClick={() => {}}
						style={{ float: "left" }}
					>
						Clear all Data
					</Button>,
					<div key="ok-cancel">
						<Button
							type="primary"
							key="ok"
							onClick={() => {
								this.props.hideModal();
							}}
						>
							Ok
						</Button>
						<Button
							type="secondary"
							key="cancel"
							onClick={() => {
								this.props.hideModal();
							}}
						>
							Cancel
						</Button>
					</div>
				]}
			>
				<Row type="flex" justify="space-between" align="middle">
					<Col>
						<h3 style={{ marginBottom: 0 }}>Dark Mode</h3>
					</Col>
					<Col>
						<Switch
							checked={this.state.isdarkTheme}
							onChange={() => {
								this.setState({ isdarkTheme: !this.state.isdarkTheme }, () =>
									this.handleDMSwitch()
								);
							}}
						/>
					</Col>
				</Row>
				<br />
				<Row>{colorPickers}</Row>
				<br />
				<Row type="flex" justify="space-between" align="middle">
					<Col>
						<h3 style={{ marginBottom: 0 }}>Presentation Mode</h3>
					</Col>
					<Col>
						<Switch
							checked={this.props.isPresentationMode}
							onChange={() => {
								this.setState(
									{ isPresentationMode: !this.state.isPresentationMode },
									() => this.props.toggleMode(this.state.isPresentationMode)
								);
							}}
						/>
					</Col>
				</Row>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		isPresentationMode: state.modeReducer.isPresentationMode,
		isModalShow: state.modalReducer.isModalShow,
		isDarkTheme: state.themeReducer.darkTheme
	};
};

export default connect(
	mapStateToProps,
	{ hideModal, toggleTheme, toggleMode }
)(SettingsModal);
