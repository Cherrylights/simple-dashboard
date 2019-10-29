import axios from "axios";

const baseURL = "/sampleData/";

export function getData(q_param: string, dataMassageFunc?: any) {
	axios
		.get(`${baseURL}${q_param}.json`)
		.then(res => {
			dataMassageFunc
				? this.setState({ data: dataMassageFunc(res.data) })
				: this.setState({ data: res.data.data });
		})
		.catch(err => console.log(err));
}
