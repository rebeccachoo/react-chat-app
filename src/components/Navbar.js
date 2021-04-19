import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
	const [name, setName] = useState("");

	return (
		<nav
			className="flex justify-between bg-indigo-800 items-center h-16  text-white relative shadow-sm"
			role="navigation"
		>
			<div className="pl-8 ">Real-time Chat Program</div>

			<div
				className="pr-8 md:block flex-row justify-start "
				style={{ boder: "1px white solid" }}
			>
				<span>Hi, {props.currentName} </span>
				<input
					value={name}
					onChange={(event) => setName(event.target.value)}
					placeholder="Change Your Name"
					style={{
						border: "1px solid black",
						padding: "5px",
						marginRight: "15px",
					}}
					className="text-black"
				/>
				<button onClick={() => props.changeName(name)}>Submit</button>
			</div>
		</nav>
	);
};

export default React.memo(Navbar);
