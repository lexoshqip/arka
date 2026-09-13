# LexoShqip — Library

Koleksioni kryesor i letërsisë shqipe në **domain publik** — autorë të vdekur 70+ vjet, të verifikuar juridikisht. Burimi i të dhënave për të gjithë platformën LexoShqip.

## Struktura

```
Library/
├── epochs.json          # epokat letrare
├── collections.json     # koleksionet tematike
├── featured.json        # konfigurimi i faqes kryesore
└── authors/
    └── <author-id>/
        ├── author.json
        ├── photo.jpg
        └── books/
            └── <book-id>/
                ├── book.json
                ├── book.pdf   (ose text.md / book.epub)
                └── cover.jpg
```

## Si shtohet një vepër

1. Krijo folderin `authors/<author-id>/books/<book-id>/`
2. Shto `book.json` me metadata dhe `rights`
3. Vendos skedarin (`book.pdf` / `text.md` / `book.epub`) nëse e ke
4. Cakto `availability: "full"` nëse ka skedar, `"metadata-only"` nëse jo

```jsonc
{
  "title": "Meshari",
  "epochId": "e-vjeter",
  "publicationYear": 1555,
  "synopsis": "...",
  "language": "sq",
  "accessType": "full",
  "channel": "main",
  "availability": "full",
  "rights": {
    "license": "public-domain",
    "verification": "juridical",
    "notes": "Autori vdiq në 1579."
  }
}
```

## Modeli i të drejtave

| `rights.license` | Kuptimi |
|---|---|
| `public-domain` | Domain publik |
| `cc-by` / `cc-by-sa` | Licencë Creative Commons |
| `unknown` | Për t'u verifikuar |

| `rights.verification` | Kuptimi |
|---|---|
| `juridical` | Verifikuar juridikisht |
| `source-declared` | Sipas burimit |
| `pending` | Në shqyrtim — vepra nuk publikohet |

## Deployment (Backblaze B2)

Çdo push në `main` sync automatikisht përmbajtjen në B2 bucket `lexoshqip-arka`.

Para push, gjeneroni `catalog.json`:

```bash
cd ../web
node scripts/generate-catalog.mjs ../arka
```

`catalog.json` është skedari që web app shkarkon gjatë build-it (1 request në vend të 300+).

## Lidhja me web-in

```bash
cd ../web
npm run dev                # lexon catalog.json nga B2, shërben përmbajtjen përmes S3 proxy
npm run generate:catalog   # gjeneron catalog.json për të gjitha libraritë
```

## Repo të lidhura

| Repo | Përshkrim |
|---|---|
| [lexoshqip-web](https://github.com/lexoshqip/web) | Aplikacioni web + pipeline |
| [lexoshqip-free-library](https://github.com/lexoshqip/free-library) | Vepra të lira online |
