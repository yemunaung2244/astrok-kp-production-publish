"""Copy the current iOS horary report wording without rewriting either language."""
import json
import re
from pathlib import Path
root = Path(__file__).resolve().parents[2]
source = root / 'ios/AstroKProIOS/AstroKProIOS/Calculation/KPHoraryReportText.swift'
pattern = r'case "([^"\n]+)": text = en \? ("(?:[^"\\]|\\.)*") : ("(?:[^"\\]|\\.)*")'
rows = re.findall(pattern, source.read_text())
assert len(rows) == len(re.findall(r'case "', source.read_text()))
data = {key: [json.loads(mm), json.loads(en)] for key, en, mm in rows}
target = root / 'astrok-kp-production-new/src/kp-ios-horary-text.js'
target.write_text('// Generated from KPHoraryReportText.swift; do not rewrite.\nexport const REPORT_TEXT = '+json.dumps(data, ensure_ascii=False, indent=2)+';\n')
print(f'Copied {len(data)} bilingual iOS report templates')
