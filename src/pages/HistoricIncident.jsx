import React, { useEffect, useState } from 'react';
import { GetIncidentInvolved } from '../services/Technician';
import { useNavigate } from 'react-router-dom';
import { Trash2, Clock, Activity, ArrowLeft } from 'lucide-react';

const HistoryPage = () => {
    const navigate = useNavigate();

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await GetIncidentInvolved();
                setHistory(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return <div className="p-8 text-white">Carregando histórico...</div>;
    if (error) return <div className="p-8 text-red-500">Erro: {error}</div>;

    return (
        <div className="flex-1 p-8 bg-[#0b1120] min-h-screen text-white">
            <header className="mb-8">
                <button
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Voltar</span>
                </button>
                <h1 className="text-3xl font-bold">Histórico de Atividades</h1>
                <p className="text-gray-400">Visualize todas as interações que você realizou em chamados.</p>
            </header>

            <div className="space-y-4">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#161d2f] p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors relative group"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-400 font-mono text-sm">#INC-{item.incident_id}</span>
                                    <span className="text-gray-500">•</span>
                                    <span className="flex items-center gap-1 text-gray-400 text-sm">
                                        <Clock size={14} />
                                        {new Date(item.created_at).toLocaleString('pt-BR')}
                                    </span>
                                </div>

                                <h3 className="text-lg font-medium text-gray-200">
                                    {item.comment || "Sem comentário registrado"}
                                </h3>

                                <div className="flex items-center gap-2 mt-2">
                                    <Activity size={14} className="text-blue-500" />
                                    <p className="text-sm text-gray-400 italic">
                                        {item.action.replace(/IncidentStatus\.|IncidentPriority\./g, '')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {history.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        Nenhuma atividade encontrada no seu histórico.
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;