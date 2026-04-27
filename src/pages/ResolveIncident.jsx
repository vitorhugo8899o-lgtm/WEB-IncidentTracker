import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ResolveIncident } from '../services/incident';

const ResolverChamado = () => {
    const navigate = useNavigate();

    const [idIncident, setIdIncident] = useState('');
    const [status, setStatus] = useState('open');
    const [priority, setPriority] = useState('low');
    const [comment, setComment] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

    const handleResolve = async (e) => {
        e.preventDefault();

        if (comment.length < 10) {
            setMensagem({
                tipo: 'erro',
                texto: 'O comentário deve ter pelo menos 10 caracteres.'
            });
            return;
        }

        setIsLoading(true);
        setMensagem({ tipo: '', texto: '' });

        try {
            const payload = {
                status: status,
                priority: priority,
                comment: comment
            };

            const response = await ResolveIncident(idIncident, payload);

            setMensagem({
                tipo: 'sucesso',
                texto: response.message || "Chamado atualizado com sucesso!"
            });

            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (error) {
            setMensagem({
                tipo: 'erro',
                texto: error.message || 'Erro ao atualizar chamado.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 p-8 bg-[#080B12] min-h-screen text-slate-200 font-sans">
            <header className="mb-8">
                <button
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Voltar</span>
                </button>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <CheckCircle2 className="text-green-500" />
                    Resolver Incidente
                </h1>
                <p className="text-slate-400 mt-2">Atualize o status e prioridade para processar o chamado.</p>
            </header>

            <div className="bg-[#121826] border border-slate-800 rounded-xl p-8 max-w-2xl shadow-xl">
                <form onSubmit={handleResolve} className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">ID do Incidente (Obrigatório)</label>
                        <input
                            type="number"
                            min="1"
                            required
                            placeholder="Ex: 5"
                            value={idIncident}
                            onChange={(e) => setIdIncident(e.target.value)}
                            className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:border-blue-600 outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Novo Status</label>
                            <select
                                required
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:border-blue-600 outline-none appearance-none"
                            >
                                <option value="open">Aberto</option>
                                <option value="in_progress">Resolvendo</option>
                                <option value="closed">Fechado</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Prioridade Final</label>
                            <select
                                required
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:border-blue-600 outline-none appearance-none"
                            >
                                <option value="low">Baixa (Low)</option>
                                <option value="medium">Média (Medium)</option>
                                <option value="high">Alta (High)</option>
                                <option value="critical">Crítica (Critical)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Comentário de Resolução</label>
                        <textarea
                            required
                            rows="4"
                            placeholder="Descreva as ações tomadas para resolver este incidente..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:border-blue-600 outline-none transition-all resize-none"
                        ></textarea>
                        <p className={`text-[10px] mt-2 ${comment.length < 10 ? 'text-amber-500' : 'text-slate-500'}`}>
                            Mínimo de 10 caracteres. Atual: {comment.length}
                        </p>
                    </div>

                    {mensagem.texto && (
                        <div className={`p-4 rounded-lg flex items-center gap-3 ${mensagem.tipo === 'erro' ? 'bg-red-950/30 border border-red-900/50 text-red-400' : 'bg-green-950/30 border border-green-900/50 text-green-400'}`}>
                            <AlertCircle size={20} />
                            <p className="text-sm">{mensagem.texto}</p>
                        </div>
                    )}

                    <div className="flex justify-end pt-4 border-t border-slate-800">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-all disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                            Finalizar Atualização
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResolverChamado;