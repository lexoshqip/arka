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

## Deployment (Cloudflare R2)

```bash
node generate-manifest.mjs
# pastaj upload i gjithë folderit në R2 bucket: lexoshqip-library
```

## Lidhja me web-in

```bash
cd ../Website
npm run build:content   # lexon Library/ dhe gjeneron public/api/
```

## Repo të lidhura

| Repo | Përshkrim |
|---|---|
| [lexoshqip-web](https://github.com/lexoshqip/web) | Aplikacioni web + pipeline |
| [lexoshqip-free-library](https://github.com/lexoshqip/free-library) | Vepra të lira online |
