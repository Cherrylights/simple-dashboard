const path = require("path");
const { override, fixBabelImports, addLessLoader } = require("customize-cra");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const options = {
	antDir: path.join(__dirname, "./node_modules/antd"),
	stylesDir: path.join(__dirname, "./src/assets/styles"),
	varFile: path.join(__dirname, "./src/assets/styles/vars.less"),
	mainLessFile: path.join(__dirname, "./src/assets/styles/index.less"),
	themeVariables: [
		"@secondry-color",
		"@primary-color",
		"@text-color",
		"@text-color-secondary",
		"@heading-color",
		"@secondary-color",
		"@layout-header-background",
		"@btn-primary-bg",
		"@bg-color",
		"@border-color-base",
		"@header-bg",
		"@bg-default",
		"@grid-item-bg",
		"@grid-item-elements"
	],
	indexFileName: "index.html",
	generateOnce: false
};

const addLessPlugin = config => {
	config.plugins.push(new AntDesignThemePlugin(options));
	return config;
};

module.exports = override(
	addLessPlugin,

	fixBabelImports("import", {
		libraryName: "antd",
		libraryDirectory: "es",
		style: true
	}),

	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			"@primary-color": "#0A53B0"
		}
	})
);
