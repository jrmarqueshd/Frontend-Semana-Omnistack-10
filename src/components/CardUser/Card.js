import React from "react";

import "./Card.css";

import defaultImage from "../../assets/default-image.png";

export default function Card({ data }) {
	const { name, github_username, techs, bio, avatar_url } = data;

	return (
		<li className="dev-item">
			<header>
				<img
					src={avatar_url || defaultImage}
					alt={`imagem de perfil do ${name || "usuário"}`}
				/>
				<div className="user-info">
					<strong>{name || "-"}</strong>
					<span>{techs.join(", ") || "-"}</span>
				</div>
			</header>
			<p>{bio || "-"}</p>
			<a
				href={`https://github.com/${github_username}` || "#"}
				title={`"Acessar o perfil do ${name || "usuário"} no Github"`}
				rel="noopener noreferrer"
				target="_blank"
			>
				Acessar perfil no Github
			</a>
		</li>
	);
}
