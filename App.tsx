import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Search,
  Check,
  RefreshCw,
  Plus,
  Trash2,
  X,
  AlertCircle,
  HelpCircle,
  Shuffle
} from "lucide-react";
import { Question, AiCheckResult } from "./types";
import { PRESET_QUESTIONS, PRESET_THEMES } from "./constants";
import { Sidebar, ActiveQuestionCard, AiCoach } from "./SleekExamView";

export default function App() {
  // State for all questions (presets combined with custom local ones)
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeTab, setActiveTab] = useState<"exam" | "random" | "database">("exam");

  // State for Font Size - "normal" | "large" | "xlarge" (defaulting to "large" so they immediately see the big font)
  const [fontSizeClass, setFontSizeClass] = useState<"normal" | "large" | "xlarge">("large");

  // Filters
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<"all" | "A1" | "A2">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Exam list states
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [showQuestionTranslation, setShowQuestionTranslation] = useState<boolean>(false);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  // Random question states
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);
  const [randomShowQuestionTranslation, setRandomShowQuestionTranslation] = useState<boolean>(false);
  const [randomShowModelAnswer, setRandomShowModelAnswer] = useState<boolean>(false);

  // AI assessment input and results
  const [studentAnswer, setStudentAnswer] = useState<string>("");
  const [isCheckingAnswer, setIsCheckingAnswer] = useState<boolean>(false);
  const [aiCheckResult, setAiCheckResult] = useState<AiCheckResult | null>(null);
  const [aiCheckError, setAiCheckError] = useState<string | null>(null);

  // Teacher Form State
  const [newPregunta, setNewPregunta] = useState<string>("");
  const [newTraduccionPregunta, setNewTraduccionPregunta] = useState<string>("");
  const [newRespuestaModelo, setNewRespuestaModelo] = useState<string>("");
  const [newTraduccionRespuesta, setNewTraduccionRespuesta] = useState<string>("");
  const [newPalabrasImportantes, setNewPalabrasImportantes] = useState<string>("");
  const [newTema, setNewTema] = useState<string>("familia");
  const [newNivel, setNewNivel] = useState<"A1" | "A2">("A1");
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // AI similar generation pane state
  const [generatingSimilarFor, setGeneratingSimilarFor] = useState<Question | null>(null);
  const [generatedSimilarQuestions, setGeneratedSimilarQuestions] = useState<Question[]>([]);
  const [isGeneratingSimilar, setIsGeneratingSimilar] = useState<boolean>(false);
  const [similarError, setSimilarError] = useState<string | null>(null);
  const [addedSimilarSet, setAddedSimilarSet] = useState<Set<number>>(new Set());

  // Load questions from local storage or set initial presets
  useEffect(() => {
    const cached = localStorage.getItem("spanish_oral_questions");
    if (cached) {
      try {
        setQuestions(JSON.parse(cached));
      } catch (e) {
        setQuestions(PRESET_QUESTIONS);
      }
    } else {
      setQuestions(PRESET_QUESTIONS);
      localStorage.setItem("spanish_oral_questions", JSON.stringify(PRESET_QUESTIONS));
    }
  }, []);

  // Save changes to local storage helper
  const saveQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    localStorage.setItem("spanish_oral_questions", JSON.stringify(newQuestions));
  };

  // Filtered lists helper
  const getFilteredQuestions = () => {
    return questions.filter((q) => {
      const matchTheme = selectedTheme === "all" || q.tema === selectedTheme;
      const matchLevel = selectedLevel === "all" || q.nivel === selectedLevel;
      const matchesSearch =
        q.pregunta.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.traduccionPregunta.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tema.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTheme && matchLevel && matchesSearch;
    });
  };

  const filtered = getFilteredQuestions();

  // Reset exam position when filters change
  useEffect(() => {
    setCurrentIdx(0);
    resetExamCardStates();
  }, [selectedTheme, selectedLevel, searchQuery]);

  const resetExamCardStates = () => {
    setShowQuestionTranslation(false);
    setShowModelAnswer(false);
    setStudentAnswer("");
    setAiCheckResult(null);
    setAiCheckError(null);
  };

  const handleNextQuestion = () => {
    if (currentIdx < filtered.length - 1) {
      setCurrentIdx(currentIdx + 1);
      resetExamCardStates();
    }
  };

  const handlePrevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      resetExamCardStates();
    }
  };

  // Generate random question helper
  const rollRandomQuestion = () => {
    const list = filtered.length > 0 ? filtered : questions;
    if (list.length === 0) {
      setRandomQuestion(null);
      return;
    }
    const rIdx = Math.floor(Math.random() * list.length);
    setRandomQuestion(list[rIdx]);
    setRandomShowQuestionTranslation(false);
    setRandomShowModelAnswer(false);
    setStudentAnswer("");
    setAiCheckResult(null);
    setAiCheckError(null);
  };

  useEffect(() => {
    if (activeTab === "random") {
      rollRandomQuestion();
    }
  }, [activeTab]);

  // Handle teacher question deletion
  const handleDeleteQuestion = (id: string) => {
    if (window.confirm("Համոզվա՞ծ եք, որ ցանկանում եք ջնջել այս հարցը:")) {
      const updated = questions.filter((q) => q.id !== id);
      saveQuestions(updated);
      if (currentIdx >= updated.length && currentIdx > 0) {
        setCurrentIdx(updated.length - 1);
      }
    }
  };

  // Restore defaults
  const handleRestorePresets = () => {
    if (window.confirm("Վերականգնե՞լ հարցերի սկզբնական շտեմարանը: Ձեր ավելացրած հարցերը կջնջվեն:")) {
      saveQuestions(PRESET_QUESTIONS);
      setCurrentIdx(0);
      resetExamCardStates();
      alert("Հարցերի սկզբնական շտեմարանը հաջողությամբ վերականգնվել է:");
    }
  };

  // Handle adding custom teacher question
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPregunta.trim() || !newTraduccionPregunta.trim() || !newRespuestaModelo.trim()) {
      alert("Լրացրեք պարտադիր դաշտերը՝ Հարցը, դրա թարգմանությունը և օրինակելի պատասխանը։");
      return;
    }

    const newItem: Question = {
      id: "custom-" + Date.now(),
      pregunta: newPregunta.trim(),
      traduccionPregunta: newTraduccionPregunta.trim(),
      respuestaModelo: newRespuestaModelo.trim(),
      traduccionRespuesta: newTraduccionRespuesta.trim(),
      palabrasImportantes: newPalabrasImportantes.trim() || "չկա",
      tema: newTema,
      nivel: newNivel,
      isCustom: true,
      // Create empty alternatives, the UI fallback will auto-show the custom answer
      respuestasAlternativas: [
        {
          respuesta: newRespuestaModelo.trim(),
          traduccion: newTraduccionRespuesta.trim() || "չկա",
          nivel: "Պարզ (A1)"
        }
      ]
    };

    const updated = [newItem, ...questions];
    saveQuestions(updated);

    // Reset fields
    setNewPregunta("");
    setNewTraduccionPregunta("");
    setNewRespuestaModelo("");
    setNewTraduccionRespuesta("");
    setNewPalabrasImportantes("");
    setFormSuccess("Հարցը հաջողությամբ ավելացվեց շտեմարան:");
    setTimeout(() => setFormSuccess(null), 4000);
  };

  // Check student response with AI
  const handleCheckAnswerWithAi = async (activeQuestion: Question) => {
    if (!studentAnswer.trim()) {
      alert("Խնդրում ենք մուտքագրել ձեր պատասխանը իսպաներենով նախքան ստուգման ուղարկելը։");
      return;
    }

    setIsCheckingAnswer(true);
    setAiCheckResult(null);
    setAiCheckError(null);

    try {
      const res = await fetch("/api/check-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pregunta: activeQuestion.pregunta,
          respuestaModelo: activeQuestion.respuestaModelo,
          studentAnswer: studentAnswer
        })
      });

      if (!res.ok) {
        throw new Error("Սերվերի հետ կապի սխալ: Խնդրում ենք կրկին փորձել:");
      }

      const report: AiCheckResult = await res.json();
      setAiCheckResult(report);
    } catch (e: any) {
      setAiCheckError(e.message || "Չհաջողվեց կապ հաստատել AI-ի հետ ստուգման համար:");
    } finally {
      setIsCheckingAnswer(false);
    }
  };

  // Generate 10 similar questions using AI
  const handleGenerateSimilarFromAi = async (sourceQuestion: Question) => {
    setGeneratingSimilarFor(sourceQuestion);
    setGeneratedSimilarQuestions([]);
    setIsGeneratingSimilar(true);
    setSimilarError(null);
    setAddedSimilarSet(new Set());

    try {
      const res = await fetch("/api/generate-similar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pregunta: sourceQuestion.pregunta,
          traduccionPregunta: sourceQuestion.traduccionPregunta,
          respuestaModelo: sourceQuestion.respuestaModelo,
          traduccionRespuesta: sourceQuestion.traduccionRespuesta,
          tema: sourceQuestion.tema,
          nivel: sourceQuestion.nivel
        })
      });

      if (!res.ok) {
        throw new Error("Չհաջողվեց ստեղծել նմանատիպ հարցեր սերվերի վրա:");
      }

      const similarList: Question[] = await res.json();
      // Map temporary IDs
      const mappedList = similarList.map((item, idx) => ({
        ...item,
        id: `similar-temp-${idx}-${Date.now()}`
      }));
      setGeneratedSimilarQuestions(mappedList);
    } catch (e: any) {
      setSimilarError(e.message || "Gemini API-ի հետ կապի սխալ տեղի ունեցավ:");
    } finally {
      setIsGeneratingNormally(false);
    }
  };

  // Helper because of state wrapper
  const setIsGeneratingNormally = (val: boolean) => {
    setIsGeneratingSimilar(val);
  };

  // Save generated question permanently
  const handleAddSingleSimilar = (q: Question, index: number) => {
    const freshItem: Question = {
      ...q,
      id: "custom-similar-" + Date.now() + "-" + index,
      isCustom: true,
      respuestasAlternativas: [
        {
          respuesta: q.respuestaModelo,
          traduccion: q.traduccionRespuesta || "չկա",
          nivel: "Պարզ (A1)"
        }
      ]
    };
    const updated = [freshItem, ...questions];
    saveQuestions(updated);

    const nextSet = new Set(addedSimilarSet);
    nextSet.add(index);
    setAddedSimilarSet(nextSet);
  };

  // Add all 10 generated questions
  const handleAddAllSimilar = () => {
    const newItems = generatedSimilarQuestions.map((q, idx) => ({
      ...q,
      id: "custom-similar-" + Date.now() + "-" + idx,
      isCustom: true,
      respuestasAlternativas: [
        {
          respuesta: q.respuestaModelo,
          traduccion: q.traduccionRespuesta || "չկա",
          nivel: "Պարզ (A1)"
        }
      ]
    }));
    const updated = [...newItems, ...questions];
    saveQuestions(updated);

    // mark all as added
    const nextSet = new Set<number>();
    generatedSimilarQuestions.forEach((_, idx) => nextSet.add(idx));
    setAddedSimilarSet(nextSet);
    alert("Բոլոր 10 նմանատիպ հարցերը հաջողությամբ ինտեգրվել են ձեր շտեմարանում։");
  };

  // Active question in the list
  const activeQuestion = filtered[currentIdx];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-900 antialiased">
      {/* LEFT SIDEBAR PANEL (Theme Branding + Sidebar Controls) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        questionsCount={questions.length}
        customCount={questions.filter((q) => q.isCustom).length}
      />

      {/* RIGHT WORKSPACE COLUMN */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        
        {/* Sleek Top Bar Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between shadow-2xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Ռեժիմ՝</span>
            <span className="text-slate-900 font-extrabold text-sm tracking-tight font-display">
              {activeTab === "exam"
                ? "Բանավոր քննություն DELE (A1-A2)"
                : activeTab === "random"
                ? "Պատահական տոմս"
                : "Բառաքարտերի շտեմարան և AI Լաբորատորիա"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Dynamic Font Size Control Segment */}
            <div className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200/80 p-1 rounded-xl border border-slate-200 transition-all">
              <span className="text-[10px] font-bold text-slate-500 px-2 uppercase tracking-wide">Տառաչափ՝</span>
              <button
                onClick={() => setFontSizeClass("normal")}
                className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                  fontSizeClass === "normal" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Նորմալ տեքստ"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeClass("large")}
                className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                  fontSizeClass === "large" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Մեծ տեքստ"
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeClass("xlarge")}
                className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                  fontSizeClass === "xlarge" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Շատ մեծ տեքստ"
              >
                A++
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-100/50">
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-wide">
                Gemini API-ն ակտիվ է
              </span>
            </div>
          </div>
        </header>

        {/* Global Filter bar at index layer */}
        {activeTab !== "database" && (
          <section className="bg-white border-b border-slate-200 py-3.5 px-6 sm:px-8 shadow-2xs shrink-0">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
              {/* Theme Dropdown */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-display">Տոմսի թեմա</label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-705 text-xs rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 transition cursor-pointer font-sans font-bold"
                >
                  <option value="all">Բոլոր բաժինները ({PRESET_THEMES.length} թեմա)</option>
                  {PRESET_THEMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Switcher */}
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-display">Բարդության մակարդակ</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                  {(["all", "A1", "A2"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`text-[10px] py-1.5 font-extrabold rounded-lg transition-all cursor-pointer ${
                        selectedLevel === lvl
                          ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {lvl === "all" ? "Բոլորը" : lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search input with visual pairing */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-display">Որոնում շտեմարանում</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Մուտքագրեք որոնվող տեքստը..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl block w-full pl-9 pr-3 p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 transition-all font-sans font-medium"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* WORKSPACE MIDDLE SCROLL CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {/* TAB 1: EXAM TRAINING LAYOUT */}
          {activeTab === "exam" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Aspect: filtered list */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="bg-slate-50 border-b border-slate-150 px-5 py-4 flex justify-between items-center">
                    <h3 className="font-extrabold text-slate-700 text-xs font-display uppercase tracking-wider">
                      Հասանելի հարցեր՝ {filtered.length}
                    </h3>
                  </div>
                  
                  <div className="max-h-[500px] overflow-y-auto divide-y divide-slate-100">
                    {filtered.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 text-xs">
                        <p>Հարցեր ըստ ֆիլտրերի չեն գտնվել։</p>
                        <button
                          onClick={() => {
                            setSelectedTheme("all");
                            setSelectedLevel("all");
                            setSearchQuery("");
                          }}
                          className="mt-3 text-indigo-650 hover:text-indigo-700 font-bold text-xs underline cursor-pointer"
                        >
                          Չեղարկել ֆիլտրերը
                        </button>
                      </div>
                    ) : (
                      filtered.map((q, idx) => (
                        <button
                          key={q.id}
                          onClick={() => {
                            setCurrentIdx(idx);
                            resetExamCardStates();
                          }}
                          className={`w-full text-left p-4 hover:bg-slate-55 hover:bg-slate-100/50 transition-all flex items-start gap-4 cursor-pointer border-l-4 ${
                            currentIdx === idx ? "bg-indigo-50/45 border-indigo-600 font-semibold" : "border-transparent"
                          }`}
                        >
                          <span className="text-xs font-mono font-bold text-slate-400 mt-0.5">
                            {(idx + 1).toString().padStart(2, "0")}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs md:text-sm font-bold truncate ${currentIdx === idx ? "text-indigo-950 font-black" : "text-slate-800"}`}>
                              {q.pregunta}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5 truncate italic">Հայերեն՝ {q.traduccionPregunta}</p>
                            <div className="flex items-center gap-1.5 mt-2">
                              <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md uppercase font-bold tracking-wider">
                                {q.tema}
                              </span>
                              <span className={`text-[9px] px-2 py-0.5 rounded-md font-extrabold pb-0.5 ${
                                q.nivel === "A1" ? "bg-emerald-55 bg-emerald-100 text-emerald-800" : "bg-sky-55 bg-sky-100 text-sky-800"
                              }`}>
                                {q.nivel}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Aspect: Card details plus AI Tutor panels */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {activeQuestion ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-12 lg:col-span-7">
                      <ActiveQuestionCard
                        activeQuestion={activeQuestion}
                        currentIdx={currentIdx}
                        totalFiltered={filtered.length}
                        showQuestionTranslation={showQuestionTranslation}
                        setShowQuestionTranslation={setShowQuestionTranslation}
                        showModelAnswer={showModelAnswer}
                        setShowModelAnswer={setShowModelAnswer}
                        handlePrevQuestion={handlePrevQuestion}
                        handleNextQuestion={handleNextQuestion}
                        fontSizeClass={fontSizeClass}
                      />
                    </div>
                    <div className="md:col-span-12 lg:col-span-5">
                      <AiCoach
                        studentAnswer={studentAnswer}
                        setStudentAnswer={setStudentAnswer}
                        isCheckingAnswer={isCheckingAnswer}
                        onCheckAnswer={() => handleCheckAnswerWithAi(activeQuestion)}
                        aiCheckResult={aiCheckResult}
                        aiCheckError={aiCheckError}
                        fontSizeClass={fontSizeClass}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 font-bold">
                    Հարցերը բեռնված չեն։ Փոխեք ֆիլտրման պարամետրերը։
                  </div>
                )}
              </div>

            </div>
          )}

        {/* TAB 2: RANDOM QUESTION MODE */}
        {activeTab === "random" && (
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Shuffle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm">Պատահական հարցերի գեներատոր</h4>
                  <p className="text-xs text-slate-500">Սիմուլյացնում է իսպաներենի բանավոր քննության տոմսերի պատահական ընտրությունը։</p>
                </div>
              </div>
              <button
                onClick={rollRandomQuestion}
                className="px-4.5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl transition shadow-sm cursor-pointer whitespace-nowrap"
              >
                Հաջորդ տոմսը 🎲
              </button>
            </div>

            {randomQuestion ? (
              <>
                {/* Random Card Panel */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-indigo-500" />
                  
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2.5 py-1 rounded-lg border border-slate-200/50">
                      Կատեգորիա՝ {randomQuestion.tema}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                      randomQuestion.nivel === "A1" ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800"
                    }`}>
                      Բարդություն՝ {randomQuestion.nivel}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-indigo-500" />
                      Ձեր տոմսի պատահական հարցը՝
                    </div>
                    <p className={`${fontSizeClass === "xlarge" ? "text-3xl md:text-4xl" : fontSizeClass === "large" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} font-black text-slate-900 leading-snug font-display`}>
                      {randomQuestion.pregunta}
                    </p>
                  </div>

                  {/* Question Translation */}
                  <div className="border-t border-slate-100 pt-4">
                    {randomShowQuestionTranslation ? (
                      <div className="space-y-1.5 bg-sky-50/50 p-4 rounded-2xl border border-sky-100">
                        <label className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">
                          Հարցի թարգմանությունը հայերեն՝
                        </label>
                        <p className={`${fontSizeClass === "xlarge" ? "text-xl" : "text-lg"} font-medium text-slate-800 italic`}>
                          {randomQuestion.traduccionPregunta}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setRandomShowQuestionTranslation(true)}
                        className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 border-dashed rounded-2xl text-sm font-bold transition cursor-pointer"
                      >
                        👁️ Ցույց տալ հարցի թարգմանությունը հայերեն
                      </button>
                    )}
                  </div>

                  {/* Model Answer (Several options logic can hook here too or fallback gracefully) */}
                  <div className="border-t border-slate-100 pt-5">
                    {randomShowModelAnswer ? (
                      <div className="space-y-4 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                        <div>
                          <label className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                            Օրինակելի պատասխան (Respuesta modelo)՝
                          </label>
                          <p className={`${fontSizeClass === "xlarge" ? "text-2xl" : "text-lg"} font-black text-emerald-900`}>
                            {randomQuestion.respuestaModelo}
                          </p>
                        </div>
                        <div className="border-t border-emerald-200/50 pt-3">
                          <label className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block mb-1">
                            Պատասխանի թարգմանությունը հայերեն՝
                          </label>
                          <p className="text-md text-slate-700 italic font-medium">
                            {randomQuestion.traduccionRespuesta}
                          </p>
                        </div>
                        {randomQuestion.palabrasImportantes && (
                          <div className="border-t border-emerald-200/50 pt-3">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                              Առանցքային հենակետային բառեր՝
                            </label>
                            <div className="text-sm text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 font-mono flex flex-wrap gap-2">
                              {randomQuestion.palabrasImportantes.split(",").map((word, wIdx) => (
                                <span key={wIdx} className="bg-slate-100 text-slate-705 px-2 py-1 rounded text-xs font-bold">
                                  {word.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => setRandomShowModelAnswer(true)}
                        className="w-full py-3 bg-emerald-650 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-extrabold shadow-sm transition cursor-pointer"
                      >
                        💡 Ցույց տալ օրինակելի պատասխանը
                      </button>
                    )}
                  </div>

                </div>

                {/* AI RESPONDER ON RANDOM PANEL */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-md">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-amber-400" />
                      <h3 className="text-lg font-bold font-display">Քո ինտերակտիվ AI ուսուցիչը</h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <textarea
                      value={studentAnswer}
                      onChange={(e) => setStudentAnswer(e.target.value)}
                      rows={3}
                      placeholder="Գրի՛ր քո բանավոր պատասխանը այստեղ իսպաներենով՝ Ինտելեկտուալ ստուգման համար..."
                      className="w-full bg-slate-950/80 border border-slate-800 text-white p-4 rounded-2xl text-sm placeholder-slate-500 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition font-sans"
                    />

                    <div className="flex justify-between items-center gap-4">
                      <button
                        onClick={() => setStudentAnswer("")}
                        className="text-xs text-slate-400 hover:text-white transition cursor-pointer font-bold"
                      >
                        Մաքրել դաշտը
                      </button>

                      <button
                        onClick={() => handleCheckAnswerWithAi(randomQuestion)}
                        disabled={isCheckingAnswer || !studentAnswer.trim()}
                        className="px-5 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
                      >
                        {isCheckingAnswer ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Ստուգումն ընթացքի մեջ է...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Ստուգել իմ պատասխանը AI-ով
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* AI Assessment Report Box */}
                  {aiCheckResult && (
                    <div className="mt-6 bg-slate-950/60 p-5 rounded-2xl border border-indigo-500/30 text-sm space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                        {aiCheckResult.hasErrors ? (
                          <div className="bg-red-500/15 text-red-400 border border-red-500/20 px-3 py-1 rounded-lg text-xs font-bold leading-none shrink-0 border-transparent">
                            ⚠️ Կան սխալներ
                          </div>
                        ) : (
                          <div className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-lg text-xs font-bold leading-none shrink-0 border-transparent">
                            ✅ Սխալներ չկան
                          </div>
                        )}
                        <span className="text-xs font-bold text-slate-450">Վերլուծության արդյունքները՝</span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Քերականական աուդիտ</h4>
                        <p className="text-slate-200 leading-relaxed text-sm bg-slate-100/5 p-3 rounded-xl border border-slate-800 font-medium">
                          {aiCheckResult.errors}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Բառերի գործածություն և բառապաշար</h4>
                        <p className="text-slate-200 leading-relaxed text-sm bg-slate-100/5 p-3 rounded-xl border border-slate-800 font-medium">
                          {aiCheckResult.wordUsage}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Ավելի պարզ տարբերակ բանավոր խոսքի համար (A1/A2)</h4>
                        <div className="bg-sky-950/40 p-3 rounded-xl border border-sky-800/40">
                          <p className="text-sky-300 font-bold mb-1 italic">{aiCheckResult.simplification}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Ինչպես բարելավել պատասխանը բարձր գնահատականի համար</h4>
                        <p className="text-slate-200 leading-relaxed text-sm bg-slate-100/5 p-3 rounded-xl border border-slate-800 font-medium">
                          {aiCheckResult.improvements}
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-emerald-950/60 to-slate-950 p-4 rounded-xl border border-emerald-500/20 mt-2">
                        <h4 className="text-xs font-black uppercase text-emerald-450 text-emerald-400 tracking-wider mb-1">Իդեալական հղկված պատասխանի տարբերակ՝</h4>
                        <p className="text-white text-base font-bold italic">
                          {aiCheckResult.correctAnswer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 font-bold">
                <p className="font-bold text-lg">Տոմսեր չկան</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TEACHER DATABASE PANEL */}
        {activeTab === "database" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Split layout: Add Question Form + Current Database Inventory */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Form to manually append questions */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col gap-5 sticky top-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                      <Plus className="w-5 h-5 text-amber-55 text-indigo-600" />
                      Ավելացնել նոր հարց
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Բառապաշարի և քննական բազայի ձեռքով համալրման ձև
                    </p>
                  </div>

                  {formSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-850 p-3.5 rounded-xl font-bold flex items-center gap-2 text-xs">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      {formSuccess}
                    </div>
                  )}

                  <form onSubmit={handleAddQuestion} className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase mb-1">Հարց իսպաներենով (Pregunta) *</label>
                      <input
                        type="text"
                        required
                        placeholder="օրինակ՝ ¿Cómo es tu mejor amigo?"
                        value={newPregunta}
                        onChange={(e) => setNewPregunta(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-1 focus:ring-indigo-505 focus:ring-indigo-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase mb-1">Հարցի թարգմանությունը հայերենով (Traducción) *</label>
                      <input
                        type="text"
                        required
                        placeholder="օրինակ՝ Ինչպիսի՞ն է քո լավագույն ընկերը։"
                        value={newTraduccionPregunta}
                        onChange={(e) => setNewTraduccionPregunta(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-1 focus:ring-indigo-505 focus:ring-indigo-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase mb-1">Օրինակելի պատասխան (Respuesta modelo) *</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="օրինակ՝ Mi mejor amigo es muy simpático, inteligente y alto."
                        value={newRespuestaModelo}
                        onChange={(e) => setNewRespuestaModelo(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-1 focus:ring-indigo-505 focus:ring-indigo-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase mb-1">Պատասխանի թարգմանությունը հայերենով</label>
                      <textarea
                        rows={2}
                        placeholder="օրինակ՝ Իմ լավագույն ընկերը շատ համակրելի է, խելացի և բարձրահասակ։"
                        value={newTraduccionRespuesta}
                        onChange={(e) => setNewTraduccionRespuesta(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-1 focus:ring-indigo-505 focus:ring-indigo-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase mb-1">Կարևոր հենակետային բառեր (ստորակետով)</label>
                      <input
                        type="text"
                        placeholder="օրինակ՝ simpático (համակրելի), inteligente (խելացի)"
                        value={newPalabrasImportantes}
                        onChange={(e) => setNewPalabrasImportantes(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-1 focus:ring-indigo-505 focus:ring-indigo-500 transition"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase mb-1">Թեմատիկա (Tema)</label>
                        <select
                          value={newTema}
                          onChange={(e) => setNewTema(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-1 focus:ring-indigo-505 focus:ring-indigo-500 transition"
                        >
                          {PRESET_THEMES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-500 uppercase mb-1">Մակարդակ (Nivel)</label>
                        <select
                          value={newNivel}
                          onChange={(e) => setNewNivel(e.target.value as "A1" | "A2")}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-1 focus:ring-indigo-505 focus:ring-indigo-500 transition"
                        >
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-sm transition shadow-md cursor-pointer"
                    >
                      Պահպանել հարցը շտեմարանում 💾
                    </button>
                  </form>

                  <div className="border-t border-slate-150 pt-4 flex flex-col gap-2">
                    <p className="text-[10px] font-bold text-slate-400">Սկզբնական դեմո-հավաքածուի կառավարում՝</p>
                    <button
                      onClick={handleRestorePresets}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer border border-slate-200"
                    >
                      🔄 Մաքրել և վերականգնել 20 նախակարգումները
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: List of current questions with detailed controls */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* AI similar generator pane */}
                {generatingSimilarFor && (
                  <div className="bg-slate-900 text-white rounded-3xl p-6 border border-amber-500/30 shadow-lg animate-fadeIn">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h4 className="text-base font-bold font-display flex items-center gap-2 text-amber-400">
                          <Sparkles className="w-5 h-5 shrink-0" />
                          Crear preguntas parecidas (AI նմանատիպ հարցերի գեներատոր)
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Ընդլայնում ենք թեման` <span className="text-white font-extrabold italic">"{generatingSimilarFor.tema}"</span>:
                          AI-ը ստեղծում է 10 պրոֆեսիոնալ նմանատիպ DELE հարցեր՝ պատասխաններով և հայերեն թարգմանություններով, հիմնվելով հետևյալի վրա՝
                        </p>
                        <p className="text-xs text-indigo-300 mt-2 bg-slate-950 p-2.5 rounded border border-slate-800 font-mono italic">
                          "{generatingSimilarFor.pregunta}"
                        </p>
                      </div>
                      <button
                        onClick={() => setGeneratingSimilarFor(null)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 transition cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {isGeneratingSimilar ? (
                      <div className="p-8 text-center space-y-3">
                        <RefreshCw className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
                        <p className="font-bold text-sm">Արհեստական բանականությունը մտածում է 10 կենդանի քննական հարցեր...</p>
                        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                          Սա կտևի մոտ 10-15 վայրկյան: Ռոբոտը կթարգմանի յուրաքանչյուր հարց հայերեն, կպատրաստի օրինակելի իսպաներեն և հայերեն պատասխաններ և կառանձնացնի 3 հենակետային բառ բառարանից:
                        </p>
                      </div>
                    ) : similarError ? (
                      <div className="p-4 bg-red-950/40 rounded-2xl border border-red-500/20 text-red-200 text-sm flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Չհաջողվեց գեներացնել</p>
                          <p className="text-xs text-red-300/80 mt-1">{similarError}</p>
                          <button
                            onClick={() => handleGenerateSimilarFromAi(generatingSimilarFor)}
                            className="mt-3 px-3 py-1 bg-red-500/20 text-red-200 border border-red-500/40 rounded text-xs font-semibold hover:bg-red-500/30 transition cursor-pointer"
                          >
                            Կրկին փորձել
                          </button>
                        </div>
                      </div>
                    ) : generatedSimilarQuestions.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-850">
                          <span className="text-xs text-slate-300 font-medium">
                            Գեներացված նմանատիպ հարցեր՝ <span className="text-amber-400 font-black">{generatedSimilarQuestions.length}</span>
                          </span>
                          <button
                            onClick={handleAddAllSimilar}
                            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-lg transition cursor-pointer"
                          >
                            Ավելացնել բոլոր 10 հարցերը շտեմարանում
                          </button>
                        </div>

                        <div className="max-h-[460px] overflow-y-auto space-y-3.5 pr-2 divide-y divide-slate-800">
                          {generatedSimilarQuestions.map((q, idx) => {
                            const isAdded = addedSimilarSet.has(idx);
                            return (
                              <div key={q.id} className="pt-3.5 first:pt-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                                <div className="space-y-1.5 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold font-mono text-amber-500">Հարց #{idx+1}</span>
                                    <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-slate-405 text-slate-400">
                                      {q.tema}
                                    </span>
                                    <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-emerald-400">
                                      {q.nivel}
                                    </span>
                                  </div>
                                  <p className="text-sm font-bold text-white font-sans">{q.pregunta}</p>
                                  <p className="text-slate-300 italic">Հայերեն՝ {q.traduccionPregunta}</p>
                                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1">
                                    <p className="text-emerald-400 font-bold">→ {q.respuestaModelo}</p>
                                    <p className="text-slate-450 text-slate-400 font-medium">({q.traduccionRespuesta})</p>
                                  </div>
                                  <p className="text-slate-400 text-[10px] font-medium">
                                    <span className="font-bold text-slate-300">Բառեր՝</span> {q.palabrasImportantes}
                                  </p>
                                </div>
                                <div className="shrink-0">
                                  {isAdded ? (
                                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 text-[11px]">
                                      <Check className="w-3.5 h-3.5" /> Շտեմարանում է
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => handleAddSingleSimilar(q, idx)}
                                      className="px-3 py-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-705 border-slate-700 rounded-lg transition font-black cursor-pointer"
                                    >
                                      + Ավելացնել
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <button
                          onClick={() => handleGenerateSimilarFromAi(generatingSimilarFor)}
                          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm transition cursor-pointer"
                        >
                          Սկսել AI 10 նմանատիպ հարցերի ավտոգեներացումը ⚡
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* List inventory */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-5 border-b border-indigo-100/50 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-base font-display">
                        Շտեմարանի քարտերի ամբողջական ցուցակը ({filtered.length} հարց)
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Դուք կարող եք ջնջել անպետք հարցերը կամ գեներացնել նմանատիպ հարցեր ցանկացած հարցի հիման վրա
                      </p>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-150 max-h-[700px] overflow-y-auto">
                    {filtered.map((item, index) => (
                      <div key={item.id} className="p-5 hover:bg-slate-50/60 transition flex flex-col md:flex-row gap-5 justify-between items-start md:items-center">
                        <div className="space-y-2 flex-grow min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-400">
                              {(index + 1).toString().padStart(2, "0")}
                            </span>
                            <span className="bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                              {item.tema}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                              item.nivel === "A1" ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-805 text-sky-800"
                            }`}>
                              {item.nivel}
                            </span>
                            {item.isCustom && (
                              <span className="bg-amber-100/70 border border-amber-200 text-amber-805 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">
                                Իմ ստեղծած տոմսերը՝
                              </span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-black text-slate-900 leading-snug">{item.pregunta}</p>
                            <p className="text-xs font-bold text-slate-500 italic">Հայերեն՝ {item.traduccionPregunta}</p>
                          </div>

                          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs">
                            <p className="font-extrabold text-slate-700">Օրինակելի պատասխան՝</p>
                            <p className="text-slate-950 mt-1 font-bold font-sans">{item.respuestaModelo}</p>
                            <p className="text-slate-500 mt-0.5 italic font-medium">Հայերեն՝ {item.traduccionRespuesta}</p>
                          </div>

                          <p className="text-[10px] text-slate-500 font-bold">
                            <span className="font-black text-slate-400 uppercase">Կարևոր բառեր՝</span> {item.palabrasImportantes}
                          </p>
                        </div>

                        {/* Control buttons of the specific question */}
                        <div className="shrink-0 flex items-center gap-2.5">
                          <button
                            onClick={() => handleGenerateSimilarFromAi(item)}
                            className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1 cursor-pointer"
                            title="Ստեղծել 10 նմանատիպ հարցեր AI-ով"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            Ստեղծել 10 նմանատիպ
                          </button>
                          
                          <button
                            onClick={() => handleDeleteQuestion(item.id)}
                            className="p-1.5 px-2 bg-red-50 border border-red-100 text-red-650 text-red-600 hover:bg-red-50 hover:border-red-200 rounded-lg text-xs transition cursor-pointer"
                            title="Ջնջել հարցը"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
              
            </div>

          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs mt-auto shrink-0 animate-fade-in absolute bottom-0 left-0 right-0 hidden">
        <div className="max-w-7xl mx-auto px-4 text-slate-400 space-y-1">
          <p>© 2026 Hablemos Español — Իսպաներենի ինտենսիվ դասընթաց A1 / A2 մակարդակի համար</p>
          <p>Մշակված է Gemini-3.5-Flash AI API ինտեգրմամբ՝ իրական բանավոր DELE քննության սիմուլյացիայի համար</p>
        </div>
      </footer>

    </main>
  </div>
  );
}
