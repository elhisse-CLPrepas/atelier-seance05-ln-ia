import './affiches.css';

export const posters = [
  {file:'seance-05-datee.png', title:'Bienvenue à la séance 05', tag:'OUVERTURE · 09 OCTOBRE 2026', description:'Bases du prompt : passer d’une demande vague à une consigne de production claire.', alt:'Affiche de la séance 05, vendredi 9 octobre 2026 : objectif, six composantes, exemple avant et après, et livrable 02-prompts/prompt-simple-v1.md.'},
  {file:'module-02-semaine-03.png', title:'Du prompt simple au prompt structuré', tag:'SEMAINE 03 · SÉANCES 05 ET 06 · 09 OCTOBRE 2026', description:'Semaine 03 : bases du prompt en séance 05, puis prompt structuré en séance 06. Le module 02 se déroule sur deux semaines.', alt:'Affiche LN-IA du module 02, semaine 03, séances 05 et 06 : bases du prompt, prompt structuré et réflexes cadrer, produire, corriger.'},
  {file:'seance-05-synthese.png', title:'Les repères à retenir', tag:'SYNTHÈSE · 09 OCTOBRE 2026', description:'Reconnaître une demande vague, préciser le public et le résultat attendu, puis conserver un premier prompt contrôlable.', alt:'Affiche de synthèse de la séance 05 du 09 OCTOBRE 2026 : rôle, contexte, objectif, contraintes, format et contrôle ; demande vague comparée à un prompt cadré ; livrable prompt-simple-v1.md.'},
  {file:'module-02-semaine-03-seances-05-08.png', title:'La suite du module 02', tag:'PERSPECTIVE · SEMAINE 03 · S05 DU 09 OCTOBRE 2026', description:'05 : bases du prompt. 06 : prompt structuré. 07 : prompt maître personnel. 08 : contrôle des réponses IA.', alt:'Affiche du module 02 corrigée : semaine 03, séances 05 à 08, avec les livrables prompt-simple-v1.md, prompt-structure-v1.md, prompt-maitre-personnel-v1.md et grille-controle-reponses-ia.md.'}
];

const url = poster => `${import.meta.env.BASE_URL}affiches/${poster.file}`;

export function posterSlide(index) {
  const poster = posters[index];
  return `<div class="poster-slide"><div class="poster-caption"><div class="slide-label">${poster.tag}</div><h2>${poster.title}</h2><p>${poster.description}</p><button data-poster="${index}">Agrandir l’affiche</button></div><button class="poster-image-button" data-poster="${index}" aria-label="Agrandir : ${poster.title}"><img src="${url(poster)}" alt="${poster.alt}" decoding="async"></button></div>`;
}

export function mountPosters() {
  const preparation = document.createElement('div');
  preparation.className = 'callout';
  preparation.innerHTML = '<b>De la séance 05 à la séance 06</b><p>Le prompt simple V1 est le livrable de cette séance. En séance 06, le test et la correction en V2 servent à préparer un prompt structuré, conservé dans <code>02-prompts/prompt-structure-v1.md</code>. Les séances 07 et 08 prolongent ce travail avec le prompt maître personnel et la grille de contrôle des réponses.</p>';
  document.querySelector('#seance06 .timeline').before(preparation);
  const section = document.createElement('section');
  section.id = 'affiches';
  section.innerHTML = `<div class="section-head"><span>SUPPORTS VISUELS</span><h2>Les affiches de la séance</h2><p>Retrouvez les quatre affiches utilisées dans la présentation. Agrandissez-les pour lire les détails ou téléchargez les originaux.</p></div><div class="poster-gallery">${posters.map((poster,index)=>`<article class="poster-card"><button class="poster-thumbnail" data-poster="${index}" aria-label="Agrandir : ${poster.title}"><img src="${url(poster)}" alt="${poster.alt}" loading="lazy" decoding="async"></button><div><small>${poster.tag}</small><h3>${poster.title}</h3><p>${poster.description}</p><div class="actions"><button data-poster="${index}">Agrandir</button><a class="btn" href="${url(poster)}" download>Télécharger PNG</a></div></div></article>`).join('')}</div>`;
  document.querySelector('#ressources').before(section);

  const dialog = document.createElement('dialog');
  dialog.className = 'poster-dialog';
  dialog.setAttribute('aria-labelledby','posterDialogTitle');
  dialog.innerHTML = `<div class="poster-toolbar"><h2 id="posterDialogTitle"></h2><button id="posterZoom" aria-pressed="false">Lire en taille réelle</button><a id="posterDownload" class="btn" download>Télécharger PNG</a><button id="posterClose" aria-label="Fermer l’affiche">Fermer ×</button></div><div class="poster-scroll"><img id="posterLarge" alt=""></div>`;
  document.body.append(dialog);
  let trigger;
  const close = () => dialog.close();
  dialog.querySelector('#posterClose').onclick = close;
  dialog.addEventListener('click',event=>{if(event.target===dialog)close();});
  dialog.addEventListener('close',()=>{
    document.body.classList.remove('poster-open');
    trigger?.focus();
  });
  dialog.querySelector('#posterZoom').onclick = event => {
    const zoomed = dialog.classList.toggle('zoomed');
    event.currentTarget.setAttribute('aria-pressed',String(zoomed));
    event.currentTarget.textContent = zoomed ? 'Afficher l’affiche entière' : 'Lire en taille réelle';
  };
  document.addEventListener('click',event=>{
    const button = event.target.closest('[data-poster]');
    if(!button)return;
    const poster = posters[Number(button.dataset.poster)];
    if(!poster)return;
    trigger = button;
    dialog.classList.remove('zoomed');
    const zoom = dialog.querySelector('#posterZoom');
    zoom.textContent = 'Lire en taille réelle';
    zoom.setAttribute('aria-pressed','false');
    dialog.querySelector('#posterDialogTitle').textContent = poster.title;
    const img = dialog.querySelector('#posterLarge');
    img.src = url(poster);
    img.alt = poster.alt;
    dialog.querySelector('#posterDownload').href = url(poster);
    // La modale doit rester dans l'élément projeté en plein écran.
    (document.fullscreenElement || document.body).append(dialog);
    dialog.showModal();
    dialog.querySelector('.poster-scroll').scrollTo(0,0);
    document.body.classList.add('poster-open');
  });
}
