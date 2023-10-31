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
Skripte za izvoz pisane su u programskom jeziku Typescript te su strojno prevedene u programski jezik Javascript.

Skripte je moguće pokrenuti naredbom npr. `node exportJson.js` što će stvoriti izvoz u datoteku `books.json`. Analogno i za CSV.

Prije pokretanja skripti potrebno je klonirati repozitorij, pokrenuti naredbu `npm install` kako bi se instalirali svi potrebni paketi za rad skripti.

Ukoliko korisnik želi zaobići instalaciju paketa na svoje računalo, dovoljno je instalirati docker te skinuti datoteke: `docker_compose.yml`, `dobij_csv.bat` i `dobij_json.bat`

Do podataka je zatim moguće doći ovim slijedom:
- pozicioniranje u direktorij gdje su gore navedene datoteke
- pokretanje naredbe `docker compose up -d`
- pokretanje skripte `dobij_csv.bat` što će stvoriti izvoz u datoteci `novi_csv.csv`
- pokretanje skripte `dobij_json.bat` što će stvoriti izvoz u datoteci `novi_json.json`

U direktoriju `import` vidljivi su originalni podaci koji su ručno očišćeni i pripremljeni te skriptom `import.js` strojno učitani u bazu podataka *Firestore*.

*Firestore* je NoSQL vrsta baze u sklopu platforme *Firebase* tvrtke *Google* te nije sadržana unutar *docker* slike već se nalazi u *oblaku* na platformi *Firebase*. 