import { showModal, hideModal } from "../modalActions";

test("should show modal", () => {
	const result = showModal("CardSettingsModal", {
		el: {
			chartType: "cpu_utillization",
			i: "abcde123",
			x: 0,
			y: 0,
			w: 4,
			h: 4,
			minW: 4,
			maxW: 8,
			minH: 2,
			maxH: 12
		}
	});

	expect(result).toEqual({
		type: "SHOW_MODAL",
		payload: {
			modalType: "CardSettingsModal",
			modalProps: {
				el: {
					chartType: "cpu_utillization",
					i: "abcde123",
					x: 0,
					y: 0,
					w: 4,
					h: 4,
					minW: 4,
					maxW: 8,
					minH: 2,
					maxH: 12
				}
			}
		}
	});
});

test("should hide modal", () => {
	const result = hideModal();
	expect(result).toEqual({
		type: "HIDE_MODAL"
	});
});
