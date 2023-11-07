# **Бэкенд Movies Explorer - API**
___
### О чём этот проект:
Проект Movies Explorer - это дипломный проект, завершающий обучение на платформе Яндекс.Практикум. Проект представляет собой страницу с регистрацией и авторизацией, где можно просматривать фильмы и добавлять в избранное.
В данном репозитории - API для проекта.

## Стек технологий:
- JavaScript:
  - Промисы (Promise);
  - Асинхронность и оптимизация;
  - Rest API;
- Node.js;
- Express;
- MongoDB;
- Сelebrate;
- Winston.

## Функционал:
- Роуты для пользователей:
  - GET /users/me — возвращает информацию о пользователе;
  - PATCH /users/me — обновляет информацию о пользователе.

- Роуты для фильмов:
  - GET /movies — возвращает все фильмы из базы;
  - POST /movies — создаёт фильм с переданными в теле запроса country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU и nameEN;
  - DELETE /movies/:movieId — удаляет фильм по _id.
___
## Запуск проекта
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Чеклист Дипломной работы:
- [Критерии диплома веб-разработчика](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html#backend)

___
## Ссылки
###### API сервиса - https://api.moview.students.nomoreparties.co
###### IP - 51.250.66.186
