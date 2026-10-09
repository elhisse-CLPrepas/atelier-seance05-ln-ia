import './reponses-metiers.css';

const sources = import.meta.glob('../03-reponses-prompts-metiers/*.md', {
  query: '?raw', import: 'default', eager: true
});
const files = [
  'formateur-plan-initiation-ia.md',
  'entrepreneur-annonce-facebook.md',
  'manager-synthese-reunion.md',
  'comptable-principe-general-tva.md'
];
const labels = ['Formateur', 'Entrepreneur', 'Manager', 'Comptable'];
const notices = [
  'Exemple pédagogique : initiation en ligne de 45 minutes pour adultes débutants.',
  'Annonce à compléter : les données commerciales entre crochets doivent être confirmées.',
  'Cas entièrement fictif : les notes de réunion sont fournies avec la synthèse.',
  'Exemple chiffré fictif : le taux de 10 % ne représente pas un taux local applicable.'
];

const escape = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function inline(text) {
  return escape(text)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
    .replace(/`([^`]+)`/g,'<code>$1</code>');
}

// Render the small Markdown subset used by the four teaching documents.
// Escape raw HTML before formatting; external links must use HTTP(S).
export function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g,'\n').split('\n');
  const html = [];
  for(let i=0;i<lines.length;) {
    const line = lines[i].trim();
    if(!line) { i++; continue; }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if(heading) {
      const level = Math.min(heading[1].length+1,6);
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`); i++; continue;
    }
    if(line.startsWith('|') && /^\|[\s:|-]+\|$/.test(lines[i+1]?.trim() || '')) {
      const cells = row => row.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim());
      const headers = cells(line);
      i+=2;
      const rows=[];
      while(i<lines.length && lines[i].trim().startsWith('|')) {
        rows.push(`<tr>${cells(lines[i++]).map(cell=>`<td>${inline(cell)}</td>`).join('')}</tr>`);
      }
      html.push(`<div class="metier-table" role="region" aria-label="Tableau de la réponse" tabindex="0"><table><thead><tr>${headers.map(cell=>`<th scope="col">${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`);
      continue;
    }
    const list = line.match(/^(?:([-*])|\d+\.)\s+/);
    if(list) {
      const ordered = !list[1];
      const pattern = ordered ? /^\d+\.\s+(.+)$/ : /^[-*]\s+(.+)$/;
      const items=[];
      while(i<lines.length) {
        const item=lines[i].trim().match(pattern);
        if(!item)break;
        items.push(`<li>${inline(item[1])}</li>`); i++;
      }
      const tag=ordered?'ol':'ul';
      html.push(`<${tag}>${items.join('')}</${tag}>`); continue;
    }
    const paragraph=[line]; i++;
    while(i<lines.length && lines[i].trim() && !/^(?:#|\||[-*]\s|\d+\.\s)/.test(lines[i].trim()))paragraph.push(lines[i++].trim());
    html.push(`<p>${inline(paragraph.join(' '))}</p>`);
  }
  return html.join('\n');
}

export function renderMetier(index) {
  let container = document.querySelector('#metierResponse');
  if(!container) {
    container=document.createElement('article');
    container.id='metierResponse';
    container.className='metier-response';
    container.setAttribute('aria-labelledby','metierResponseTitle');
    document.querySelector('#exampleBox').after(container);
  }
  const filename=files[index];
  const raw=sources[`../03-reponses-prompts-metiers/${filename}`];
  if(typeof raw!=='string')throw new Error(`Réponse métier absente : ${filename}`);
  // Include the fictional source notes for Manager before showing the analysis.
  const marker=index===2?'## Notes de réunion':'## Réponse obtenue';
  const start=raw.indexOf(marker);
  const body=start>=0?raw.slice(start):raw;
  container.innerHTML=`<div class="metier-response-head"><div><small>RÉPONSE AU PROMPT · 09 OCTOBRE 2026</small><h3 id="metierResponseTitle">${labels[index]} : exemple de réponse</h3></div><button id="downloadMetier">Télécharger le fichier Markdown</button></div><p class="metier-notice">${notices[index]}</p><div class="metier-markdown">${renderMarkdown(body)}</div>`;
  container.querySelector('#downloadMetier').onclick=()=>{
    const url=URL.createObjectURL(new Blob([raw],{type:'text/markdown;charset=utf-8'}));
    const link=document.createElement('a');
    link.href=url; link.download=filename; link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  document.querySelectorAll('[data-example]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.example)===index)));
}
