import React from 'react';
import {
  TrendingUp,
  BarChart3,
  Send,
  ShieldCheck,
  Search,
  Monitor,
  ArrowRight,
  UserCircle,
  Briefcase
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#050a15] text-white font-sans">
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">N-T</div>
          <span className="text-xl font-bold tracking-tight">NEXUS <span className="text-gray-500 font-light">TRACKER</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#sobre" className="hover:text-blue-500 transition">Sobre</a>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition text-xs font-bold uppercase tracking-wider">
            Cadastrar
          </button>
        </div>
      </nav>

      <section className="relative max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 z-10 text-center lg:text-left">
          <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
            Gestão de Incidentes Inteligente
          </span>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-balance">
            Suporte Pós-Venda que <span className="text-blue-500">Escala seu Negócio</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Nossos especialistas dominam seus produtos para que você foque no que importa: crescer.
            Esqueça a fila de chamados, chame a Nexus Tracker.
          </p>
        </div>

        <div className="flex-1 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden border border-gray-800 bg-[#0a1120] p-4 shadow-2xl">
            <div className="aspect-square bg-gradient-to-br from-blue-900/20 to-transparent flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src="./src/imagens/smile-man.png"
                alt="Especialista Nexus Tracker"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 bg-blue-600 p-4 rounded-xl shadow-xl z-20 hidden md:block">
            <p className="text-xs font-bold uppercase opacity-80">Disponibilidade</p>
            <p className="text-2xl font-black">24/7</p>
          </div>
        </div>
      </section>

      <section id="sobre" className="py-24 bg-[#080e1a] border-y border-gray-800/50">
        <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/3 flex justify-center">
            <div className="w-48 h-48 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
              <Briefcase className="w-20 h-20 text-blue-500 opacity-80" />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <div className="h-1 w-12 bg-blue-600"></div>
              Por que a Nexus Tracker?
            </h2>
            <div className="text-gray-400 space-y-4 text-lg leading-relaxed">
              <p>
                A <strong>Nexus Tracker</strong> é o braço direito de empresas que não abrem mão da excelência no pós-venda.
                Especializamo-nos em suporte técnico para produtos e equipamentos complexos, garantindo que sua marca
                mantenha a confiança do cliente muito após o fechamento do negócio.
              </p>
              <p>
                Nossos técnicos não apenas resolvem tickets; eles mergulham no funcionamento do seu produto para oferecer
                soluções definitivas. <span className="text-white font-medium">Deixe a complexidade técnica conosco</span> e
                elimine de vez a preocupação com o volume de chamados acumulados.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-black py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Funcionalidades</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: Send,
                title: "Abertura Personalizada",
                desc: "Interface intuitiva para que o usuário final descreva incidentes com clareza e precisão."
              },
              {
                icon: ShieldCheck,
                title: "Gestão Segura",
                desc: "Arquitetura robusta com autenticação JWT via cookies, garantindo privacidade total dos dados."
              },
              {
                icon: Search,
                title: "Triagem Inteligente",
                desc: "Classificação de 'Baixo' a 'Crítico' para priorizar o que realmente impacta sua operação."
              },
              {
                icon: Monitor,
                title: "Analytics de Desempenho",
                desc: "Dashboards detalhados para monitorar o tempo de resolução e a eficiência de cada técnico."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group transition-transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <item.icon className="w-7 h-7 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3 px-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed px-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
