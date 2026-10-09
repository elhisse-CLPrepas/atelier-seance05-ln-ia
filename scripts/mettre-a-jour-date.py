"""Synchronise la date de séance dans les supports éditables et les PDF."""
from pathlib import Path
import re
import zipfile
import xml.etree.ElementTree as ET
import fitz

ROOT = Path(__file__).resolve().parents[1]
DATE = '09 OCTOBRE 2026'
LABEL = f'Séance 05 - {DATE}'
QA = ROOT / 'tmp' / 'controle-date'
QA.mkdir(parents=True, exist_ok=True)

def write(path, text):
    path.write_text(text, encoding='utf-8')

# Markdown candidat, README et livrables.
for path in [ROOT/'README.md', *sorted((ROOT/'02-prompts').glob('*.md')),
             ROOT/'public/sources/support-seance-05-bases-du-prompt-candidats.md']:
    text = path.read_text(encoding='utf-8')
    text = re.sub(r'(?i)(?<!\d)9 octobre 2026', DATE, text)
    if '**Date de la séance :**' not in text:
        lines = text.splitlines()
        lines[1:1] = ['', f'**Date de la séance :** vendredi {DATE}', '']
        text = '\n'.join(lines)+'\n'
    write(path,text)

# HTML téléchargeables : date lisible dans la zone de titre.
for path in (ROOT/'public/sources').glob('*.html'):
    text = path.read_text(encoding='utf-8')
    text = text.replace('../../../logo-LN-IA.png','../logo-ln-ia.png')
    if 'date-seance' not in text:
        if path.name.startswith('affiche'):
            text = text.replace('<p class="kicker">Bases du prompt</p>',
                f'<p class="kicker">Bases du prompt · <time class="date-seance" datetime="2026-10-09">{DATE}</time></p>')
        else:
            text = text.replace('<div class="meta" aria-label="Informations du support">',
                '<div class="meta" aria-label="Informations du support">'+
                f'\n        <div><strong>Date de la séance :</strong> <time class="date-seance" datetime="2026-10-09">vendredi {DATE}</time></div>')
        text = text.replace('</title>',f' - {DATE}</title>')
    write(path,text)

# Site, diapositives, flashcards et fichiers exportés.
path = ROOT/'src/main.js'
text = path.read_text(encoding='utf-8')
text = text.replace('MODULE 02 · SÉANCE 05</small>',f'MODULE 02 · SÉANCE 05 · {DATE}</small>')
text = text.replace('LN-IA · SÉANCE 05</div>',f'LN-IA · SÉANCE 05 · {DATE}</div>')
text = text.replace("'Séance 05 · Module 02'",f"'Séance 05 · Module 02 · {DATE}'")
text = text.replace("<h1>Les bases <em>du prompt</em></h1>",
    f'<h1>Les bases <em>du prompt</em></h1><p class="session-date"><time datetime="2026-10-09">Vendredi {DATE}</time></p>')
text = text.replace("${flipped?'RÉPONSE':'QUESTION'} · LN-IA</small>",
    "${flipped?'RÉPONSE':'QUESTION'} · LN-IA · "+DATE+'</small>')
text = text.replace('# Prompt simple V1\\n\\n',f'# Prompt simple V1\\n\\nDate de la séance : {DATE}\\n\\n')
text = text.replace('# Préparation séance 06 – LN-IA\\n\\n',
    f'# Préparation séance 06 – LN-IA\\n\\nSéance 05 de référence : {DATE}\\n\\n')
text = text.replace('sans modification de contenu','mis à jour pour la séance du '+DATE)
write(path,text)
path = ROOT/'src/affiches.js'
text = path.read_text(encoding='utf-8').replace('9 OCTOBRE 2026',DATE)
text = text.replace('Affiche non datée de la séance 05',f'Affiche de synthèse de la séance 05 du {DATE}')
text = text.replace('SYNTHÈSE · SÉANCE 05',f'SYNTHÈSE · {DATE}')
text = text.replace('CADRAGE · SÉANCES 05 ET 06',f'CADRAGE · SÉANCES 05 ET 06 · {DATE}')
text = text.replace('PERSPECTIVE · SÉANCES 05 À 08',f'PERSPECTIVE · SÉANCES 05 À 08 · S05 DU {DATE}')
write(path,text)
path = ROOT/'index.html'
text = path.read_text(encoding='utf-8').replace('</title>',f' · {DATE}</title>')
write(path,text)

# Guide Office : modifier directement le XML afin de préserver tous les paragraphes.
path = ROOT/'public/sources/guide-seance-05-bases-du-prompt-candidats.docx'
with zipfile.ZipFile(path) as archive:
    parts = {info.filename.replace('\\','/'):archive.read(info) for info in archive.infolist()}
ns = {'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
ET.register_namespace('w',ns['w'])
tree = ET.fromstring(parts['word/document.xml'])
body = tree.find('w:body',ns)
assert body is not None
if DATE not in ''.join(body.itertext()):
    paragraph = ET.Element(f"{{{ns['w']}}}p")
    run = ET.SubElement(paragraph,f"{{{ns['w']}}}r")
    props = ET.SubElement(run,f"{{{ns['w']}}}rPr")
    ET.SubElement(props,f"{{{ns['w']}}}b")
    ET.SubElement(run,f"{{{ns['w']}}}t").text = f'Date de la séance : vendredi {DATE}'
    body.insert(1,paragraph)
parts['word/document.xml'] = ET.tostring(tree,encoding='utf-8',xml_declaration=True)
with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as archive:
    for name,data in parts.items():
        archive.writestr(name,data)

# PDFs existants : ajout dans les marges libres, sans reconstruire le contenu.
for path in (ROOT/'public/sources').glob('*.pdf'):
    document = fitz.open(path)
    for i,page in enumerate(document):
        # Bande de pied de page dans la marge, loin des blocs de contenu.
        rect = page.rect
        y = rect.height-14
        label = f'{LABEL}  |  {i+1}/{len(document)}'
        if DATE not in page.get_text():
            page.insert_text((28,y),label,fontsize=8,fontname='hebo',color=(0.05,0.15,0.3))
    meta = document.metadata
    meta['subject'] = LABEL
    document.set_metadata(meta)
    temp = path.with_suffix('.dated.pdf')
    document.save(temp,garbage=4,deflate=True)
    document.close()
    temp.replace(path)
    document = fitz.open(path)
    for i,page in enumerate(document):
        assert DATE in page.get_text(),(path.name,i)
        page.get_pixmap(matrix=fitz.Matrix(1,1)).save(QA/f'{path.stem}-page-{i+1}.png')
    document.close()

print('Date synchronisée dans Markdown, HTML, site, exports, DOCX et PDF.')
