export interface AlternativeAnswer {
  respuesta: string;
  traduccion: string;
  nivel: string; // "Պարզ (A1)" | "Մանրամասն (A2)" | "Բնական/Խոսակցական (DELE)"
}

export interface Question {
  id: string;
  pregunta: string;
  traduccionPregunta: string;
  respuestaModelo: string;
  traduccionRespuesta: string;
  palabrasImportantes: string;
  tema: string;
  nivel: "A1" | "A2";
  isCustom?: boolean;
  respuestasAlternativas?: AlternativeAnswer[];
}

export interface AiCheckResult {
  hasErrors: boolean;
  errors?: string;
  wordUsage?: string;
  simplification?: string;
  improvements?: string;
  correctAnswer?: string;
}
