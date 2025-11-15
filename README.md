# izp-webinar-nodejs

# Zahtevi

- Node.js v14 ili noviji
- Mongodb v4 ili noviji

## Node.js
- Instalacija
  - Ubuntu
        curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
        sudo apt-get install -y nodejs
  - Windows
    - <https://nodejs.org/en/download/>

- Instalacija NVM
    - Ubuntu
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
            source ~/.bashrc
            ili
            wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
            source ~/.bashrc

            nvm --version

            nvm install --lts

            node -v
    - Windows
        - https://github.com/coreybutler/nvm-windows

- Osnovne NVM komande
    - Instalacija najnovije verzije

        nvm install node

    - Instalacija specifične verzije

        nvm install 18.17.0

    - Listanje instaliranih verzija

        nvm list

    - Korišćenje specifične verzije

        nvm use 18.17.0

    - Postavljanje default verzije

        nvm alias default 18.17.0

    - Provera trenutne verzije

        node --version
        npm --version

## Mongodb

- Instalacija
  - Ubuntu

        sudo apt update
        sudo apt install -y mongodb

  - Windows
    - <https://www.mongodb.com/try/download/community>.

- Startovanje Mongodb
  - Ubuntu

        sudo systemctl start mongodb
  - Windows
    - Pokrenuti "MongoDB

- Proveriti da li je sve pokrenuto

    sudo systemctl status mongod

- Pristupanje mongo shell-u

    mongosh

- Kreiranje baze podataka

    use blog-api

## Instalacija neophodnih paketa

    npm install

# Env fajl
Kreirati .env fajl u root direktorijumu projekta sa sledećim sadržajem:

    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/blog-api
    NODE_ENV=development

# Startovanje dev okruzenja

    npm run dev

# Startovanje produkcionog okruzenja

    npm start

# Testiranje API-ja

- Korišćenje Postman-a ili sličnog alata

- CURL

# 1. Kreiraj članak

curl -X POST <http://localhost:5000/api/articles> \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Uvod u Node.js",
    "content": "Node.js je moćan runtime za server-side JavaScript...",
    "author": "Marko Marković",
    "tags": ["nodejs", "javascript"],
    "published": true
  }'

# 2. Dobavi sve članke

curl <http://localhost:5000/api/articles>

# 3. Paginacija

curl "<http://localhost:5000/api/articles?page=1&limit=5>"

# 4. Filter po autoru

curl "<http://localhost:5000/api/articles?author=Marko%20Marković>"

# 5. Pretraga

curl "<http://localhost:5000/api/articles?search=Node.js>"

# 6. Samo objavljeni

curl "<http://localhost:5000/api/articles?published=true>"

# 7. Filter po tag-u

curl "<http://localhost:5000/api/articles?tag=nodejs>"
