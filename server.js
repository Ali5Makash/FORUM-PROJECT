const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// Подключение к базе данных
const db = new sqlite3.Database(":memory:"); // Или файл базы данных

// Настройка middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public")); // Подключение статической папки
app.set("view engine", "ejs");

// Массив для хранения сообщений (вместо базы данных для простоты)
let posts = [];

// Главная страница
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Обработка отправки сообщения
app.post("/submit", (req, res) => {
  const content = req.body.content;
  const id = posts.length + 1; // Генерация ID для сообщения
  posts.push({ id, content });
  res.redirect("/");
});

// Обработка удаления сообщения
app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== id);
  res.redirect("/");
});

// Обработка редактирования сообщения
app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  res.render("edit", { post });
});

// Обработка обновления сообщения
app.post("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedContent = req.body.content;
  const post = posts.find((post) => post.id === id);
  post.content = updatedContent;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
