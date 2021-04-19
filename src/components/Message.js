import React from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Message(props) {
	let now = new Date(props.time);
	let hour = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
	let ampm = now.getHours() > 12 ? "PM" : "AM";
	return (
		<div
			className="w-10/12 flex justify-between m-auto"
			style={{ paddingBottom: "5px" }}
		>
			<div
				style={{ width: "10%", color: "#1E3A8A", fontWeight: "bold" }}
				className="bg-gradient-to-r  "
			>
				{props.user}
			</div>
			<div style={{ width: "3%" }}>:</div>
			<div style={{ width: "67%" }}>{props.children}</div>
			<div style={{ width: "20%" }} className="text-right">
				{hour} :{" "}
				{now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}{" "}
				{ampm}
			</div>
		</div>
	);
}

export default Message;
