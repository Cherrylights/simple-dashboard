import { MouseEvent } from "react";

export function throttle(func: any, limit: number) {
	let inThrottle: boolean;
	return function() {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

export function getRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min) + min);
}

export function handleChange(event: MouseEvent<HTMLInputElement>) {
	const target = event.target as HTMLInputElement;
	const value = target.value;
	const name = target.name;
	this.setState({ [name]: value });
}

export function handleSelectChange(value: any, option: any) {
	const optionValue = value;
	const optionName = option.props.title;
	this.setState({ [optionName]: optionValue });
}

export const makeid = (length: number) => {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export function setDarkTheme() {
	// set theme color
	const prevDs = Object.assign({}, this.state.dataSource);
	if (this.props.isDarkTheme) {
		prevDs.chart.theme = "candy";
		prevDs.chart.bgColor = "#202a3b";
	} else {
		prevDs.chart.theme = "fusion";
	}
	this.setState({
		dataSource: prevDs
	});
}

export function updateDarkTheme(prevProps: any) {
	if (this.props.isDarkTheme !== prevProps.isDarkTheme) {
		if (this.props.isDarkTheme === true) {
			const prevDs = Object.assign({}, this.state.dataSource);
			prevDs.chart.theme = "candy";
			// prevDs.chart.bgColor = "#292d3e";
			prevDs.chart.bgColor = "#202a3b";
			this.setState({
				dataSource: prevDs
			});
		} else {
			const prevDs = Object.assign({}, this.state.dataSource);
			prevDs.chart.theme = "fusion";
			prevDs.chart.bgColor = "#ffffff";
			this.setState({
				dataSource: prevDs
			});
		}
	}
}

interface TransformDataIntoTableType {
	(res: {
		data: any;
		hdr: {
			request_id: string;
			request_status: number;
			request_status_desc: string;
			version: number;
		};
	}): {
		columns: any[];
		dataSource: any[];
		techData: any[];
	};
}

export const transformDataIntoTable: TransformDataIntoTableType = res => {
	const result: { columns: any; dataSource: any; techData: any } = {
		columns: undefined,
		dataSource: undefined,
		techData: undefined
	};
	const data = res.data.module.info;
	// Tidy up the string and split into an array
	const stringTrim = data.trim();
	const arr = stringTrim.split("\n");
	const tidyArr = arr.filter(
		(element: string) => element.includes("+--") !== true
	);
	/* console.log(tidyArr); */

	// Step 1: The titles in the column
	// First thing is to retrieve the columns title, and then trim all strings and filter out empty strings
	const titleArr = tidyArr[0]
		.split("|")
		.map((element: string) => element.trim())
		.filter((element: string) => element !== "");

	// Create the column array
	const columnTitle = titleArr.map((element: string) => {
		return {
			title: element,
			dataIndex: element.toLowerCase().replace(/ /g, "-"),
			key: element.toLowerCase().replace(/ /g, "-")
		};
	});
	/* console.log(columnTitle); */

	// Step 2: The content in the table
	// First we need to remove the column title and data under key/value pair format
	const contentArr = tidyArr.filter((element: string, index: number) => {
		const elementArr = element.split("|");
		return index !== 0 && elementArr.length > 1;
	});
	// console.log(contentArr);

	// Next we need to create an array for the content of the table based on Ant design's table component format
	// First we need to loop out all the keys for each row and save it in an array
	const contentKeysArr = columnTitle.reduce(
		(
			accumulator: string[],
			currentValue: { title: string; dataIndex: string; key: string }
		) => accumulator.concat(currentValue.dataIndex),
		[]
	);
	// console.log(contentKeysArr);

	// And then for each string in the contentArr we gonna split it frist and then tidy up the content in each sub array
	const contentValuesArr = contentArr
		.map((element: string) => element.split("|"))
		.map((element: string[]) =>
			element.map(element => element.trim()).filter(element => element !== "")
		);
	console.log(contentValuesArr);

	// Next we will turn this two dimensional array in to an array of objects with the correspond key stored in the contentKeysArr
	interface Accumulator {
		[k: string]: string | number;
	}

	const techData: any[] = contentValuesArr.filter(
		(arr: string[]) => arr.length <= 2
	);
	const columnContent = contentValuesArr
		.filter((arr: string[]) => arr.length > 2)
		.map((element: string[], index: number) => {
			let columnContentObj;

			if (element.length > 2) {
				columnContentObj = element.reduce(
					(
						accumulator: Accumulator,
						currentValue: string,
						currentIndex: number
					) => {
						accumulator[contentKeysArr[currentIndex]] = currentValue;
						return accumulator;
					},
					{ key: index }
				);
			}
			return columnContentObj;
		});

	result.columns = columnTitle;
	result.dataSource = columnContent;
	result.techData = techData;
	return result;
};

interface TransformDataIntoDescriptionsType {
	(res: {
		data: any;
		hdr: {
			request_id: string;
			request_status: number;
			request_status_desc: string;
			version: number;
		};
	}): {
		[k: string]: string;
	};
}

export const transformDataIntoDescriptions: TransformDataIntoDescriptionsType = res => {
	console.log("this is res", res);
	const data: string = res.data.module.info;
	const stringTrim = data.trim();
	const arr = stringTrim.split("\n");
	interface Accumulator {
		[k: string]: string;
	}
	const reducer = (accumulator: Accumulator, currentValue: string) => {
		const keyAndValueArr = currentValue.trim().split("|");
		if (keyAndValueArr.length > 1) {
			if (keyAndValueArr[0].trim() !== "") {
				accumulator[
					keyAndValueArr[0].trim().replace(/ /g, "-")
				] = keyAndValueArr[1].trim();
			}
		}
		return accumulator;
	};
	const result = arr.reduce(reducer, {});
	return result;
};

export const transformInstInfo = (res: {
	data: { institution: { info: string } };
}) => {
	const data: string = res.data.institution.info;
	const stringTrim = data.trim();
	const t = stringTrim.split(";");
	const z = t.map(line => {
		let ar = Array.from(line);
		ar = ar.filter(char => char !== "-");
		ar = ar.filter(char => char !== "+");
		let processedString = ar.join("");

		return processedString.split("\n");
	});

	return z;
};
