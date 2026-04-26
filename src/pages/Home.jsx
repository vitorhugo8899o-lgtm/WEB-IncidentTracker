import React, { useState, useEffect } from 'react';
import {
    LayoutList,
    PlusCircle,
    UserX,
    LogOut,
    Trash2,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { GetIncidents, CreateIncident } from '../services/incident';
import { DeleteUser } from '../services/usersServices';
import { useNavigate } from "react-router-dom";


const HomeNexusTracker = () => {
    const [activeTab, setActiveTab] = useState('chamados');
    const [chamados, setChamados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [erroPadrao, setErroPadrao] = useState(null);

    const [novoTitulo, setNovoTitulo] = useState('');
    const [novaDescricao, setNovaDescricao] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const carregarChamados = async () => {
            if (activeTab !== 'chamados') return;
            try {
                setIsLoading(true);
                setErroPadrao(null);
                const data = await GetIncidents();
                setChamados(data);
            } catch (error) {
                setErroPadrao("Não foi possível carregar seus chamados. Tente novamente mais tarde.");
                console.error("Erro ao buscar incidentes:", error);
            } finally {
                setIsLoading(false);
            }
        };
        carregarChamados();
    }, [activeTab]);

    const formatarData = (dataIso) => {
        const data = new Date(dataIso);
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(data);
    };

    const getPrioridadeColor = (prioridade) => {
        switch (prioridade?.toLowerCase()) {
            case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    const handleDeletarChamado = (id) => {
        setChamados(chamados.filter(chamado => chamado.id !== id));
    };

    async function handleDelete() {
        const confirmar = window.confirm("Tem certeza que deseja desativar sua conta? Esta ação não pode ser desfeita.");

        if (confirmar) {
            const response = await DeleteUser()
            alert(`${response}`);
            navigate("/", { replace: true })
        }
    }

    const handleCriarChamado = async (e) => {
        e.preventDefault();

        const data = {
            'title': novoTitulo,
            'description': novaDescricao,
        }

        await CreateIncident(data)
        alert("Chamado enviado com sucesso!");
        setActiveTab('chamados');
    };

    return (
        <div className="flex h-screen bg-[#080B12] text-slate-200 font-sans">

            {/* Menu Lateral*/}
            <aside className="w-64 bg-[#0d121c] border-r border-slate-800 flex flex-col justify-between">
                <div>
                    {/* Logo */}
                    <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                        <div className="bg-blue-600 text-white font-bold px-2 py-1 rounded text-sm tracking-wider">N-T</div>
                        <span className="font-semibold text-lg tracking-wide uppercase">Nexus <span className="text-slate-500 text-sm font-normal">Tracker</span></span>
                    </div>

                    {/* Links de Navegação */}
                    <nav className="p-4 space-y-2">
                        <button
                            onClick={() => setActiveTab('chamados')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'chamados' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}`}
                        >
                            <LayoutList size={20} />
                            <span className="font-medium">Meus Chamados</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('novo_chamado')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'novo_chamado' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}`}
                        >
                            <PlusCircle size={20} />
                            <span className="font-medium">Criar Chamado</span>
                        </button>
                    </nav>
                </div>

                {/* Ações de Conta */}
                <div className="p-4 border-t border-slate-800 space-y-2">
                    <button
                        onClick={handleDelete}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-400 hover:bg-red-950/30 hover:text-red-300"
                    >
                        <UserX size={20} />
                        <span className="font-medium">Desativar Conta</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-slate-400 hover:bg-slate-800/50 hover:text-slate-200">
                        <LogOut size={20} />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        {activeTab === 'chamados' ? 'Gestão de Incidentes' : 'Abrir Novo Chamado'}
                    </h1>
                    <p className="text-slate-400 mt-2">
                        {activeTab === 'chamados' ? 'Acompanhe e gerencie seus tickets de suporte.' : 'Descreva o problema para que nossos especialistas possam ajudar.'}
                    </p>
                </header>

                {activeTab === 'chamados' && (
                    <div className="grid gap-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                                <p>Sincronizando chamados...</p>
                            </div>
                        ) : erroPadrao ? (
                            <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6 text-center">
                                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                                <p className="text-red-400">{erroPadrao}</p>
                            </div>
                        ) : chamados.length === 0 ? (
                            <div className="bg-[#121826] border border-slate-800 rounded-xl p-8 text-center flex flex-col items-center">
                                <AlertCircle size={48} className="text-slate-600 mb-4" />
                                <h3 className="text-xl font-medium text-slate-300">Nenhum chamado ativo</h3>
                                <p className="text-slate-500 mt-2">Você não possui nenhum incidente registrado no momento.</p>
                            </div>
                        ) : (
                            chamados.map(chamado => (
                                <div key={chamado.id} className="bg-[#121826] border border-slate-800 rounded-xl p-6 flex justify-between items-center hover:border-slate-700 transition-colors">
                                    <div>
                                        <h3 className="text-lg font-medium text-white">{chamado.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                                            <span className="flex items-center gap-1.5 text-slate-300">
                                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                {chamado.status.toUpperCase()}
                                            </span>
                                            <span className="text-slate-600">•</span>
                                            <span className={`px-2 py-0.5 rounded border text-xs font-medium uppercase tracking-wider ${getPrioridadeColor(chamado.priority)}`}>
                                                {chamado.priority}
                                            </span>
                                            <span className="text-slate-600">•</span>
                                            <span className="text-slate-400">{formatarData(chamado.created_at)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeletarChamado(chamado.id)}
                                        className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors ml-4"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'novo_chamado' && (
                    <div className="bg-[#121826] border border-slate-800 rounded-xl p-8 max-w-2xl">
                        <form onSubmit={handleCriarChamado} className="space-y-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Título do Incidente</label>
                                <input
                                    type="text"
                                    required
                                    value={novoTitulo}
                                    onChange={(e) => setNovoTitulo(e.target.value)}
                                    className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Descrição Detalhada</label>
                                <textarea
                                    rows="5"
                                    value={novaDescricao}
                                    onChange={(e) => setNovaDescricao(e.target.value)}
                                    className="w-full bg-[#080B12] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
                                ></textarea>
                            </div>
                            <div className="flex justify-end pt-4">
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                                    Abrir Chamado
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomeNexusTracker;