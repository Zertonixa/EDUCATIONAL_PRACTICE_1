# 1️⃣ Используем минимальный образ
FROM node:20-alpine AS builder

# 2️⃣ Устанавливаем pnpm
RUN npm install -g pnpm

# 3️⃣ Устанавливаем рабочую директорию
WORKDIR /usr/app/front

# 4️⃣ Копируем package.json и lock-файл (чтобы кешировать зависимости)
COPY package.json pnpm-lock.yaml ./

# 5️⃣ Устанавливаем зависимости (кешируется)
RUN pnpm install --frozen-lockfile

# 6️⃣ Копируем весь код, кроме node_modules (нужен .dockerignore)
COPY . .  

# 7️⃣ Запускаем билд фронта
RUN pnpm run build

# 8️⃣ Минимальный образ для продакшена
FROM node:20-alpine

WORKDIR /usr/app/front

# 9️⃣ Устанавливаем сервер для статики
RUN npm install -g serve

# 🔟 Копируем билд из builder-образа
COPY --from=builder /usr/app/front/build ./build

# 1️⃣1️⃣ Открываем порт 3000
EXPOSE 3000

# 1️⃣2️⃣ Запускаем сервер
CMD ["serve", "-s", "build"]
