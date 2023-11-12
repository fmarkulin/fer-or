# Kolegij Otvoreno računarstvo

Repozitorij za laboratorijske vježbe

## Autor

Fran Markulin

## Verzija skupa

1.0

## Jezik skupa

engleski

## Datum objave

2023-10-31

## Format datuma

ISO 8601

## Područje podataka

Knjige i njihovi autori

## Parametri knjiga

- `number_of_pages` - broj stranica
- `title` - naslov
- `publish_date` - datum izdavanja
- `publishers` - izdavači
- `last_modified` - datum i vrijeme zadnje izmjene
- `type` - tip zapisa (izdanje)
- `revision` - broj izdanja
- `latest_revision` - zadnje izdanje
- `authors` - popis autora
- `key` - jedinstveni ključ
- `subjects` - subjekti knjige

## Parametri autora

- `type` - tip zapisa (autor)
- `name` - ime
- `last_modified` - datum i vrijeme zadnje izmjene
- `revision` - broj revizije
- `key` - jedinstveni ključ

## Broj zapisa

- Knjiga: 10
- Autora: 10

## Izvor podataka

[Open Library](https://openlibrary.org/)

## Licencija

[CC0 1.0 DEED](https://creativecommons.org/publicdomain/zero/1.0/)

## Opis

Razvijena je web-aplikacija za prikaz skupa podataka koja omogućuje skidanje cijelog skupa podataka, vizualni prikaz skupa podataka u obliku tablice, filtriranje skupa podataka te skidanje filtriranog skupa podataka.

Lokalno pokretanje aplikacije moguće je praćenjem sljedećih koraka:
-klonirati repozitorij
-pokrenuti naredbu `npm install` kako bi se instalirali svi potrebni paketi za rad skripti
-pokrenuti naredbu `npm run build` i pričekati da se izgrade sve potrebne datoteke
-pokrenuti naredbu `npm run start` i pričekati da se aplikacija pokrene

Ukoliko korisnik želi zaobići instalaciju paketa na svoje računalo, dovoljno je instalirati docker te skinuti datoteku `docker-compose.yml`. Aplikaciju je zatim moguće pokrenuti naredbom `docker-compose up` u direktoriju u kojem se nalazi datoteka `docker-compose.yml`.

U direktoriju `import` vidljivi su originalni podaci koji su ručno očišćeni i pripremljeni te skriptom `import.js` strojno učitani u bazu podataka _Firestore_.

_Firestore_ je NoSQL vrsta baze u sklopu platforme _Firebase_ tvrtke _Google_ te nije sadržana unutar _docker_ slike već se nalazi u _oblaku_ na platformi _Firebase_.
