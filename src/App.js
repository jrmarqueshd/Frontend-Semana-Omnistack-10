import React, { useEffect, useState } from "react";

import API from "./services/api";

import Input from "./components/Form/Input";
import Card from "./components/CardUser/Card";

import "./styles/Global.css";
import "./styles/App.css";
import "./styles/Sidebar.css";
import "./styles/Main.css";

import { resetInputs } from "./utils/form/resetForm";

function App() {
	const [form, setForm] = useState({
		github_username: "",
		techs: "",
		latitude: "",
		longitude: ""
	});

	const [users, setUsers] = useState([]);

	function handleChange({ target: { value, name } }) {
		setForm(prevState => ({
			...prevState,
			[name]: value
		}));
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;

				setForm(prevState => ({
					...prevState,
					latitude,
					longitude
				}));
			},
			err => {
				console.log(err);
			},
			{
				timeout: 30000
			}
		);
	}, []);

	useEffect(() => {
		async function fetch() {
			const response = await API.get("/devs");
			setUsers(response.data);
		}
		fetch();
	}, []);

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			const response = await API.post("/devs", form);

			setUsers([...users, response.data]);

			resetInputs(form, setForm, ["longitude", "latitude"]);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div id="app">
			<aside>
				<strong>Cadastrar</strong>
				<form onSubmit={handleSubmit}>
					<Input
						label="Usuário do Github *"
						id="github_username"
						type="text"
						isRequired
						value={form.github_username}
						handleChange={handleChange}
					/>
					<Input
						label="Tecnologias *"
						id="techs"
						type="text"
						isRequired
						value={form.techs}
						handleChange={handleChange}
					/>

					<div className="input-group">
						<Input
							label="latitude"
							id="latitude"
							type="number"
							isRequired
							handleChange={handleChange}
							value={form.latitude}
						/>
						<Input
							label="longitude"
							id="longitude"
							type="number"
							isRequired
							handleChange={handleChange}
							value={form.longitude}
						/>
					</div>
					<button type="submit">Salvar</button>
				</form>
			</aside>
			<main>
				<ul>
					{users.length > 0 &&
						users.map(user => {
							return <Card key={user._id + ""} data={user} />;
						})}
				</ul>
			</main>
		</div>
	);
}

export default App;
