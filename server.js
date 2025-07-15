const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/contato", (req, res) => {
   res.sendFile(path.join(__dirname, "views", "contato.html"));
});

app.post("/contato", (req, res) => {
   const { nome, email, assunto, mensagem } = req.body;
   if (!nome || !email || !assunto || !mensagem) {
      return res.status(400).sendFile(path.join(__dirname, "public", "400.html"));
   }
   res.send(`
       <html>
            <head>
                 <title>Contato Recebido - DevBurger</title>
                 <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
            </head>
            <body class="bg-amber-50 min-h-screen flex flex-col items-center justify-center">
              <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 class="text-4xl font-extrabold text-center text-amber-600 mb-8">Contato Recebido</h1>
                <p class="text-center text-amber-600 mb-4">Obrigado, ${nome}! Sua mensagem foi recebida.</p>
                <p><span class="font-semibold">Email:</span> ${email}</p>
                <p><span class="font-semibold">Assunto:</span> ${assunto}</p>
                <p><span class="font-semibold">Mensagem:</span> ${mensagem}</p>
                <div class="flex justify-center mt-6">
                  <a href="/" class="bg-amber-600 text-white font-semibold py-2 px-4 rounded hover:bg-amber-700 transition">Voltar</a>
                </div>
              </div>
            </body>
        </html>`);
});

app.get("/sugestao", (req, res) => {
   const { nome, ingredientes } = req.query;
   if (nome && ingredientes) {
      res.send(`
        <html>
            <head>
                 <title>Sugestão Recebida - DevBurger</title>
                   <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
            </head>
            <body class="bg-amber-50 min-h-screen flex flex-col items-center justify-center">
              <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 class="text-4xl font-extrabold text-center text-amber-600 mb-8">Sugestão Recebida</h1>
                <p class="text-center text-amber-600 mb-4">Obrigado por enviar a sua sugestão de lanche! O lanche "${nome}" com os ingredientes "${ingredientes}" foi recebido.</p>
                <div class="flex justify-center mt-6">
                  <a href="/" class="bg-amber-600 text-white font-semibold py-2 px-4 rounded hover:bg-amber-700 transition">Voltar</a>
                </div>
              </div>
            </body>
        </html>`);
   } else {
      res.status(400).sendFile(path.join(__dirname, "public", "400.html"));
   }
});

app.get("/api/lanches", (req, res) => {
   res.json(require("./public/data/lanches.json"));
});

app.use((req, res) => {
   res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
   console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
