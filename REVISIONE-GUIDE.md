# Revisione periodica delle guide

Obiettivo: tenere le guide aggiornate (Google premia i contenuti freschi e corretti)
senza "finti aggiornamenti". La data cambia **solo** quando cambia davvero il contenuto.

## Regola d'oro

Quando modifichi il contenuto di una guida (non un refuso o un link):

1. Aggiorna la riga visibile `Aggiornato: <mese> <anno>` nell'header della pagina.
2. Aggiorna `"dateModified"` nel blocco JSON-LD (formato `AAAA-MM-GG`).
3. Aggiorna `<lastmod>` della pagina in `sitemap.xml`.

Se hai solo corretto un refuso o aggiunto un link, **non** toccare le date.

## Calendario

| Quando | Pagine | Cosa controllare |
|---|---|---|
| **Gennaio** | `tassa-di-soggiorno-palermo.html`, `normativa-affitti-brevi-sicilia-2026.html`, `come-affittare-un-bnb-a-palermo.html` | Legge di Bilancio dell'anno (cedolare, soglia Partita IVA), nuove tariffe del Comune, calendario scadenze dell'anno. Valutare di creare `normativa-affitti-brevi-sicilia-<anno>.html` e collegarla dalla vecchia. |
| **Gennaio** | `eventi-palermo-prezzi-affitti-brevi.html` | Date di Pasqua e ponti dell'anno, aggiornare il titolo con i nuovi anni. |
| **Aprile** | `eventi-palermo-prezzi-affitti-brevi.html`, `airbnb-o-booking-palermo.html` | Programma del Festino di Santa Rosalia; commissioni e regole delle piattaforme. |
| **Luglio** | Tutte le guide | Revisione semestrale: dati, link funzionanti, FAQ, novità normative (decreti regionali, sentenze). |
| **Ottobre** | `eventi-palermo-prezzi-affitti-brevi.html`, `risultati-immobili-gestiti-palermo.html` | Natale/Capodanno; aggiornare i dati reali con la stagione estiva appena chiusa. |
| **Ogni trimestre** | `tassa-di-soggiorno-palermo.html` | Il calendario delle scadenze deve mostrare sempre le prossime 4-5 date. |

## Checklist per ogni revisione

- [ ] Tariffe, percentuali e date ancora corrette (fonti: Comune di Palermo / portale IDS, Regione Siciliana, Agenzia delle Entrate, centri assistenza Airbnb e Booking).
- [ ] Il titolo (`<title>`) e l'`<h1>` contengono l'anno giusto, se lo citano.
- [ ] Le FAQ nel JSON-LD coincidono con quelle visibili nella pagina.
- [ ] I link interni funzionano e puntano alle guide più recenti.
- [ ] Una nuova guida va aggiunta anche a: `guide-affitti-brevi-palermo.html` (scheda + ItemList), sottomenu "Guide" in `index.html`, `sitemap.xml`, blocchi "Approfondisci" delle guide correlate.

## Pagina "Risultati reali" (bozza)

`risultati-immobili-gestiti-palermo.html` è in `noindex` e non è collegata dal sito
finché i campi `[DA COMPILARE]` non sono riempiti. Per pubblicarla:

1. Inserire i dati reali (anonimi: niente indirizzi né nomi degli annunci).
2. Togliere `<meta name="robots" content="noindex, nofollow"/>` e il commento "BOZZA".
3. Aggiungerla a `sitemap.xml`, all'indice delle guide e ai link "Approfondisci".

## Storico revisioni

| Data | Pagina | Modifica |
|---|---|---|
| 2026-10-01 | `come-affittare-un-bnb-a-palermo.html` | Tassa di soggiorno 4 € (era 1,50-3 €), scadenze, accordo Airbnb, soglia P.IVA 3 immobili (L. 199/2025). |
| 2026-10-01 | `normativa-affitti-brevi-sicilia-2026.html` | Nuove sezioni: decreto regionale post-TAR, fisco 2026, imposta di soggiorno e Modello 21. |
