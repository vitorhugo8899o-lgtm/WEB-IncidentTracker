import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    UserMinus,
    Search,
    AlertCircle,
    CheckCircle2,
    Loader2,
    ArrowLeft,
    X,
    ShieldOff,
    Info
} from 'lucide-react';
import { DisableUser } from '../services/Technician';

const DisableUserPage = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [backendResponse, setBackendResponse] = useState(null);
    const [lastTargetId, setLastTargetId] = useState('');

    const handleDisable = async (e) => {
        e.preventDefault();

        if (!userId || parseInt(userId) < 0) {
            setError("Por favor, insira um ID válido.");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            setBackendResponse(null);

            const data = await DisableUser(userId);


            setLastTargetId(userId);

            if (data && (data.detail || data.error)) {
                setError(data.detail || data.error);
            } else {
                const successMsg = typeof data === 'string' ? data : (data.message || data.detail || "Usuário desabilitado com sucesso.");
                setBackendResponse(successMsg);
                setUserId('');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 p-4 md:p-8 bg-[#080B12] min-h-screen text-slate-200 font-sans">
            <header className="mb-8">
                <button
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Voltar para Home
                </button>
                <h1 className="text-3xl font-bold text-white">Desabilitar Usuário</h1>
                <p className="text-slate-400 mt-2">O acesso será revogado imediatamente após a confirmação.</p>
            </header>

            <div className="max-w-2xl">
                <form onSubmit={handleDisable} className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                            <UserMinus size={18} />
                        </div>
                        <input
                            type="number"
                            min="0"
                            placeholder="Digite o ID do usuário..."
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full bg-[#0d121c] border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !userId}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-800/50 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                        Confirmar
                    </button>
                </form>

                {error && (
                    <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4 flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle size={20} />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}
            </div>

            {backendResponse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#121826] border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-red-950/10">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-600/20 p-2 rounded-lg text-red-500">
                                    <ShieldOff size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-white">Confirmação</h2>
                            </div>
                            <button onClick={() => setBackendResponse(null)} className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="bg-green-500/10 p-4 rounded-full text-green-500">
                                    <CheckCircle2 size={40} />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm">Mensagem do Sistema:</p>
                                    <h3 className="text-white text-lg font-medium mt-1">{backendResponse}</h3>
                                </div>
                            </div>

                            <div className="bg-[#080B12] p-4 rounded-xl border border-slate-800/50 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
                                    <Info size={14} /> ID Afetado
                                </div>
                                <span className="text-white font-mono font-bold">#{lastTargetId}</span>
                            </div>
                        </div>

                        <div className="p-6 bg-[#0d121c] border-t border-slate-800">
                            <button onClick={() => setBackendResponse(null)} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors">
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisableUserPage;