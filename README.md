# Atelier LN-IA — Séance 05 — Bases du prompt

**Module 02 · Semaine 03 · Vendredi 09 OCTOBRE 2026**

## Ouvrir l’atelier

| Accès | Lien |
|---|---|
| **Site public — GitHub Pages** | **[Ouvrir la présentation en ligne](https://elhisse-clprepas.github.io/atelier-seance05-ln-ia/)** |
| **Site local — développement** | **[http://localhost:5173/](http://localhost:5173/)** — après `npm run dev` |
| Aperçu local de production | [http://localhost:4173/](http://localhost:4173/) — après `npm run build` puis `npm run preview` |
| Exemples selon votre métier | [Consulter les quatre prompts et leurs réponses](https://elhisse-clprepas.github.io/atelier-seance05-ln-ia/#exemples) |
| Code et supports | [Dépôt GitHub](https://github.com/elhisse-CLPrepas/atelier-seance05-ln-ia) |

## Objectif pédagogique

Transformer une demande vague en prompt utile et contrôlable : **Rôle + Contexte + Objectif + Contraintes + Format + Contrôle humain**.

Le [support candidat](public/sources/support-seance-05-bases-du-prompt-candidats.md) constitue la référence pédagogique de la séance.

## Installer et démarrer

Prérequis : **Node.js 22.12 ou supérieur** et npm.

1. Cloner le dépôt ou télécharger son archive, puis ouvrir le dossier dans VS Code.
2. Installer les dépendances et démarrer le serveur :

```sh
npm ci
npm run dev
```

Ouvrir l’adresse indiquée dans le terminal, habituellement **http://localhost:5173/**. Sous PowerShell, utiliser `npm.cmd` à la place de `npm` si le lanceur `npm.ps1` est bloqué.

Pour vérifier la version de production :

```sh
npm run build
npm run preview
```

La compilation produit `dist/`. L’aperçu démarre habituellement sur **http://localhost:4173/** ; un autre port peut être proposé si celui-ci est occupé.

## Contenu de l’atelier

- 20 diapositives, dont quatre affiches, avec navigation au clavier et plein écran.
- Six fiches sur les composantes du prompt : anti-exemple, exemple et conseil.
- Quatre cas métier : formateur, entrepreneur, manager et comptable.
- Réponses détaillées, tableaux, points de contrôle et téléchargement Markdown dans chaque onglet métier.
- Deux prompts de démonstration à copier dans un outil IA.
- Huit flashcards interactives.
- Générateur local de prompt V1 et checklist de préparation à la séance 06.
- Galerie d’affiches avec agrandissement et téléchargement.
- Supports téléchargeables en Markdown, HTML, PDF et Word.

Le site ne nécessite ni compte, ni clé API. Il n’appelle aucun service IA et n’envoie pas les champs du générateur à un serveur. La copie utilise le presse-papiers du navigateur ; la projection utilise son mode plein écran.

## Parcours conseillé — 90 minutes

| Phase | Durée | Activité |
|---|---:|---|
| Accueil et diagnostic | 10 min | Identifier une demande vague |
| Formule et présentation | 20 min | Découvrir les six composantes |
| Démonstrations | 15 min | Comparer deux prompts pour une même mission |
| Exemples professionnels | 15 min | Examiner les quatre cas métier et leurs réponses |
| Production individuelle | 20 min | Construire `prompt-simple-v1.md` |
| Révision et préparation S06 | 10 min | Flashcards, auto-contrôle et conservation des preuves |

## Fichiers et livrables

| Dossier | Contenu |
|---|---|
| `src/` | Interface, présentation, affiches et affichage des réponses |
| `public/sources/` | Sept supports pédagogiques téléchargeables |
| `public/affiches/` | Quatre affiches utilisées dans la présentation |
| `02-prompts/` | Exemples V1/V2, réponse de test, bilan et préparation S06 |
| `03-reponses-prompts-metiers/` | Prompts et réponses des quatre cas métier |
| `docs/` | Comptes rendus des contrôles et des mises à jour |
| `scripts/` | Utilitaires de maintenance des documents |

Les fichiers Markdown des réponses métier alimentent directement la présentation lors de la compilation. Modifier le fichier correspondant dans `03-reponses-prompts-metiers/`, puis reconstruire le site pour actualiser la réponse affichée et téléchargée.

Livrable de la séance 05 : **`02-prompts/prompt-simple-v1.md`**. Pour préparer la suite, conserver `reponse-test-v1.md`, corriger le prompt dans `prompt-simple-v2.md` et documenter les différences dans `bilan-comparatif.md`. Le prompt structuré de la séance 06 est conservé séparément dans `prompt-structure-v1.md`.

Les affiches du module indiquent **Semaine 03**. Les copies utilisées par le site se trouvent dans `public/affiches/` ; la racine conserve les fichiers correspondants.

## Publication automatique — GitHub Pages

**Adresse à partager : [https://elhisse-clprepas.github.io/atelier-seance05-ln-ia/](https://elhisse-clprepas.github.io/atelier-seance05-ln-ia/)**

Chaque push sur `main` déclenche [.github/workflows/deploy.yml](.github/workflows/deploy.yml). La compilation installe les dépendances verrouillées avec `npm ci` et configure le chemin `/atelier-seance05-ln-ia/`. Une étape distincte publie uniquement `dist/` sur GitHub Pages.

La compilation dispose d’un accès en lecture au dépôt. Seule l’étape de publication reçoit les droits `pages: write` et `id-token: write`, nécessaires à GitHub Pages. Les identifiants Git ne sont pas conservés après le checkout.

Dans **Settings > Pages**, la source doit rester **GitHub Actions**. Le déploiement peut également être relancé depuis [l’onglet Actions](https://github.com/elhisse-CLPrepas/atelier-seance05-ln-ia/actions).

`node_modules/`, `dist/`, `tmp/`, les journaux et les fichiers `.env` sont exclus du versionnement.

## Contrôle humain

Les réponses sont des exemples pédagogiques. Les cas fictifs et les informations à compléter sont signalés. Avant une utilisation réelle, vérifier les faits, les coordonnées et les conditions commerciales ; pour la TVA, consulter les textes fiscaux en vigueur dans le pays concerné. Les contrôles techniques du site ne remplacent pas cette validation humaine.
