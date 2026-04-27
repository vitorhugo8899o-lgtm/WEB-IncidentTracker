import React, { useState } from 'react';
import { GetUser } from '../services/Technician';
import { Search, User, Mail, CreditCard, Calendar, CheckCircle, XCircle } from 'lucide-react';

const UserSearchPage = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchInput.trim()) return;

        if (searchedUsers.some(u => u.id.toString() === searchInput.trim())) {
            setError("Este usuário já está na lista abaixo.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await GetUser(searchInput);

            const data = response.json ? await response.json() : response.data || response;

            if (data.detail) {
                throw new Error(data.detail === "User not found" ? "Usuário não encontrado." : data.detail);
            }

            setSearchedUsers(prevUsers => [data, ...prevUsers]);
            setSearchInput('');

        } catch (err) {
            console.error("Erro ao buscar usuário:", err);
            setError(err.message || "Erro ao buscar usuário. Verifique o ID e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const formatCPF = (cpf) => {
        if (!cpf) return "N/A";
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    return (
        <div className="flex-1 p-8 bg-[#0b1120] min-h-screen text-white">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Buscar Usuário</h1>
                <p className="text-gray-400">Consulte informações de usuários do sistema através do ID.</p>
            </header>

            <form onSubmit={handleSearch} className="mb-8">
                <div className="flex gap-4 max-w-lg">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-500" />
                        </div>
                        <input
                            type="number"
                            min={1}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Digite o ID do usuário..."
                            className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-[#161d2f] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !searchInput.trim()}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Search size={18} />
                                Buscar
                            </>
                        )}
                    </button>
                </div>

                {error && (
                    <div className="mt-3 text-red-400 text-sm flex items-center gap-1">
                        <XCircle size={14} />
                        {error}
                    </div>
                )}
            </form>

            <div className="space-y-4">
                {searchedUsers.length > 0 ? (
                    <>
                        <h2 className="text-lg font-semibold text-gray-300 mb-4 border-b border-gray-800 pb-2">
                            Usuários Consultados ({searchedUsers.length})
                        </h2>
                        {searchedUsers.map((user) => (
                            <div
                                key={user.id}
                                className="bg-[#161d2f] p-6 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-colors animate-in fade-in slide-in-from-top-4 duration-300"
                            >
                                <div className="flex justify-between items-start flex-wrap gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-[#0b1120] p-4 rounded-full border border-gray-700">
                                            <User size={24} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold flex items-center gap-2">
                                                ID: {user.id}
                                                {user.is_active ? (
                                                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-900/30 text-green-400 border border-green-800 rounded-full font-medium">
                                                        <CheckCircle size={12} /> Ativo
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-red-900/30 text-red-400 border border-red-800 rounded-full font-medium">
                                                        <XCircle size={12} /> Inativo
                                                    </span>
                                                )}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 w-full border-t border-gray-800 pt-4">
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Mail size={16} className="text-gray-500" />
                                            <span>{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <CreditCard size={16} className="text-gray-500" />
                                            <span>{formatCPF(user.cpf)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Calendar size={16} className="text-gray-500" />
                                            <span>{new Date(user.created_at).toLocaleDateString('pt-BR', {
                                                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="text-center py-16 text-gray-500 border border-dashed border-gray-800 rounded-lg">
                        <Search size={40} className="mx-auto mb-3 opacity-50" />
                        <p>Nenhum usuário consultado ainda.</p>
                        <p className="text-sm mt-1">Busque pelo ID para adicionar informações a esta lista.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserSearchPage;