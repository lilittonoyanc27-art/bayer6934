import { Question } from "./types";

export const PRESET_THEMES = [
  "familia",
  "ropa",
  "casa",
  "comida",
  "viajes",
  "transporte",
  "tiempo",
  "números",
  "profesiones",
  "colores",
  "cuerpo",
  "deportes",
  "rutina diaria",
  "teléfono",
  "documentos",
  "países",
  "meses y días",
  "preposiciones",
  "verbos básicos"
];

export const PRESET_QUESTIONS: Question[] = [
  {
    id: "preset-1",
    pregunta: "¿Quién es la madre de tu padre?",
    traduccionPregunta: "Ո՞վ է քո հոր մայրը։",
    respuestaModelo: "La madre de mi padre es mi abuela.",
    traduccionRespuesta: "Հորս մայրը իմ տատիկն է։",
    palabrasImportantes: "la madre (մայր), el padre (հայր), la abuela (տատիկ)",
    tema: "familia",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Es mi abuela.",
        traduccion: "Նա իմ տատիկն է։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "La madre de mi padre es mi abuela.",
        traduccion: "Հորս մայրը իմ տատիկն է։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "La madre de mi padre es mi abuela paterna, tiene setenta años.",
        traduccion: "Հորս մայրը իմ հայրական տատիկն է, նա յոթանասուն տարեկան է։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-2",
    pregunta: "¿Qué ropa llevas hoy?",
    traduccionPregunta: "Ի՞նչ հագուստ ես կրում այսօր։",
    respuestaModelo: "Hoy llevo unos vaqueros azules y una camiseta blanca.",
    traduccionRespuesta: "Այսօր ես կրում եմ կապույտ ջինսեր և սպիտակ շապիկ։",
    palabrasImportantes: "llevar (կրել/հագնել), la ropa (հագուստ), los vaqueros (ջինսեր)",
    tema: "ropa",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Llevo vaqueros y camiseta.",
        traduccion: "Կրում եմ ջինսեր և շապիկ։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Hoy llevo unos vaqueros azules y una camiseta blanca.",
        traduccion: "Այսօր ես կրում եմ կապույտ ջինսեր և սպիտակ շապիկ։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Hoy llevo ropa muy cómoda: vaqueros oscuros, una sudadera gris y zapatillas deportivas.",
        traduccion: "Այսօր ես շատ հարմարավետ հագուստ եմ կրում՝ մուգ ջինսեր, մոխրագույն սվիտեր և մարզակոշիկներ։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-3",
    pregunta: "¿Qué hay en el salón?",
    traduccionPregunta: "Ի՞նչ կա հյուրասենյակում։",
    respuestaModelo: "En el salón hay un sofá cómodo, una mesa pequeña y una televisión grande.",
    traduccionRespuesta: "Հյուրասենյակում կա հարմարավետ բազմոց, փոքր սեղան և մեծ հեռուստացույց։",
    palabrasImportantes: "el salón (հյուրասենյակ), el sofá (բազմոց), haber (կա / կան)",
    tema: "casa",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Hay un sofá y una televisión.",
        traduccion: "Կա բազմոց և հեռուստացույց։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "En el salón hay un sofá cómodo, una mesa pequeña y una televisión grande.",
        traduccion: "Հյուրասենյակում կա հարմարավետ բազմոց, փոքր սեղան և մեծ հեռուստացույց։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "En mi salón hay un sofá de color marrón, una mesa de madera y muchas plantas cerca de la ventana.",
        traduccion: "Իմ հյուրասենյակում կա դարչնագույն բազմոց, փայտե սեղան և շատ բույսեր պատուհանի մոտ։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-4",
    pregunta: "¿Qué hay en un dormitorio?",
    traduccionPregunta: "Ի՞նչ կա ննջասենյակում։",
    respuestaModelo: "En un dormitorio hay una cama grande, un armario para la ropa и una lámpara.",
    traduccionRespuesta: "Ննջասենյակում կա մեծ մահճակալ, հագուստի պահարան և լամպ։",
    palabrasImportantes: "el dormitorio (ննջասենյակ), la cama (մահճակալ), el armario (պահարան)",
    tema: "casa",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Hay una cama y un armario.",
        traduccion: "Կա մահճակալ և պահարան։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "En un dormitorio hay una cama grande, un armario para la ropa y una lámpara encima de la mesita.",
        traduccion: "Ննջասենյակում կա մեծ մահճակալ, հագուստի պահարան և լամպ՝ սեղանիկի վրա։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Normalmente en un dormitorio hay una cama doble, dos mesitas de noche y un armario empotrado muy amplio.",
        traduccion: "Սովորաբար ննջասենյակում կա երկտեղանոց մահճակալ, երկու մահճակալի սեղանիկ և շատ ընդարձակ ներկառուցված պահարան։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-5",
    pregunta: "¿Cuál es tu comida favorita и por qué?",
    traduccionPregunta: "Ո՞րն է քո սիրելի ուտելիքը և ինչու՞։",
    respuestaModelo: "Mi comida favorita es la pasta con queso porque es muy deliciosa y fácil de preparar.",
    traduccionRespuesta: "Իմ սիրելի ուտելիքը պաստան է պանրով, որովհետև այն շատ համեղ է և հեշտ է պատրաստել։",
    palabrasImportantes: "la comida (ուտելիք), el queso (պանիր), deliciosa (համեղ)",
    tema: "comida",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Mi comida favorita es la pizza de pollo.",
        traduccion: "Իմ սիրելի ուտելիքը հավով պիցցան է։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Mi comida favorita es la pasta con queso porque es muy deliciosa y fácil de preparar.",
        traduccion: "Իմ սիրելի ուտելիքը պաստան է պանրով, որովհետև այն շատ համեղ է և հեշտ է պատրաստել։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Me fascina la comida italiana, especialmente los espaguetis carbonara porque me encanta el sabor del bacon con nata.",
        traduccion: "Ինձ գերում է իտալական խոհանոցը, հատկապես կարբոնարա սպագետին, որովհետև ես սիրում եմ սերուցքով բեկոնի համը։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-6",
    pregunta: "¿Qué necesitas para viajar?",
    traduccionPregunta: "Ի՞նչ է քեզ անհրաժեշտ ճանապարհորդելու համար։",
    respuestaModelo: "Para viajar necesito comprar el billete de avión y preparar mi maleta.",
    traduccionRespuesta: "Ճանապարհորդելու համար ինձ անհրաժեշտ է գնել ինքնաթիռի տոմս և պատրաստել իմ ճամպրուկը։",
    palabrasImportantes: "viajar (ճանապարհորդել), necesitar (կարիք ունենալ), la maleta (ճամպրուկ)",
    tema: "viajes",
    nivel: "A2",
    respuestasAlternativas: [
      {
        respuesta: "Necesito mi pasaporte y ropa.",
        traduccion: "Ինձ անհրաժեշտ է իմ անձնագիրը և հագուստ։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Para viajar necesito comprar el billete de avión y preparar mi maleta con ropa adecuada.",
        traduccion: "Ճանապարհորդելու համար ինձ անհրաժեշտ է գնել ինքնաթիռի տոմս և պատրաստել իմ ճամպրուկը համապատասխան հագուստով։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Antes de viajar, es imprescindible reservar el alojamiento, comprar los pasajes y verificar la vigencia de mi pasaporte.",
        traduccion: "Ճանապարհորդելուց առաջ անհրաժեշտ է ամրագրել կացարանը, գնել տոմսերը և ստուգել անձնագրի վավերականությունը։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-7",
    pregunta: "¿Cómo vas al trabajo o a la escuela habitualmente?",
    traduccionPregunta: "Ինչպե՞ս ես սովորաբար գնում աշխատանքի կամ դպրոց։",
    respuestaModelo: "Habitualmente voy en autobús porque es más barato y cómodo que ir en coche.",
    traduccionRespuesta: "Սովորաբար ես գնում եմ ավտոբուսով, որովհետև դա ավելի էժան է և հարմարավետ, քան մեքենայով գնալը։",
    palabrasImportantes: "el transporte (տրանսպորտ), el autobús (ավտոբուս), ir en coche (մեքենայով գնալ)",
    tema: "transporte",
    nivel: "A2",
    respuestasAlternativas: [
      {
        respuesta: "Voy a pie o en coche.",
        traduccion: "Գնում եմ ոտքով կամ մեքենայով։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Habitualmente voy en autobús porque es más barato y cómodo que ir en coche.",
        traduccion: "Սովորաբար ես գնում եմ ավտոբուսով, որովհետև դա ավելի էժան է և հարմարավետ, քան մեքենայով գնալը։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Suelo ir en metro porque el tráfico en las mañanas es terrible y así llego mucho más rápido.",
        traduccion: "Սովորաբար գնում եմ մետրոյով, որովհետև առավոտյան խցանումները սարսափելի են, և այդպես ես շատ ավելի արագ եմ տեղ հասնում։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-8",
    pregunta: "¿Qué tiempo hace hoy en tu ciudad?",
    traduccionPregunta: "Ինչպիսի՞ եղանակ է այսօր քո քաղաքում։",
    respuestaModelo: "Hoy hace buen tiempo, está soleado y hace bastante calor.",
    traduccionRespuesta: "Այսօր լավ եղանակ է, արևոտ է և բավականին տաք։",
    palabrasImportantes: "el tiempo (եղանակ / ժամանակ), soleado (արևոտ), hace calor (շոգ է)",
    tema: "tiempo",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Hoy hace sol y calor.",
        traduccion: "Այսօր արև է և տաք է։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Hoy hace buen tiempo, está soleado y hace bastante calor en la calle.",
        traduccion: "Այսօր լավ եղանակ է, արևոտ է և դրսում բավականին տաք է։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Hoy tenemos un día espléndido: hace calor, el cielo está completamente despejado y no corre viento.",
        traduccion: "Այսօր հիասքանչ օր ունենք՝ տաք է, երկինքը լիովին պարզ է և քամի չկա։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-9",
    pregunta: "¿Puedes contar de diez en diez hasta cien en español?",
    traduccionPregunta: "Կարո՞ղ ես իսպաներենով տասական հաշվել մինչև հարյուր։",
    respuestaModelo: "Sí, puedo hacerlo: diez, veinte, treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa y cien.",
    traduccionRespuesta: "Այո, կարող եմ անել՝ տասը, քսան, երեսուն, քառասուն, հիսուն, վաթսուն, յոթանասուն, ութսուն, իննսուն և հարյուր։",
    palabrasImportantes: "contar (հաշվել), diez (տասը), cien (հարյուր)",
    tema: "números",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Sí: diez, veinte, treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa, cien.",
        traduccion: "Այո՝ տասը, քսան, երեսուն, քառասուն, հիսուն, վաթսուն, յոթանասուն, ութսուն, իննսուն, հարյուր։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Por supuesto: diez, veinte, treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa y cien.",
        traduccion: "Իհարկե՝ տասը, քսան, երեսուն, քառասուն, հիսուն, վաթսուն, յոթանասուն, ութսուն, իննսուն և հարյուր։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Claro que sí, es muy fácil: diez, veinte, treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa y cien.",
        traduccion: "Միանշանակ, դա շատ հեշտ է՝ տասը, քսան, երեսուն, քառասուն, հիսուն, վաթսուն, յոթանասուն, ութսուն, իննսուն և հարյուր։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-10",
    pregunta: "¿Cuáles son las profesiones que conoces?",
    traduccionPregunta: "Ի՞նչ մասնագիտություններ գիտես։",
    respuestaModelo: "Conozco profesiones como médico, profesor, ingeniero, camarero y cocinero.",
    traduccionRespuesta: "Ես գիտեմ այնպիսի մասնագիտություններ, ինչպիսիք են բժիշկը, ուսուցիչը, ինժեները, մատուցողը և խոհարարը։",
    palabrasImportantes: "la profesión (մասնագիտություն), conocer (ճանաչել/իմանալ), el médico (բժիշկ)",
    tema: "profesiones",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Conozco profesor, médico y taxista.",
        traduccion: "Գիտեմ ուսուցիչ, բժիշկ և տաքսիստ։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Conozco profesiones como médico, profesor, ingeniero, camarero y cocinero.",
        traduccion: "Ես գիտեմ այնպիսի մասնագիտություններ, ինչպիսիք են բժիշկը, ուսուցիչը, ինժեները, մատուցողը և խոհարարը։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Dominar los nombres de profesiones es útil: conozco abogado, dentista, arquitecto, enfermero y programador.",
        traduccion: "Մասնագիտությունների անուններին տիրապետելը օգտակար է՝ ես գիտեմ փաստաբան, ատամնաբույժ, ճարտարապետ, բուժքույր և ծրագրավորող։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-11",
    pregunta: "¿Cuáles son los colores que conoces?",
    traduccionPregunta: "Որո՞նք են քո իմացած գույները։",
    respuestaModelo: "Conozco los colores rojo, verde, azul, amarillo, blanco, negro y gris.",
    traduccionRespuesta: "Ես գիտեմ կարմիր, կանաչ, կապույտ, դեղին, սպիտակ, սև և մոխրագույն գույները։",
    palabrasImportantes: "el color (գույն), amarillo (դեղին), rojo (կարմիր)",
    tema: "colores",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Conozco rojo, verde, azul y negro.",
        traduccion: "Գիտեմ կարմիր, կանաչ, կապույտ և սև։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Conozco los colores rojo, verde, azul, amarillo, blanco, negro, gris y marrón.",
        traduccion: "Ես գիտեմ կարմիր, կանաչ, կապույտ, դեղին, սպիտակ, սև, մոխրագույն և դարչնագույն գույները։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Conozco una gran variedad: desde los básicos como rojo y azul, hasta otros como rosa, violeta, naranja y dorado.",
        traduccion: "Ես գիտեմ մեծ բազմազանություն՝ հիմնական գույներից (ինչպիսիք են կարմիրն ու կապույտը) մինչև վարդագույն, մանուշակագույն, նարնջագույն և ոսկեգույն։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-12",
    pregunta: "¿Qué partes del cuerpo usas al jugar al fútbol?",
    traduccionPregunta: "Մարմնի ո՞ր մասերն ես օգտագործում ֆուտբոլ խաղալիս։",
    respuestaModelo: "Uso principalmente las piernas y los pies para correr y golpear el balón.",
    traduccionRespuesta: "Ես հիմնականում օգտագործում եմ ոտքերը և թաթերը վազելու և գնդակին հարվածելու համար։",
    palabrasImportantes: "el cuerpo (մարմին), las piernas (ոտքեր), el pie (ոտնաթաթ)",
    tema: "cuerpo",
    nivel: "A2",
    respuestasAlternativas: [
      {
        respuesta: "Uso las piernas y los pies.",
        traduccion: "Օգտագործում եմ ոտքերս ու թաթերս։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Uso principalmente las piernas y los pies para correr, saltar y golpear el balón.",
        traduccion: "Ես հիմնականում օգտագործում եմ ոտքերը և թաթերը վազելու, ցատկելու և գնդակին հարվածելու համար։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Para jugar al fútbol se usan los pies y las piernas, la cabeza para rematar, y solo el portero puede usar las manos.",
        traduccion: "Ֆուտբոլ խաղալու համար օգտագործվում են թաթերն ու ոտքերը, գլուխը՝ հարվածելու համար, և միայն դարպասապահը կարող է օգտագործել ձեռքերը։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-13",
    pregunta: "¿Haces algún deporte todas las semanas?",
    traduccionPregunta: "Զբաղվու՞մ ես արդյոք որևէ սպորտով ամեն շաբաթ։",
    respuestaModelo: "Sí, juego al tenis dos veces por semana con mi mejor amigo.",
    traduccionRespuesta: "Այո, ես շաբաթական երկու անգամ թենիս եմ խաղում իմ լավագույն ընկերոջ հետ։",
    palabrasImportantes: "el deporte (սպորտ), jugar al tenis (թենիս խաղալ), la semana (շաբաթ)",
    tema: "deportes",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Sí, corro por las mañanas.",
        traduccion: "Այո, վազում եմ առավոտյան։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Sí, juego al tenis dos veces por semana con mi mejor amigo del colegio.",
        traduccion: "Այո, ես շաբաթական երկու անգամ թենիս եմ խաղում դպրոցի իմ լավագույն ընկերոջ հետ։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Por supuesto, voy al gimnasio tres veces a la semana y los domingos practico natación en la piscina municipal.",
        traduccion: "Իհարկե, շաբաթական երեք անգամ գնում եմ մարզասրահ, իսկ կիրակի օրերին լողում եմ համայնքային լողավազանում։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-14",
    pregunta: "¿A qué hora sueles cenar?",
    traduccionPregunta: "Սովորաբար ժամը քանիսի՞ն ես ընթրում։",
    respuestaModelo: "Suelo cenar a las ocho de la noche con mi familia.",
    traduccionRespuesta: "Սովորաբար ես ընթրում եմ երեկոյան ժամը ութին իմ ընտանիքի հետ։",
    palabrasImportantes: "cenar (ընթրել), soler (սովորություն ունենալ), la hora (ժամ)",
    tema: "rutina diaria",
    nivel: "A2",
    respuestasAlternativas: [
      {
        respuesta: "Ceno a las nueve de la noche.",
        traduccion: "Ընթրում եմ երեկոյան ժամը իննին։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Normalmente suelo cenar a las ocho o nueve de la noche junto con mi familia.",
        traduccion: "Սովորաբար ես ընթրում եմ երեկոյան ժամը ութին կամ իննին իմ ընտանիքի հետ միասին։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Por lo general ceno bastante tarde, sobre las diez de la noche, después de regresar de mis clases de español.",
        traduccion: "Ընդհանրապես ընթրում եմ բավականին ուշ՝ երեկոյան ժամը տասի սահմաններում, իսպաներենի դասերից վերադառնալուց հետո։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-15",
    pregunta: "¿Qué haces con tu teléfono?",
    traduccionPregunta: "Ի՞նչ ես անում քո հեռախոսով։",
    respuestaModelo: "Uso mi teléfono para llamar a mis amigos и escuchar música.",
    traduccionRespuesta: "Ես օգտագործում եմ հեռախոսս ընկերներիս զանգահարելու և երաժշտություն լսելու համար։",
    palabrasImportantes: "el teléfono (հեռախոս), llamar (զանգել), enviar (ուղարկել)",
    tema: "teléfono",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Hablo con mis amigos y juego.",
        traduccion: "Խոսում եմ ընկերներիս հետ և խաղում։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Uso mi teléfono para llamar a mis amigos, enviar mensajes de texto y escuchar música.",
        traduccion: "Ես օգտագործում եմ հեռախոսս ընկերներիս զանգահարելու, հաղորդագրություններ ուղարկելու և երաժշտություն լսելու համար։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Principalmente reviso mis redes sociales, leo las noticias y utilizo aplicaciones para estudiar idiomas y chatear.",
        traduccion: "Հիմնականում ստուգում եմ սոցիալական ցանցերս, կարդում եմ նորությունները և օգտագործում եմ հավելվածներ լեզուներ սովորելու և զրուցելու համար։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-16",
    pregunta: "¿Qué documentos son obligatorios para cruzar la frontera?",
    traduccionPregunta: "Ի՞նչ փաստաթղթեր են պարտադիր սահմանը հատելու համար։",
    respuestaModelo: "Es obligatorio tener un pasaporte válido para viajar.",
    traduccionRespuesta: "Պարտադիր է ունենալ վավեր անձնագիր ճանապարհորդելու համար։",
    palabrasImportantes: "el pasaporte (անձնագիր), el documento (փաստաթուղթ), cruzar (հատել)",
    tema: "documentos",
    nivel: "A2",
    respuestasAlternativas: [
      {
        respuesta: "Necesitas tener un pasaporte.",
        traduccion: "Ձեզ անհրաժեշտ է ունենալ անձնագիր։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Es obligatorio tener un pasaporte válido y, a veces, también un visado de viaje según el país.",
        traduccion: "Պարտադիր է ունենալ վավեր անձնագիր և, երբեմն, նաև ճանապարհորդական վիզա՝ կախված երկրից։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Para cruzar fronteras nacionales se requiere el pasaporte original vigente, billetes de avión y en ocasiones un seguro médico.",
        traduccion: "Պետական սահմանները հատելու համար պահանջվում է վավեր բնօրինակ անձնագիր, ինքնաթիռի տոմսեր և երբեմն բժշկական ապահովագրություն։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-17",
    pregunta: "¿En qué países se habla español como idioma oficial?",
    traduccionPregunta: "Ո՞ր երկրներում է իսպաներենը խոսվում որպես պաշտոնական լեզու։",
    respuestaModelo: "Se habla español en países como España, México y Colombia.",
    traduccionRespuesta: "Իսպաներեն խոսում են այնպիսի երկրներում, ինչպիսիք են Իսպանիան, Մեքսիկան և Կոլումբիան։",
    palabrasImportantes: "el país (երկիր), hablar (խոսել), el idioma (լեզու)",
    tema: "países",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Se habla español en España y Argentina.",
        traduccion: "Իսպաներեն խոսում են Իսպանիայում և Արգենտինայում։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Se habla español en países como España, México, Colombia, Argentina, Perú y Chile.",
        traduccion: "Իսպաներեն խոսում են այնպիսի երկրներում, ինչպիսիք են Իսպանիան, Մեքսիկան, Կոլումբիան, Արգենտինան, Պերուն և Չիլին։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "El español es el idioma oficial en más de veinte países, principalmente en América Latina y en España.",
        traduccion: "Իսպաներենը պաշտոնական լեզու է ավելի քան քսան երկրներում, հիմնականում Լատինական Ամերիկայում և Իսպանիայում։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-18",
    pregunta: "¿Cuáles son los doce meses del año?",
    traduccionPregunta: "Որո՞նք են տարվա տասներկու ամիսները։",
    respuestaModelo: "Los doce meses son enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre y diciembre.",
    traduccionRespuesta: "Տասներկու ամիսներն են՝ հունվար, փետրվար, մարտ, ապրիլ, մայիս, հունիս, հուլիս, օգոստոս, սեպտեմբեր, հոկտեմբեր, նոյեմբեր և դեկտեմբեր։",
    palabrasImportantes: "el mes (ամիս), el año (տարի), doce (տասներկու)",
    tema: "meses y días",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Son enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre.",
        traduccion: "Դրանք են՝ հունվար, փետրվար, մարտ, ապրիլ, մայիս, հունիս, հուլիս, օգոստոս, սեպտեմբեր, հոկտեմբեր, նոյեմբեր, դեկտեմբեր։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Los doce meses del año son enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre y diciembre.",
        traduccion: "Տարվա տասներկու ամիսներն են՝ հունվար, փետրվար, մարտ, ապրիլ, մայիս, հունիս, հուլիս, օգոստոս, սեպտեմբեր, հոկտեմբեր, նոյեմբեր և դեկտեմբեր։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "El año se compone de doce meses: empezando por enero y terminando con diciembre, pasando por las cuatro estaciones.",
        traduccion: "Տարին բաղկացած է տասներկու ամիսներից՝ սկսած հունվարից և ավարտված դեկտեմբերով, անցնելով չորս եղանակներով։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-19",
    pregunta: "¿Dónde están las llaves de la casa habitualmente?",
    traduccionPregunta: "Սովորաբար որտե՞ղ են գտնվում տան բանալիները։",
    respuestaModelo: "Las llaves suelen estar sobre la mesa de la entrada.",
    traduccionRespuesta: "Բանալիները սովորաբար գտնվում են մուտքի սեղանի վրա։",
    palabrasImportantes: "sobre (վրա/մասին), dentro de (ներսում), las llaves (բանալիներ)",
    tema: "preposiciones",
    nivel: "A2",
    respuestasAlternativas: [
      {
        respuesta: "Están en mi bolso o bolsillo.",
        traduccion: "Դրանք իմ պայուսակի կամ գրպանի մեջ են։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Las llaves de casa suelen estar sobre el mueble del pasillo o dentro de mi bolso principal.",
        traduccion: "Տան բանալիները սովորաբար գտնվում են միջանցքի կահույքի վրա կամ իմ հիմնական պայուսակի մեջ։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Casi siempre las dejo en el llavero que está colgado detrás de la puerta principal para no perderlas.",
        traduccion: "Գրեթե միշտ ես դրանք թողնում եմ մուտքի դռան հետևում կախված բանալիների կախիչի վրա, որպեսզի չկորցնեմ ։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  },
  {
    id: "preset-20",
    pregunta: "¿Qué quieres hacer este fin de semana?",
    traduccionPregunta: "Ի՞նչ ես ուզում անել այս հանգստյան օրերին։",
    respuestaModelo: "Quiero ir al parque y descansar mucho.",
    traduccionRespuesta: "Ես ուզում եմ գնալ այգի և շատ հանգստանալ։",
    palabrasImportantes: "querer (ուզենալ/սիրել), hacer (անել), descansar (հանգստանալ)",
    tema: "verbos básicos",
    nivel: "A1",
    respuestasAlternativas: [
      {
        respuesta: "Quiero dormir y ver películas.",
        traduccion: "Ուզում եմ քնել ու ֆիլմեր դիտել։",
        nivel: "Պարզ (A1)"
      },
      {
        respuesta: "Quiero ir al parque, leer un libro interesante y descansar mucho durante estos días.",
        traduccion: "Ես ուզում եմ գնալ այգի, կարդալ հետաքրքիր գիրք և շատ հանգստանալ այս օրերի ընթացքում։",
        nivel: "Մանրամասն (A2)"
      },
      {
        respuesta: "Este fin de semana me gustaría reunirme con algunos amigos para cenar y luego ver una obra de teatro.",
        traduccion: "Այս հանգստյան օրերին ես կցանկանայի հանդիպել մի քանի ընկերների հետ՝ ընթրելու և այնուհետև թատերական ներկայացում դիտելու համար։",
        nivel: "Բնական / Մակարդակ+"
      }
    ]
  }
];
