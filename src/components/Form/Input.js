import React from "react";

import "./input.css";

export default function Input({
	label = "",
	id = "",
	type = "",
	isRequired = false,
	handleChange,
	value
}) {
	return (
		<div className="input-block">
			<label htmlFor={id}>{label}</label>
			{isRequired ? (
				<input
					name={id}
					id={id}
					type={type}
					value={value}
					onChange={handleChange}
					required
				/>
			) : (
				<input
					name={id}
					id={id}
					type={type}
					value={value}
					onChange={handleChange}
				/>
			)}
		</div>
	);
}
