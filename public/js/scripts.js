document.addEventListener("DOMContentLoaded", function () {
  const postList = document.querySelector(".posts ul");

  // Функция для анимации появления новых сообщений
  function animateNewPost(post) {
    post.style.opacity = 0; // Начальное состояние
    post.style.transition = "opacity 0.5s ease-in";
    post.style.opacity = 1; // Конечное состояние
  }

  // Добавление обработчика для формы
  const form = document.querySelector(".post-form form");
  form.addEventListener("submit", function (event) {
    setTimeout(function () {
      const newPost = postList.lastElementChild;
      if (newPost) {
        animateNewPost(newPost);
      }
    }, 100);
  });
});
