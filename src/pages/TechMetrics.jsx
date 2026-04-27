import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMetrics } from '../services/Technician';
import { BarChart3, Loader2, ArrowLeft } from 'lucide-react';

const MetricsPage = () => {
    const navigate = useNavigate();

    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFetchMetrics = async () => {
        setLoading(true);
        try {
            const response = await GetMetrics();

            const blob = await response.blob();

            const imageUrl = URL.createObjectURL(blob);
            setImageSrc(imageUrl);
        } catch (err) {
            console.error(err);
            setError("Erro ao processar o gráfico.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0c10] text-white p-8">
            <header className="mb-10">
                <button
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Voltar</span>
                </button>
                <h1 className="text-3xl font-bold mb-2">Gestão de Métricas</h1>
                <p className="text-gray-400">Métrica de chamados resolvidos</p>
            </header>

            <div className="bg-[#11141d] border border-gray-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-100">
                {!imageSrc && !loading && (
                    <div className="text-center">
                        <div className="bg-[#1c212c] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className="text-blue-500" size={32} />
                        </div>
                        <p className="text-gray-400 mb-6">Clique no botão abaixo para gerar o relatório visual.</p>
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="animate-spin text-blue-500 mb-2" size={40} />
                        <p className="text-gray-400">Processando dados...</p>
                    </div>
                )}

                {imageSrc && !loading && (
                    <div className="w-full flex justify-center mt-4 p-4 bg-[#1c212c] rounded-xl border border-gray-800 shadow-inner">
                        <img
                            src={imageSrc}
                            alt="Gráfico de Métricas"
                            className="rounded-lg max-w-full h-auto transition-opacity duration-700 ease-in-out"
                            style={{
                                filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.5))',
                                mixBlendMode: 'lighten'
                            }}
                        />
                    </div>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}

                <button
                    onClick={handleFetchMetrics}
                    disabled={loading}
                    className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-all duration-200 disabled:opacity-50"
                >
                    {imageSrc ? "Atualizar Métricas" : "Buscar Métricas"}
                </button>
            </div>
        </div>
    );
};

export default MetricsPage;