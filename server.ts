import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Endpoint to check student's answer
app.post("/api/check-answer", async (req: Request, res: Response): Promise<void> => {
  try {
    const { pregunta, respuestaModelo, studentAnswer } = req.body;

    if (!studentAnswer) {
      res.status(400).json({ error: "Ուսանողի պատասխանը պարտադիր է։" });
      return;
    }

    const systemPrompt = `Դու իսպաներենի պրոֆեսիոնալ դասախոս ես և փորձագետ՝ ուսանողներին A1/A2 մակարդակի DELE բանավոր քննություններին նախապատրաստելու հարցում։
Արի վերլուծենք ուսանողի պատասխանը և տրամադրենք մանրամասն վերլուծություն ՀԱՅԵՐԵՆՈՎ։
Քննողի հարցը՝ "${pregunta || ""}"
Օրինակելի պատասխան՝ "${respuestaModelo || ""}"
Ուսանողի պատասխանը՝ "${studentAnswer}"

Գնահատիր ուսանողի պատասխանը հետևյալ չափանիշներով՝
1. Իսպաներենում քերականական, ուղղագրական կամ շարահյուսական սխալների բացահայտում։
2. Բառերի և նախդիրների ճիշտ գործածության վերլուծություն։
3. Հնարավո՞ր է արդյոք պարզեցնել պատասխանը՝ A1/A2 մակարդակում բանավոր խոսքը հեշտացնելու համար։
4. Ինչպե՞ս հարստացնել և բարելավել պատասխանը՝ իրական քննության ժամանակ ավելի բարձր միավոր ստանալու համար։

Պատասխանը վերադարձրու ԽՍՏԻՎ JSON ձևաչափով՝ համաձայն տրված սխեմայի։ Բոլոր բացատրությունները պետք է լինեն հայերենով։`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Գնահատիր ուսանողի պատասխանը։",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hasErrors: {
              type: Type.BOOLEAN,
              description: "True, եթե ուսանողի պատասխանում կան քերականական, ուղղագրական կամ շարահյուսական սխալներ։"
            },
            errors: {
              type: Type.STRING,
              description: "Սխալների նկարագրությունը հայերենով և բացատրություն, թե ինչպես դրանք ուղղել։ Եթե սխալներ չկան, գրիր 'Սխալներ չեն հայտնաբերվել'։"
            },
            wordUsage: {
              type: Type.STRING,
              description: "Բառապաշարի, օգտագործված բառերի և նախդիրների վերլուծություն հայերենով։"
            },
            simplification: {
              type: Type.STRING,
              description: "Իսպաներենով պատասխանի այլընտրանքային պարզեցված տարբերակ՝ հակիրճ հայերեն բացատրությամբ։"
            },
            improvements: {
              type: Type.STRING,
              description: "Պատասխանը բարելավելու խորհուրդներ բանավոր քննության համար՝ իսպաներեն արտահայտությունների օրինակներով և հայերեն բացատրություններով։"
            },
            correctAnswer: {
              type: Type.STRING,
              description: "Լիովին իդեալական/ուղղված պատասխանի տարբերակը իսպաներենով։"
            }
          },
          required: ["hasErrors", "errors", "wordUsage", "simplification", "improvements", "correctAnswer"]
        }
      }
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text));
  } catch (err: any) {
    console.error("Error checking answer:", err);
    res.status(500).json({ error: err.message || "Չհաջողվեց ստուգել պատասխանը ԻԱ-ի միջոցով։" });
  }
});

// Endpoint to generate 10 similar questions
app.post("/api/generate-similar", async (req: Request, res: Response): Promise<void> => {
  try {
    const { pregunta, traduccionPregunta, respuestaModelo, traduccionRespuesta, tema, nivel } = req.body;

    if (!pregunta) {
      res.status(400).json({ error: "Սկզբնական հարցը պարտադիր է։" });
      return;
    }

    const systemPrompt = `Դու իսպաներենի քննական նյութերի ստեղծող ես (A1-A2 մակարդակ)։
Հիմնվելով տրամադրված հարցի օրինակի վրա, որի թեման է՝ "${tema || "իսպաներեն"}", ստեղծիր ուղիղ 10 նմանատիպ բանավոր քննական հարց նույն թեմայով։

Սկզբնական հարց՝ "${pregunta}"
Սկզբնական հարցի թարգմանությունը հայերեն՝ "${traduccionPregunta || ""}"
Պատասխանի օրինակ՝ "${respuestaModelo || ""}"
Պատասխանի թարգմանությունը հայերեն՝ "${traduccionRespuesta || ""}"

Յուրաքանչյուր 10 նոր հարցի համար տրամադրիր՝
1. Հարց իսպաներենով (pregunta)։ Բարդության մակարդակը՝ A1-A2, կենդանի և խոսակցական։
2. Թարգմանություն հայերենով (traduccionPregunta)՝ պրոֆեսիոնալ և ճշգրիտ։
3. Օրինակելի պատասխան իսպաներենով (respuestaModelo)՝ պարզ, բնական, համապատասխան A1-A2 մակարդակին։
4. Օրինակելի պատասխանի թարգմանություն հայերենով (traduccionRespuesta)։
5. 3 կարևոր բառ բառարանից՝ իրենց թարգմանություններով հետևյալ ձևաչափով՝ 'բառ1 (թարգմանություն), բառ2 (թարգմանություն), բառ3 (թարգմանություն)'։ Անվանիր սա "palabrasImportantes"։
6. Հարցի թեման (tema)՝ պետք է համընկնի կամ շատ մոտ լինի "${tema || "ընդհանուր"}" թեմային։
7. Բարդության մակարդակը (nivel)՝ նշիր "${nivel || "A1"}" կամ "A2" կախված բարդությունից։

Պատասխանը վերադարձրու ԽՍՏԻՎ զանգվածի տեսքով, որը բաղկացած է 10 JSON օբյեկտներից՝ համաձայն տրված սխեմայի։`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Ստեղծիր իսպաներենով 10 բանավոր հարցեր։",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              pregunta: {
                type: Type.STRING,
                description: "Նմանատիպ հարց իսպաներենով։"
              },
              traduccionPregunta: {
                type: Type.STRING,
                description: "Այդ հարցի թարգմանությունը հայերենով։"
              },
              respuestaModelo: {
                type: Type.STRING,
                description: "Օրինակելի պատասխան իսպաներենով։"
              },
              traduccionRespuesta: {
                type: Type.STRING,
                description: "Օրինակելի պատասխանի թարգմանությունը հայերենով։"
              },
              palabrasImportantes: {
                type: Type.STRING,
                description: "3 կարևոր բառ՝ թարգմանությունները փակագծերում, օրինակ՝ 'viajar (ճանապարհորդել), la maleta (ճամպրուկ), la ropa (հագուստ)'"
              },
              tema: {
                type: Type.STRING,
                description: "Հարցի թեման։"
              },
              nivel: {
                type: Type.STRING,
                description: "Բարդության մակարդակը (A1 կամ A2)։"
              }
            },
            required: ["pregunta", "traduccionPregunta", "respuestaModelo", "traduccionRespuesta", "palabrasImportantes", "tema", "nivel"]
          }
        }
      }
    });

    const text = response.text || "[]";
    res.json(JSON.parse(text));
  } catch (err: any) {
    console.error("Error generating similar questions:", err);
    res.status(500).json({ error: err.message || "Չհաջողվեց ստեղծել նմանատիպ հարցեր։" });
  }
});

// Setup Vite Dev server middleware or static serve for production
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

bootstrap();
