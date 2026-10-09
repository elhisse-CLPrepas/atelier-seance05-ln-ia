# Atelier LN-IA — Séance 05 — Module 02

**Date de la séance :** vendredi 09 OCTOBRE 2026

[Site public](https://elhisse-clprepas.github.io/atelier-seance05-ln-ia/) · [Dépôt GitHub](https://github.com/elhisse-CLPrepas/atelier-seance05-ln-ia)

## Objectif
Apprendre à transformer une demande vague en prompt structuré : **Rôle + Contexte + Objectif + Contraintes + Format + Contrôle humain**. Base pédagogique : `public/sources/support-seance-05-bases-du-prompt-candidats.md`.

## Installer et démarrer avec VS Code
1. Extraire l'archive ZIP et ouvrir ce dossier dans VS Code.
2. Installer Node.js 20.19+ ou 22.12+ si nécessaire.
3. Ouvrir le terminal VS Code dans ce dossier.
4. Exécuter `npm ci`, puis `npm run dev` (sous PowerShell, utiliser `npm.cmd` si `npm.ps1` est bloqué).
5. Ouvrir l'adresse locale affichée (habituellement http://localhost:5173).

## Produire la version publiable
- `npm run build` génère le dossier `dist/`.
- `npm run preview` vérifie localement la version de production.

## Parcours conseillé : 90 minutes (modifiable)
| Phase | Durée | Activité |
|---|---:|---|
| Accueil, objectifs et diagnostic | 10 min | Demande vague et discussion |
| Formule et présentation | 20 min | Six composantes du prompt |
| Démonstrations | 15 min | Même mission, deux prompts |
| Exemples professionnels | 15 min | Quatre cas commentés |
| Production individuelle | 20 min | Construire `prompt-simple-v1.md` |
| Flashcards et préparation S06 | 10 min | Auto-contrôle et preuves |

## Fonctionnalités
- 20 diapositives navigables et projetables en plein écran, dont quatre affiches intégrées aux étapes pédagogiques.
- Galerie des quatre affiches avec agrandissement, lecture en taille réelle et téléchargement PNG.
- Six fiches détaillées (anti-exemple, exemple, conseil).
- Quatre cas professionnels (formateur, entrepreneur, manager, comptable).
- Réponses pédagogiques intégrées aux quatre onglets métier, avec tableaux, points de contrôle et téléchargement Markdown. Les fichiers de `03-reponses-prompts-metiers/` alimentent directement le site lors de la compilation.
- Deux prompts à copier pour une démonstration dans une IA externe (aucun appel IA direct).
- Huit flashcards interactives.
- Générateur local de prompt et téléchargement du fichier Markdown V1.
- Préparation de la séance 06 et checklist exportable.
- Les sept fichiers de l'archive source sont conservés dans `public/sources/`.

## GitHub Pages
La publication s'effectue automatiquement à chaque push sur `main` avec GitHub Actions via `.github/workflows/deploy.yml`. Dans **Settings > Pages > Build and deployment**, la source est **GitHub Actions**. Le workflow installe les dépendances verrouillées avec `npm ci`, compile le site et publie uniquement `dist/`. Il configure automatiquement le `base` Vite sur `/atelier-seance05-ln-ia/`. Le workflow peut aussi être lancé manuellement depuis l'onglet Actions.

Le site est partagé à l'adresse https://elhisse-clprepas.github.io/atelier-seance05-ln-ia/. Le dépôt versionne le code, les supports et les affiches ; `node_modules/`, `dist/` et les contrôles temporaires de `tmp/` sont exclus.

## Assurance qualité humaine
Le site ne vérifie pas la véracité du contenu produit par un outil IA. Les exemples sont pédagogiques. Avant diffusion publique, relire les sources, vérifier les dates, les informations réglementaires et les liens. Le DOCX fourni dans les sources peut ne pas être lisible comme document Office standard ; la référence de contenu principale est le Markdown.

## Livrables candidat
`02-prompts/prompt-simple-v1.md` et, en vue de S06, `02-prompts/reponse-test-v1.md`, puis `02-prompts/prompt-simple-v2.md` et `02-prompts/bilan-comparatif.md`.

Les affiches annoncent également `02-prompts/prompt-structure-v1.md` pour la séance 06 : il s'agit du prompt structuré construit à partir des essais et corrections du prompt simple.

## Affiches dans la présentation
Les quatre PNG sont synchronisés entre la racine et `public/affiches/` avec des noms adaptés au Web. Ils sont inclus dans `dist/` lors de la compilation. La présentation porte la date du 09 OCTOBRE 2026 ; la nouvelle affiche « Module 02, Semaine 03 » est utilisée telle que fournie. Les supports Markdown, HTML, Word et PDF, les flashcards et les exports portent également la date de la séance.

- Diapositive 1 : affiche datée de la séance 05, pour l'ouverture du 09 OCTOBRE 2026.
- Diapositive 3 : nouvelle affiche « Module 02, Semaine 03 », centrée sur les séances 05 et 06. Elle remplace l'ancienne affiche qui indiquait une semaine incorrecte, également retirée des fichiers téléchargeables.
- Diapositive 16 : affiche de synthèse de la séance 05, datée du 09 OCTOBRE 2026, avant le livrable.
- Diapositive 19 : affiche du parcours des séances 05 à 08, corrigée en « Semaine 03 », pour préparer la suite. La date du 09 OCTOBRE 2026 est conservée.

Les affiches verticales sont affichées entières, sans recadrage. Le bouton « Agrandir l'affiche » ouvre une vue avec lecture en taille réelle et défilement ; Échap ou « Fermer » permet de revenir à la présentation. Une galerie accessible par le menu « Affiches » rassemble les quatre fichiers. L'affiche de cadrage de la séance indique désormais « Semaine 03 ».
