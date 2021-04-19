import React, { Component, useCallback } from "react";
import "./App.css";

import Navbar from "./components/Navbar";

import Chat from "./components/Chat";
import axios from "axios";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class App extends Component {
	// {message: "b", time: "2021-04-18T03:06:54.774Z"}
	state = {
		user: "Unknown",
		message: "",
		messages: [],
		messageList: "",
		pickerOn: false,
	};

	componentDidMount = () => {
		this.getMessages();
	};

	getMessages = () => {
		setTimeout(() => {
			axios.get("https://[YOUR_URL]/messages.json").then((response) => {
				let array = [];
				for (let key in response.data) {
					console.log(response.data[key]);
					array.push({
						message: response.data[key].message,
						time: response.data[key].time,
						user: response.data[key].user,
					});
				}
				this.setState({ messages: [...array] });
			});
			this.getMessages();
		}, 700);
	};

	postHandler = () => {
		if (this.state.message.length > 0) {
			let now = new Date();
			axios
				.post("https://[YOUR_URL]/messages.json", {
					message: this.state.message,
					time: now,
					user: this.state.user,
				})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
			this.setState((prevState) => {
				return {
					message: "",
					messages: [
						...prevState.messages,
						{ message: this.state.message, time: now, user: this.state.user },
					],
				};
			});
		}
	};
	changeNameHandler = (name) => {
		this.setState((prevState) => {
			return { ...prevState, user: name };
		});
	};
	handleKeyPress = (event) => {
		if (event.key === "Enter") {
			this.postHandler();
		}
	};
	addEmoji = (emoji) => {
		this.setState((prevState) => {
			return { ...prevState, message: prevState.message + emoji.native };
		});
		console.log(emoji);
	};

	render() {
		return (
			<div className="App">
				<Navbar
					changeName={this.changeNameHandler}
					currentName={this.state.user}
				/>
				<div
					className="overflow-y-auto"
					style={{ width: "100%", height: "650px", paddingTop: "20px" }}
				>
					<Chat messages={this.state.messages} />
				</div>

				<div
					className="flex justify-center items-center"
					style={{
						position: "fixed",
						height: "100px",
						bottom: 0,
						width: "100%",
						marginBottom: "20px",
					}}
				>
					<div style={{ width: "130px" }}>
						{this.state.pickerOn ? (
							<div>
								<Picker
									style={{ position: "absolute", bottom: "2px", right: "20px" }}
									set="apple"
									onSelect={this.addEmoji}
									title="Pick your emoji…"
									emoji="point_up"
								/>
								<button
									onClick={() => {
										this.setState((prevState) => {
											return { ...prevState, pickerOn: false };
										});
									}}
								>
									😀 Hide Emoji
								</button>
							</div>
						) : (
							<button
								onClick={() => {
									this.setState((prevState) => {
										return { ...prevState, pickerOn: true };
									});
								}}
							>
								😀 Show Emoji
							</button>
						)}
					</div>

					<input
						type="text"
						className="border pl-2 w-4/6 h-10 rounded-lg border-purple-300 ml-10 focus:outline-none focus:ring-indigo-400"
						onChange={(event) =>
							this.setState((prevState) => {
								return { ...prevState, message: event.target.value };
							})
						}
						value={this.state.message}
						onKeyPress={this.handleKeyPress}
					/>
					<button
						className="rounded-lg bg-yellow-300 shadow-lg px-2 py-2 cursor-pointer"
						onClick={this.postHandler}
					>
						Submit
					</button>
				</div>
			</div>
		);
	}
}

export default App;
