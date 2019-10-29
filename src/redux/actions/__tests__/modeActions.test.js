import { toggleMode } from "../modeActions";

test("should toggle mode", () => {
	const result = toggleMode(true);
	expect(result).toEqual({
		type: "TOGGLE_MODE",
		payload: true
	});
});
