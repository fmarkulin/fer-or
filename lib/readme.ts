const readme: Readme[] = [
  {
    title: "Autor",
    content: "Fran Markulin",
  },
  {
    title: "Verzija skupa",
    content: "1.0",
  },
  {
    title: "Jezik skupa",
    content: "Engleski",
  },
  {
    title: "Datum objave",
    content: "2023-10-31",
  },
  {
    title: "Format datuma",
    content: "ISO 8601",
  },
  {
    title: "Područje podataka",
    content: "Knjige i njihovi autori",
  },

  {
    title: "Izvor podataka",
    content: "Open Library",
    link: "https://openlibrary.org/",
  },
  {
    title: "Licencija",
    content: "CC0 1.0 DEED",
    link: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    title: "Parametri knjiga",
    list: [
      {
        key: "number_of_pages",
        value: "broj stranica",
      },
      {
        key: "title",
        value: "naslov",
      },
      {
        key: "publish_date",
        value: "datum izdavanja",
      },
      {
        key: "publishers",
        value: "izdavači",
      },
      {
        key: "last_modified",
        value: "datum i vrijeme zadnje izmjene",
      },
      {
        key: "type",
        value: "tip zapisa (izdanje)",
      },
      {
        key: "revision",
        value: "broj izdanja",
      },
      {
        key: "latest_revision",
        value: "zadnje izdanje",
      },
      {
        key: "authors",
        value: "popis autora",
      },
      {
        key: "key",
        value: "jedinstveni ključ",
      },
      {
        key: "subjects",
        value: "subjekti knjige",
      },
    ],
  },
  {
    title: "Parametri autora",
    list: [
      {
        key: "type",
        value: "tip zapisa (autor)",
      },
      {
        key: "name",
        value: "ime",
      },
      {
        key: "last_modified",
        value: "datum i vrijeme zadnje izmjene",
      },
      {
        key: "revision",
        value: "broj revizije",
      },
      {
        key: "key",
        value: "jedinstveni ključ",
      },
    ],
  },
  {
    title: "Broj zapisa",
    list: [
      {
        key: "Knjiga",
        value: 10,
      },
      {
        key: "Autora",
        value: 10,
      },
    ],
  },
];

export default readme;
