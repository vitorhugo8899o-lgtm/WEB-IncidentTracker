import React, { useState, useEffect } from 'react';
import {
    LayoutList,
    PlusCircle,
    UserX,
    LogOut,
    Trash2,
    AlertCircle,
    Loader2,
    Users,
    UserMinus,
    Menu,
    X
} from 'lucide-react';
import { GetIncidents, CreateIncident } from '../services/incident';
import { DeleteUser, Logout } from '../services/usersServices';
import { useNavigate } from "react-router-dom";
import { getCookie } from '../services/Technician';
import { DeleteIncident } from '../services/incident';

const HomeNexusTracker = () => {
    const [activeTab, setActiveTab] = useState('chamados');
    const [chamados, setChamados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [erroPadrao, setErroPadrao] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [userPermissions, setUserPermissions] = useState({
        isTechnicalStaff: false,
        isSupervisor: false
    });

    const [novoTitulo, setNovoTitulo] = useState('');
    const [novaDescricao, setNovaDescricao] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const userRole = getCookie('Info_Role');

        setUserPermissions({
            isTechnicalStaff: userRole === 'UserRole.TECHNICIAN' || userRole === 'UserRole.SUPERVISOR',
            isSupervisor: userRole === 'UserRole.SUPERVISOR'
        });
    }, []);

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

    const handleDeletarChamado = async (id) => {
        const confirmar = window.confirm("Tem certeza que deseja excluir este chamado?");
        if (confirmar) {
            try {
                await DeleteIncident(id);
                setChamados(chamados.filter(chamado => chamado.id !== id));
                alert("Chamado excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir:", error);
                alert("Não foi possível excluir o chamado. Tente novamente.");
            }
        }
    };

    async function handleDelete() {
        const confirmar = window.confirm("Tem certeza que deseja desativar sua conta? Esta ação não pode ser desfeita.");
        if (confirmar) {
            const response = await DeleteUser();
            alert(`${response}`);
            navigate("/", { replace: true });
        }
    }

    const handleCriarChamado = async (e) => {
        e.preventDefault();
        const data = { 'title': novoTitulo, 'description': novaDescricao };
        if (novaDescricao.length < 15 || novoTitulo.length < 10) {
            alert("Atenção: sua descrição ou título estão muito curtos.");
            return;
        }
        await CreateIncident(data);
        alert("Chamado Criado com sucesso!");
        setActiveTab('chamados');
    };

    const LogoutUser = async (e) => {
        e.preventDefault();
        const confirmar = window.confirm("Deseja sair?");
        if (confirmar) {
            const response = await Logout();
            alert(`${response}`);
            navigate("/");
        }
    };

    return (
        <div className="flex h-screen bg-[#080B12] text-slate-200 font-sans overflow-hidden">

            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-blue-600 rounded-lg text-white"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-[#0d121c] border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out
                lg:relative lg:translate-x-0 
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div>
                    <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                        <div className="bg-blue-600 text-white font-bold px-2 py-1 rounded text-sm tracking-wider">N-T</div>
                        <span className="font-semibold text-lg tracking-wide uppercase">Nexus <span className="text-slate-500 text-sm font-normal">Tracker</span></span>
                    </div>

                    <nav className="p-4 space-y-2">
                        <button
                            onClick={() => { setActiveTab('chamados'); setIsMenuOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'chamados' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}`}
                        >
                            <LayoutList size={20} />
                            <span className="font-medium">Meus Chamados</span>
                        </button>
                        <button
                            onClick={() => { setActiveTab('novo_chamado'); setIsMenuOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'novo_chamado' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}`}
                        >
                            <PlusCircle size={20} />
                            <span className="font-medium">Criar Chamado</span>
                        </button>

                        {userPermissions.isTechnicalStaff && (
                            <div className="pt-4 mt-4 border-t border-slate-800/50 space-y-2">
                                <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Área Técnica</p>

                                <button onClick={() => { navigate("/resolver-chamado"); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-blue-400 transition-colors">
                                    <LayoutList size={20} />
                                    <span className="font-medium">Resolver Chamado</span>
                                </button>
                                <button onClick={() => { navigate("/buscar-chamado"); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-blue-400 transition-colors">
                                    <PlusCircle size={20} />
                                    <span className="font-medium">Buscar Chamados</span>
                                </button>
                                <button onClick={() => { navigate("/metricas"); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-blue-400 transition-colors">
                                    <LayoutList size={20} />
                                    <span className="font-medium">Minhas Métricas</span>
                                </button>
                                <button onClick={() => { navigate("/historico"); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-blue-400 transition-colors">
                                    <LayoutList size={20} />
                                    <span className="font-medium">Histórico</span>
                                </button>

                                {userPermissions.isSupervisor && (
                                    <>
                                        <div className="pt-2 mt-2 border-t border-slate-800/30"></div>
                                        <button onClick={() => { navigate("/buscar-usuario"); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-amber-400 transition-colors">
                                            <Users size={20} />
                                            <span className="font-medium">Buscar Usuário</span>
                                        </button>
                                        <button onClick={() => { navigate("/desabilitar-usuario"); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-red-400 transition-colors">
                                            <UserMinus size={20} />
                                            <span className="font-medium">Desabilitar Usuário</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-800 space-y-2">
                    <button onClick={handleDelete} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-400 hover:bg-red-950/30 hover:text-red-300">
                        <UserX size={20} />
                        <span className="font-medium">Desativar Conta</span>
                    </button>
                    <button onClick={LogoutUser} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-slate-400 hover:bg-slate-800/50 hover:text-slate-200">
                        <LogOut size={20} />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </aside>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}

            <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                <header className="mb-8 pr-12 lg:pr-0">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                        {activeTab === 'chamados' ? 'Gestão de Incidentes' : 'Abrir Novo Chamado'}
                    </h1>
                    <p className="text-slate-400 mt-2">
                        {activeTab === 'chamados' ? 'Acompanhe e gerencie seus tickets de suporte.' : 'Descreva o problema para que possamos ajudar.'}
                    </p>
                </header>

                {activeTab === 'chamados' && (
                    <div className="grid gap-4 w-full">
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
                            </div>
                        ) : (
                            chamados.map(chamado => (
                                <div key={chamado.id} className="bg-[#121826] border border-slate-800 rounded-xl p-4 md:p-6 flex justify-between items-center hover:border-slate-700 transition-colors w-full min-w-0">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-base md:text-lg font-medium text-white truncate">{chamado.title}</h3>
                                        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs md:text-sm">
                                            <span className="flex items-center gap-1.5 text-slate-300">
                                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                {chamado.status.toUpperCase()}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded border text-[10px] md:text-xs font-medium uppercase ${getPrioridadeColor(chamado.priority)}`}>
                                                {chamado.priority}
                                            </span>
                                            <span className="text-slate-400 hidden sm:inline">{formatarData(chamado.created_at)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeletarChamado(chamado.id)}
                                        className="p-2 md:p-3 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors shrink-0"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'novo_chamado' && (
                    <div className="bg-[#121826] border border-slate-800 rounded-xl p-4 md:p-8 max-w-2xl">
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
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full md:w-auto">
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