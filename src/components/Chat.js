import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import Message from "./Message";

const Chat = (props) => {
	return (
		<ScrollableFeed>
			{props.messages.map((msg, index) => {
				return (
					<Message key={index} time={msg.time} user={msg.user}>
						{msg.message}
					</Message>
				);
			})}
		</ScrollableFeed>
	);
};

export default Chat;
