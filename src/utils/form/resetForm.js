/**
 * Clear value to all fields into form
 * @param {Object} form element parent to all fields
 * @param {SetStateAction} setState state of those elements
 * @param {Array} ignore elements to be ignore on reset moment
 */

export function resetInputs(form, setState, ignore) {
	Object.keys(form).forEach(each => {
		if (each === ignore.find(element => element === each)) return;

		setState(prevState => ({
			...prevState,
			[each]: ""
		}));
	});
}
