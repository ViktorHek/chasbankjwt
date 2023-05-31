# My Sql

Jag vill helst inte betala för att skapa en mySql databas så jag tänker att jag ger en teoretisk förklaring istället. Jag är medveten om att det är mitt fel att jag inte skickade in uppgiften i tid så om jag behöver skaffa en riktig databas så gör jag det.

## förklaring 

1. ladda ner MySql Workbench. klicka på knappen "create connection"
2. Sen väljer man namn, host, användare och password. som host skulle jag valt localhost, användare skulle vara root och lösenord skulle vara password. Namnet spelar ingen större roll som jag förstår det.
3. I filen index.js på rad 14 så har jag skapat en MySql connection där host, användare och password matchar med det jag skrev ovan.
4. Sen går man in på MySql Workbench och skapar en Schema med två tabeller, en som heter users och en som heter accounts.
5. Som columner i users så skulle jag ha userId (som primary key), userName & password. som columner i accounts skulle jag ha userId (som primary key) och amount.
6. Efter det borde allt fungera som det ska.

PS. den utkommenterade koden är from JTW.