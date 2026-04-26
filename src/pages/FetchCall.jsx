import React, { useState } from 'react';
import { Search, Filter, AlertCircle, Loader2, Calendar, Eye, X, ArrowLeft } from 'lucide-react';
import { QueryIncidents } from '../services/incident';
import { useNavigate } from "react-router-dom";

const FetchCall = () => {
    const navigate = useNavigate();
    const [filtros, setFiltros] = useState({
        offset: 0,
        limit: 10,
        priority: '',
        status: '',
        created_at: ''
    });

    const [chamados, setChamados] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [erroBusca, setErroBusca] = useState(null);
    const [buscaRealizada, setBuscaRealizada] = useState(false);

    const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    };

    const handleBuscar = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErroBusca(null);

        try {
            const filtrosLimpos = Object.fromEntries(
                Object.entries(filtros).filter(([_, v]) => v !== '')
            );

            const data = await QueryIncidents(filtrosLimpos);
            setChamados(data || []);
            setBuscaRealizada(true);
        } catch (error) {
            setErroBusca("Não foi possível realizar a busca. Verifique os filtros e tente novamente.");
            console.error("Erro na busca:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatarData = (dataIso) => {
        const data = new Date(dataIso);
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(data);
    };

    const getPrioridadeColor = (prioridade) => {
        switch (prioridade?.toLowerCase()) {
            case 'critical': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    return (
        <div className="flex-1 p-8 overflow-y-auto bg-[#080B12] min-h-screen font-sans text-slate-200">
            <header className="mb-8 flex flex-col gap-4">
                <button
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-fit group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Voltar para Home</span>
                </button>

                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Search className="text-blue-500" />
                        Busca Avançada
                    </h1>
                </div>
                <p className="text-slate-400">
                    Filtre e localize incidentes específicos utilizando os parâmetros abaixo.
                </p>
            </header>

            {/* Painel de Filtros */}
            <div className="bg-[#121826] border border-slate-800 rounded-xl p-6 mb-8">
                <form onSubmit={handleBuscar}>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">

                        {/* Offset */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">A partir de (Offset)</label>
                            <input
                                type="number"
                                name="offset"
                                min="0"
                                value={filtros.offset}
                                onChange={handleChange}
                                className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none"
                            />
                        </div>

                        {/* Limite */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Limite (Qtd)</label>
                            <input
                                type="number"
                                name="limit"
                                min="1"
                                value={filtros.limit}
                                onChange={handleChange}
                                className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none"
                            />
                        </div>

                        {/* Prioridade */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Prioridade</label>
                            <select
                                name="priority"
                                value={filtros.priority}
                                onChange={handleChange}
                                className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none appearance-none"
                            >
                                <option value="">Todas</option>
                                <option value="low">Baixa (Low)</option>
                                <option value="medium">Média (Medium)</option>
                                <option value="high">Alta (High)</option>
                                <option value="critical">Crítica (Critical)</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Status</label>
                            <select
                                name="status"
                                value={filtros.status}
                                onChange={handleChange}
                                className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none appearance-none"
                            >
                                <option value="">Todos</option>
                                <option value="open">Aberto</option>
                                <option value="in_progress">Resolvendo</option>
                                <option value="closed">Fechado</option>
                            </select>
                        </div>

                        {/* Data */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Data de Criação</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="created_at"
                                    value={filtros.created_at}
                                    onChange={handleChange}
                                    className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none scheme:dark"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-800">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Filter size={18} />}
                            Aplicar Filtros
                        </button>
                    </div>
                </form>
            </div>

            {/* Resultados da Busca */}
            <div className="grid gap-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                        <p>Buscando chamados...</p>
                    </div>
                ) : erroBusca ? (
                    <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6 text-center">
                        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <p className="text-red-400">{erroBusca}</p>
                    </div>
                ) : buscaRealizada && chamados.length === 0 ? (
                    <div className="bg-[#121826] border border-slate-800 rounded-xl p-8 text-center flex flex-col items-center">
                        <Search size={48} className="text-slate-700 mb-4" />
                        <h3 className="text-xl font-medium text-slate-300">Nenhum resultado encontrado</h3>
                        <p className="text-slate-500 mt-2">Tente ajustar ou remover alguns filtros para encontrar o que procura.</p>
                    </div>
                ) : (
                    chamados.map(chamado => (
                        <div key={chamado.id} className="bg-[#121826] border border-slate-800 rounded-xl p-6 flex justify-between items-center hover:border-slate-700 transition-colors">
                            <div>
                                <h3 className="text-lg font-medium text-white">{chamado.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                                    <span className="flex items-center gap-1.5 text-slate-300">
                                        <span className={`w-2 h-2 rounded-full ${chamado.status === 'open' ? 'bg-blue-500' : chamado.status === 'closed' ? 'bg-slate-500' : 'bg-green-500'}`}></span>
                                        {chamado.status.toUpperCase()}
                                    </span>
                                    <span className="text-slate-600">•</span>
                                    <span className={`px-2 py-0.5 rounded border text-xs font-medium uppercase tracking-wider ${getPrioridadeColor(chamado.priority)}`}>
                                        {chamado.priority}
                                    </span>
                                    <span className="text-slate-600">•</span>
                                    <span className="text-slate-400 flex items-center gap-1.5">
                                        <Calendar size={14} />
                                        {formatarData(chamado.created_at)}
                                    </span>
                                </div>

                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setChamadoSelecionado(chamado)}
                                    className="p-3 text-slate-400 hover:text-blue-400 hover:bg-blue-950/30 rounded-lg transition-colors"
                                    title="Visualizar Detalhes"
                                >
                                    <Eye size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {chamadoSelecionado && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#121826] border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-[#0d121c]">
                            <div>
                                <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">Detalhes do Incidente #{chamadoSelecionado.id}</span>
                                <h2 className="text-xl font-bold text-white mt-1">{chamadoSelecionado.title}</h2>
                            </div>
                            <button
                                onClick={() => setChamadoSelecionado(null)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#080B12] p-4 rounded-lg border border-slate-800/50">
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Status</p>
                                    <span className="text-slate-200 font-medium flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${chamadoSelecionado.status === 'open' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                                        {chamadoSelecionado.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="bg-[#080B12] p-4 rounded-lg border border-slate-800/50">
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Prioridade</p>
                                    <span className={`font-medium ${getPrioridadeColor(chamadoSelecionado.priority).split(' ')[0]}`}>
                                        {chamadoSelecionado.priority.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold mb-3">Descrição do Problema</p>
                                <div className="bg-[#080B12] p-5 rounded-xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {chamadoSelecionado.description}
                                </div>
                            </div>

                            <div className="flex justify-between text-sm text-slate-500 pt-4 border-t border-slate-800/50">
                                <span>Criado em: {formatarData(chamadoSelecionado.created_at)}</span>
                                <span>ID do Criador: {chamadoSelecionado.creator_id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FetchCall;