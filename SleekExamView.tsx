import React, { useState } from "react";
import {
  BookOpen,
  Shuffle,
  Database,
  Sparkles,
  HelpCircle,
  Check,
  RefreshCw,
} from "lucide-react";
import { Question, AiCheckResult } from "./types";

// ========================== 1. SIDEBAR ==========================
interface SidebarProps {
  activeTab: "exam" | "random" | "database";
  setActiveTab: (tab: "exam" | "random" | "database") => void;
  questionsCount: number;
  customCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  questionsCount,
  customCount
}) => {
  return (
    <aside id="sleek-sidebar" className="w-64 bg-slate-900 flex flex-col shrink-0 text-slate-100 border-r border-slate-800">
      <div className="p-6 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-505 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white font-display">
            ES
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">Examen Oral</h1>
            <p className="text-[10px] text-slate-400 font-medium">Մարզիչ (A1-A2)</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setActiveTab("exam")}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 border border-transparent ${
            activeTab === "exam"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 font-bold border-indigo-500"
              : "text-slate-400 hover:text-white hover:bg-slate-800/40"
          }`}
        >
          <BookOpen className="w-5 h-5 opacity-80 shrink-0" />
          Բանավոր քննություն
        </button>

        <button
          onClick={() => setActiveTab("random")}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 border border-transparent ${
            activeTab === "random"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 font-bold border-indigo-500"
              : "text-slate-400 hover:text-white hover:bg-slate-800/40"
          }`}
        >
          <Shuffle className="w-5 h-5 opacity-80 shrink-0" />
          Պատահական տոմս
        </button>

        <button
          onClick={() => setActiveTab("database")}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 border border-transparent ${
            activeTab === "database"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 font-bold border-indigo-500"
              : "text-slate-400 hover:text-white hover:bg-slate-800/40"
          }`}
        >
          <Database className="w-5 h-5 opacity-80 shrink-0" />
          Հարցերի շտեմարան ({questionsCount})
        </button>
      </nav>

      <div className="p-6 shrink-0 border-t border-slate-850">
        <div className="bg-slate-800/50 rounded-xl p-4">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1.5">Շտեմարանի առաջընթացը</p>
          <div className="h-2 bg-slate-705 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.max(15, (customCount / 25) * 100))}%`
              }}
            />
          </div>
          <p className="text-[10px] text-white mt-1.5 font-medium">Իմ ստեղծած տոմսերը՝ {customCount}</p>
        </div>
      </div>
    </aside>
  );
};

// ========================== 2. QUESTION CARD ==========================
interface ActiveQuestionCardProps {
  activeQuestion: Question;
  currentIdx: number;
  totalFiltered: number;
  showQuestionTranslation: boolean;
  setShowQuestionTranslation: (val: boolean) => void;
  showModelAnswer: boolean;
  setShowModelAnswer: (val: boolean) => void;
  handlePrevQuestion: () => void;
  handleNextQuestion: () => void;
  fontSizeClass: "normal" | "large" | "xlarge";
}

export const ActiveQuestionCard: React.FC<ActiveQuestionCardProps> = ({
  activeQuestion,
  currentIdx,
  totalFiltered,
  showQuestionTranslation,
  setShowQuestionTranslation,
  showModelAnswer,
  setShowModelAnswer,
  handlePrevQuestion,
  handleNextQuestion,
  fontSizeClass
}) => {
  // Option index state for alternative answers - 0, 1, 2
  const [selectedAltIdx, setSelectedAltIdx] = useState<number>(0);

  // Dynamic font scaling mapper
  const getQuestionSizeClass = () => {
    if (fontSizeClass === "xlarge") return "text-3xl md:text-4xl font-black";
    if (fontSizeClass === "large") return "text-2xl md:text-3xl font-extrabold";
    return "text-xl md:text-2xl font-bold";
  };

  const getSubfontSizeClass = () => {
    if (fontSizeClass === "xlarge") return "text-lg md:text-xl font-medium";
    if (fontSizeClass === "large") return "text-base md:text-lg font-medium";
    return "text-sm md:text-base";
  };

  const getAnswerSizeClass = () => {
    if (fontSizeClass === "xlarge") return "text-xl md:text-2xl";
    if (fontSizeClass === "large") return "text-lg md:text-xl";
    return "text-base md:text-lg";
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col flex-1 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-indigo-500" />
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-650 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wide border border-indigo-100">
            {activeQuestion.tema}
          </span>
          <span className={`px-3 py-1 text-[10px] md:text-xs font-bold rounded-full uppercase border ${
            activeQuestion.nivel === "A1" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-sky-50 text-sky-700 border-sky-100"
          }`}>
            Մակարդակ՝ {activeQuestion.nivel}
          </span>
        </div>
        <span className="text-slate-400 font-mono text-[10px] md:text-xs bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
          ID: {activeQuestion.id} ({currentIdx + 1}/{totalFiltered})
        </span>
      </div>

      <div className="flex-grow flex flex-col justify-center py-4">
        <h2 className={`${getQuestionSizeClass()} text-slate-900 leading-tight mb-4 tracking-tight font-display`}>
          {activeQuestion.pregunta}
        </h2>

        {/* Question translation */}
        <div className="bg-slate-50/80 border border-slate-150 rounded-2xl p-5 mb-8">
          {showQuestionTranslation ? (
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Հայերեն թարգմանություն՝</span>
              <p className={`${getSubfontSizeClass()} text-slate-800 italic`}>
                {activeQuestion.traduccionPregunta}
              </p>
            </div>
          ) : (
            <button
              onClick={() => setShowQuestionTranslation(true)}
              className="text-indigo-600 hover:text-indigo-800 font-bold text-xs md:text-sm underline cursor-pointer text-left block"
            >
              👁️ Ցույց տալ հարցի թարգմանությունը հայերենով
            </button>
          )}
        </div>

        {/* Alternatives and Model Answers with interactive selector tab */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-1 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest pl-1">
                Օրինակելի պատասխաններ (Variantes de respuesta)
              </span>
              
              {/* Variant selectors tabs */}
              {showModelAnswer && activeQuestion.respuestasAlternativas && activeQuestion.respuestasAlternativas.length > 0 && (
                <div className="flex bg-slate-200/60 p-1 rounded-xl self-start sm:self-auto">
                  {activeQuestion.respuestasAlternativas.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAltIdx(idx)}
                      className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                        selectedAltIdx === idx
                          ? "bg-white text-indigo-700 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {option.nivel}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {showModelAnswer ? (
              <div className="space-y-4 border border-violet-100 bg-linear-to-b from-indigo-50/20 to-white/90 p-5 md:p-6 rounded-2xl shadow-xs">
                {activeQuestion.respuestasAlternativas && activeQuestion.respuestasAlternativas.length > 0 ? (
                  <>
                    <p className={`${getAnswerSizeClass()} text-slate-900 leading-relaxed font-black font-sans`}>
                      {activeQuestion.respuestasAlternativas[selectedAltIdx]?.respuesta}
                    </p>
                    <div className="h-[1px] bg-slate-200/60" />
                    <p className={`${getSubfontSizeClass()} text-indigo-950 italic font-medium leading-relaxed`}>
                      {activeQuestion.respuestasAlternativas[selectedAltIdx]?.traduccion}
                    </p>
                  </>
                ) : (
                  <>
                    <p className={`${getAnswerSizeClass()} text-slate-900 leading-relaxed font-black font-sans`}>
                      {activeQuestion.respuestaModelo}
                    </p>
                    <div className="h-[1px] bg-slate-200/60" />
                    <p className={`${getSubfontSizeClass()} text-emerald-800 italic font-medium leading-relaxed`}>
                      {activeQuestion.traduccionRespuesta}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowModelAnswer(true);
                  setSelectedAltIdx(0);
                }}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                💡 Ցուցադրել պատասխանի մի քանի տարբերակ
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer Area with tags & navigation selection */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <span className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Առանցքային բառեր</span>
          <div className="flex flex-wrap gap-1.5">
            {activeQuestion.palabrasImportantes.split(",").map((word, wIdx) => (
              <span key={wIdx} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-lg font-bold font-sans border border-indigo-100">
                {word.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={handlePrevQuestion}
            disabled={currentIdx === 0}
            className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs shadow-xs disabled:opacity-45 transition-all cursor-pointer"
          >
            ← Ետ
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentIdx === totalFiltered - 1}
            className="px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-indigo-500/10 disabled:opacity-45 transition-all cursor-pointer"
          >
            Առաջ →
          </button>
        </div>
      </div>
    </section>
  );
};

// ========================== 3. INTELLIGENT EXPERT AI CHECKER PANEL ==========================
interface AiCoachProps {
  studentAnswer: string;
  setStudentAnswer: (val: string) => void;
  isCheckingAnswer: boolean;
  onCheckAnswer: () => void;
  aiCheckResult: AiCheckResult | null;
  aiCheckError: string | null;
  fontSizeClass: "normal" | "large" | "xlarge";
}

export const AiCoach: React.FC<AiCoachProps> = ({
  studentAnswer,
  setStudentAnswer,
  isCheckingAnswer,
  onCheckAnswer,
  aiCheckResult,
  aiCheckError,
  fontSizeClass
}) => {
  // text scaling mapper for assessor outputs
  const getOutputTextSizeClass = () => {
    if (fontSizeClass === "xlarge") return "text-[15px]";
    if (fontSizeClass === "large") return "text-[13px]";
    return "text-[11px]";
  };

  const getLabelTextSizeClass = () => {
    if (fontSizeClass === "xlarge") return "text-[12px]";
    return "text-[10px]";
  };

  return (
    <section className="bg-indigo-600 rounded-3xl shadow-xl p-6 text-white overflow-hidden relative flex flex-col justify-between">
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-1.5 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          Ինտելեկտուալ ստուգում (AI Coach)
        </h3>
        <p className="text-[11px] text-indigo-100 pb-4">
          Գրեք ձեր պատասխանը իսպաներենով։ AI թյուտորը կվերլուծի քերականությունը և կցուցադրի քննական գնահատականը։
        </p>

        <textarea
          className="w-full h-28 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm resize-none font-sans"
          placeholder="Yo necesito pasaporte y maleta grande para mi viaje..."
          value={studentAnswer}
          onChange={(e) => setStudentAnswer(e.target.value)}
        />

        <div className="flex justify-between items-center mt-3">
          <button
            onClick={() => setStudentAnswer("")}
            className="text-xs text-white/70 hover:text-white transition cursor-pointer font-semibold"
          >
            Մաքրել դաշտը
          </button>
          <button
            onClick={onCheckAnswer}
            disabled={isCheckingAnswer || !studentAnswer.trim()}
            className="px-6 py-2.5 bg-white hover:bg-slate-50 text-indigo-600 rounded-xl font-bold text-xs shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {isCheckingAnswer ? (
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Վերլուծում...
              </span>
            ) : (
              "Ստուգել պատասխանը"
            )}
          </button>
        </div>

        {/* Report box with scaled font layout */}
        {aiCheckResult && (
          <div className="mt-4 bg-white rounded-2xl p-4 text-slate-800 text-xs space-y-3.5 shadow-md animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-extrabold text-slate-700">AI Վերլուծություն՝</span>
              {aiCheckResult.hasErrors ? (
                <span className="px-2.5 py-0.5 bg-red-100 text-red-700 border border-red-200 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  Կան սխալներ
                </span>
              ) : (
                <span className="px-2.5 py-0.5 bg-emerald-150 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  Կատարյալ է
                </span>
              )}
            </div>

            {aiCheckResult.errors && (
              <div>
                <span className={`block font-bold text-slate-400 uppercase tracking-widest ${getLabelTextSizeClass()} mb-1`}>Քերականություն (Gramática)</span>
                <p className={`${getOutputTextSizeClass()} text-slate-800 leading-relaxed italic bg-slate-50 border border-slate-100 p-2.5 rounded-xl`}>{aiCheckResult.errors}</p>
              </div>
            )}

            {aiCheckResult.wordUsage && (
              <div>
                <span className={`block font-bold text-slate-400 uppercase tracking-widest ${getLabelTextSizeClass()} mb-1`}>Բառերի ընտրություն և բառապաշար</span>
                <p className={`${getOutputTextSizeClass()} text-slate-800 leading-relaxed italic bg-slate-50 border border-slate-100 p-2.5 rounded-xl`}>{aiCheckResult.wordUsage}</p>
              </div>
            )}

            {aiCheckResult.simplification && (
              <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl text-indigo-950">
                <span className={`block font-bold text-indigo-600 uppercase tracking-widest ${getLabelTextSizeClass()} mb-1`}>Ավելի պարզ տարբերակ (A1-A2)</span>
                <p className={`${fontSizeClass === "xlarge" ? "text-lg" : fontSizeClass === "large" ? "text-base" : "text-sm"} font-bold text-indigo-900`}>{aiCheckResult.simplification}</p>
              </div>
            )}

            {aiCheckResult.improvements && (
              <div>
                <span className={`block font-bold text-slate-400 uppercase tracking-widest ${getLabelTextSizeClass()} mb-1`}>Խորհուրդներ DELE քննության համար</span>
                <p className={`${getOutputTextSizeClass()} text-slate-700 bg-slate-50 border border-slate-100 p-2.5 rounded-xl leading-relaxed`}>{aiCheckResult.improvements}</p>
              </div>
            )}

            {aiCheckResult.correctAnswer && (
              <div className="bg-emerald-50 text-emerald-950 p-3 rounded-xl border border-emerald-100">
                <span className={`block font-bold text-emerald-700 uppercase tracking-widest ${getLabelTextSizeClass()}`}>Խորհուրդ տրվող իդեալական տարբերակը</span>
                <p className={`${fontSizeClass === "xlarge" ? "text-lg" : fontSizeClass === "large" ? "text-base" : "text-sm"} font-bold font-sans italic mt-1 text-slate-900`}>{aiCheckResult.correctAnswer}</p>
              </div>
            )}
          </div>
        )}

        {/* Error message */}
        {aiCheckError && (
          <div className="mt-4 bg-red-950/40 text-red-100 p-3 rounded-xl border border-red-500/20 text-xs">
            {aiCheckError}
          </div>
        )}
      </div>

      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
    </section>
  );
};
