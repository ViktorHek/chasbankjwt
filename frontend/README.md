# Skapa en Banksajt med jwt

I dagens uppgift ska vi öva på inloggning med jwt - Json Web Token genom att
skapa en banksajt. I bankens backend finns två arrayer: En array `users` för användare
och en array `accounts` för bankkonton. Varje användare har ett id, ett användarnamn och ett
lösenord. Varje bankkonto har ett id, ett användarid och ett saldo.

Banken har endast en sida på sin sajt. Där kan man skapa nya användare och logga in
för att se sitt saldo på kontot. När man loggar in ska man se en knapp där det står
visa saldo. När man tycker på knappen ska man se saldot på samma sida.

När man skapar en användare anger man användarnamn, lösenord och saldo. I backend skapas
då en användare som läggs till i `users` och ett bankkonto med det angivana salodot som läggs till i `accounts`.

## Sätt upp projektet

1. Öppna en terminal och gå med `cd` där du vill skapa projektet.
2. Skapa där en folder: bankjwt och gå med `cd` in i foldern.

### Skapa frontend

1. Skriv `npm create vite@latest frontend -- --template react`.
2. Gå in i projektet: `cd frontend`.
3. Installera dependencies: `npm install`.

### Skapa backend

1. Backa en nivå med `cd ..`.
1. Skapa en folder: backend och gå med `cd` in i foldern.
2. Skriv `npm init` och tryck Enter på alla frågor.
3. Lägg till `"type": "module"`i package.json
4. I scripts i package.json lägg till: `"start": "nodemon server.js"`
5. Installera dependencies: `npm i express body-parser jsonwebtoken`
6. Börja skriva kod i `server.js`

## Hur du klarar uppgiften

1. I backend skapa två tomma arrayer: `users` och `accounts`.
2. Skapa endpoints för:

- Skapa användare (POST): "/users"
- Logga in (POST): "/sessions"
- Visa salodo (GET): "/me/accounts"

3. När man loggar in ska en jwt-token skapas och skickas tillbaka i response.
4. När man hämtar saldot ska samma jwt-token skickas med i Authorize header.
5. I backened ska denna token valideras via middleware.

## Hur du lämnar in

1. Skapa ett repo på github.
2. Ladd up dina filer till github:

```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin <Adressen till ditt repo>
git push -u origin main
```

3. Klicka på uppgiften i canvas och ange länken till ditt repo.

---

### :boom: Success!

Efter denna uppgift ska ni kunna skapa ett api med inloggning via jwt.

---

### :runner: Extrauppgifter

Klar? Här är lite mer att göra:

1. Gör det möjligt för användaren att kunna sätta in och ta ut pengar.
2. Dela up sajten i fler sidor med react router. En sida för inloggning,
   en för registrering och en för att visa saldo.