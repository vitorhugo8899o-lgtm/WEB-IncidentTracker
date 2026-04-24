import { ArrowLeft, Lock, Mail, ShieldCheck, User } from "lucide-react";
import React, { useState } from "react";
import { CreateUser } from "../services/UsersServices";

const RegisterPage = () => {
	const [userEmail, setEmail] = useState("");
	const [userPassword, setPassword] = useState("");
	const [userCPF, setCPF] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const CheckField = async (e) => {
		e.preventDefault();
		setErrorMessage("");

		if (!userEmail || !userPassword || !userCPF) {
			setErrorMessage("Preencha todos os campos!");
			return;
		}

		const emailRegex = /\S+@\S+\.\S+/;
		if (!emailRegex.test(userEmail)) {
			setErrorMessage("Insira um e-mail válido.");
			return;
		}

		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!])[A-Za-z\d@#$%&*!]{8,}$/;
		if (!passwordRegex.test(userPassword)) {
			setErrorMessage(
				"A senha deve ter 8 caracteres, incluindo letras (maiúsculas/minúsculas), números e símbolos (@#$%&*!).",
			);
			return;
		}

		const cleanCPF = userCPF.replace(/\D/g, "");
		if (cleanCPF.length !== 11) {
			setErrorMessage("O CPF deve conter exatamente 11 dígitos numéricos.");
			return;
		}

		try {
			const data = { email: userEmail, password: userPassword, cpf: cleanCPF };
			await CreateUser(data);
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<div className="min-h-screen bg-[#050a15] text-white font-sans flex flex-col items-center justify-center px-6">
			{errorMessage && (
				<div className="bg-red-700 text-white p-3 mb-4 w-full max-w-md rounded-md text-center font-semibold animate-pulse">
					{errorMessage}
				</div>
			)}

			<a
				href="/login"
				className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-blue-500 transition text-sm font-medium"
			>
				<ArrowLeft className="w-4 h-4" /> Voltar para o Login
			</a>

			<div className="w-full max-w-md">
				<div className="flex flex-col items-center mb-8">
					<div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-blue-900/40">
						N-T
					</div>
					<h1 className="text-2xl font-bold tracking-tight text-center">
						Crie sua conta no{" "}
						<span className="text-blue-500">Nexus Tracker</span>
					</h1>
				</div>

				<form
					onSubmit={CheckField}
					className="bg-[#0a1120] border border-gray-800 p-8 rounded-2xl shadow-2xl space-y-5"
				>
					<div>
						<label
							htmlFor="email"
							className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
						>
							E-mail
						</label>
						<div className="relative group">
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
							<input
								value={userEmail}
								onChange={(e) => setEmail(e.target.value)}
								id="email"
								type="email"
								placeholder="exemplo@email.com"
								className="w-full bg-[#050a15] border border-gray-800 rounded-lg py-3 px-11 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="cpf"
							className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
						>
							CPF
						</label>
						<div className="relative group">
							<ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
							<input
								value={userCPF}
								onChange={(e) => setCPF(e.target.value)}
								id="cpf"
								type="text"
								placeholder="000.000.000-00"
								className="w-full bg-[#050a15] border border-gray-800 rounded-lg py-3 px-11 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
						>
							Senha
						</label>
						<div className="relative group">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
							<input
								value={userPassword}
								onChange={(e) => setPassword(e.target.value)}
								id="password"
								type="password"
								placeholder="••••••••"
								className="w-full bg-[#050a15] border border-gray-800 rounded-lg py-3 px-11 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
							/>
						</div>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
					>
						<User className="w-5 h-5" />
						Criar Conta Grátis
					</button>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
