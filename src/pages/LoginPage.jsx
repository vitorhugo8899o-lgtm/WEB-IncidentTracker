import React from 'react';
import { Lock, Mail, EyeOff, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-[#050a15] text-white font-sans flex flex-col items-center justify-center px-6">
            <a href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-blue-500 transition text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Voltar para Home
            </a>

            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-blue-900/40">
                        N-T
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Acesse o <span className="text-blue-500">Nexus Tracker</span></h1>
                    <p className="text-gray-500 text-sm mt-2">Entre com suas credenciais para gerenciar incidentes</p>
                </div>

                <form className="bg-[#0a1120] border border-gray-800 p-8 rounded-2xl shadow-2xl">
                    <div className="space-y-6">
                        <div>
                            <label for='email' className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">E-mail</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    id='email'
                                    type="email"
                                    placeholder="nome@email.com"
                                    className="w-full bg-[#050a15] border border-gray-800 rounded-lg py-3 px-11 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label for='password' className="text-xs font-bold uppercase tracking-widest text-gray-400">Senha</label>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    id='password'
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-[#050a15] border border-gray-800 rounded-lg py-3 px-11 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-blue-900/20 mt-2">
                            Entrar no Painel
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-500 text-sm mt-8">
                    Ainda não tem conta? <a href="#" className="text-blue-500 font-semibold hover:underline">Solicite acesso à sua gerência</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;