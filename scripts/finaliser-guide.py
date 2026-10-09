"""Empêche qu'un titre du guide reste seul en bas de page."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import re
import xml.etree.ElementTree as ET

path = Path(__file__).resolve().parents[1]/'public/sources/guide-seance-05-bases-du-prompt-candidats.docx'
with ZipFile(path) as z:
    parts = {item.filename:z.read(item) for item in z.infolist()}
w = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
ET.register_namespace('w',w)
root = ET.fromstring(parts['word/document.xml'])
for p in root.iter(f'{{{w}}}p'):
    text = ''.join(t.text or '' for t in p.iter(f'{{{w}}}t'))
    if re.match(r'^\d+\.\s',text):
        props = p.find(f'{{{w}}}pPr')
        if props is None:
            props = ET.Element(f'{{{w}}}pPr')
            p.insert(0,props)
        if props.find(f'{{{w}}}keepNext') is None:
            ET.SubElement(props,f'{{{w}}}keepNext')
parts['word/document.xml'] = ET.tostring(root,encoding='utf-8',xml_declaration=True)
with ZipFile(path,'w',ZIP_DEFLATED) as z:
    for name,data in parts.items():
        z.writestr(name,data)
