"""Build the bilingual web question catalog from AstroK's reviewed iOS strings."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
IOS = ROOT.parent / 'ios/AstroKProIOS/AstroKProIOS'
markdown = (ROOT / 'public/horary_questions.md').read_text()
ios_catalog = (IOS / 'Calculation/KPHoraryQuestionCatalog.swift').read_text()
ios_readings = (IOS / 'Views/KPReadingsView.swift').read_text()

translations = {}
groups_en = {}
for mm, en in re.findall(r'titleMm:\s*"([^"]+)",\s*titleEn:\s*"([^"]+)"', ios_catalog):
    if not en.startswith('Business Horary:'):
        translations[mm] = en
for mm, en in re.findall(r'\("([^"\n]+)",\s*"([^"\n]+)",\s*\d+\)', ios_catalog):
    translations[mm] = en
for en, mm in re.findall(r'case \.horary\w+: pair = \("([^"\n]+)",\s*"([^"\n]+)"\)', ios_readings):
    translations[mm] = en
for mm, en in re.findall(r'groupMm:\s*"([^"]+)",\s*groupEn:\s*"([^"]+)"', ios_catalog):
    groups_en[mm] = en
for mm, en in re.findall(r'modernGroup\("[^"]+",\s*"([^"]+)",\s*"([^"]+)"', ios_catalog):
    groups_en[mm] = en

manual = {
    'လုပ်ငန်းအသစ် စတင်ခြင်း': [
        'Should I start the business I am considering?', 'Will this business succeed if I start it?',
        'Will this business make a profit in the long term?', 'Will I start the business this year?',
        'Would it be better to start the business alone?', 'Would it be better to start with a partner?',
        'Should I leave my current job to start my own business?'],
    'လုပ်ငန်းအမျိုးအစား ရွေးချယ်ခြင်း': [
        'Would a food business be profitable for me?', 'Should I start an online trading business?',
        'Should I choose trading, manufacturing or services?', 'Should I change the type of business I currently run?',
        'Should I choose international trade instead of domestic business?', 'Should I buy and operate a franchise?'],
    'အမြတ်အစွန်းနှင့် ဝင်ငွေ': [
        'Will profits from my current business increase?', 'Will my business income rise within the next six months?',
        'Will the product I am selling make a good profit?', 'Will my loss-making business become profitable again?',
        'Will I reach my target profit this year?', 'Will I recover the money invested in my business?',
        'When will my business income become stable?'],
    'လုပ်ငန်းတိုးချဲ့ခြင်း': [
        'Should I expand my current business now?', 'Will opening a new branch succeed?',
        'Should I relocate and reopen the business elsewhere?', 'Should I make and sell a new product?',
        'Would adding a new service be beneficial?', 'Should I buy new equipment to increase production?',
        'Can I expand my business into foreign markets?'],
    'မိတ်ဖက်နှင့် ရှယ်ယာရှင်များ': [
        'Should I start a partnership with the person I have chosen?', 'Will continuing with my current partner benefit me?',
        'Will my partner fulfil the agreed responsibilities?', 'Could my partner cause business losses?',
        'Could this business partnership break down?', 'Should I accept a new shareholder?',
        'Will I recover my share from my current partner?'],
    'ရင်းနှီးမြှုပ်နှံခြင်း': [
        'Should I invest money in this business?', 'Would buying shares in this company benefit me?',
        'Will I recover the money I invested?', 'Will my current investment make a profit?',
        'Should I increase my investment?', 'Should I withdraw from my current investment?',
        'When will I receive a return on my investment?'],
    'ချေးငွေနှင့် ငွေကြေးစီးဆင်းမှု': [
        'Will my business loan application be approved?', 'Will I receive the loan by the deadline?',
        'Should I borrow now to expand the business?', 'Will I be able to repay my business debts?',
        'Will I receive the money owed by a customer?', 'Will I be able to pay what I owe on time?',
        'When will my current financial difficulties ease?', 'Will I pay off my debt, and when?'],
    'အရောင်း၊ ဖောက်သည်နှင့် ဈေးကွက်': [
        'Will sales increase over the next three months?', 'Will the market accept this product?',
        'Will I meet my sales target?', 'Will I receive an order from a major customer?',
        'Will a customer I lost contact me again?', 'Will this advertising campaign improve sales?',
        'Would changing the product price help sales?'],
    'စာချုပ်၊ တင်ဒါနှင့် လိုင်စင်': [
        'Should I sign this contract?', 'Will the contracted work be completed successfully?',
        'Will I win this tender?', 'Will the company obtain the required licence?',
        'Will government approval arrive within the expected period?', 'Will the agreement under negotiation succeed?',
        'Will the other party fulfil its contractual commitments?'],
    'လုပ်ငန်းဝယ်ယူခြင်းနှင့် ရောင်းချခြင်း': [
        'Should I buy this business?', 'Will buying this shop be profitable?',
        'Can I sell my business at the asking price?', 'Will I find a buyer for my business?',
        'Should I buy the shop, factory or business asset now?', 'Can I sell the business asset without a loss?',
        'When will the business transfer be completed?'],
    'ဝန်ထမ်းနှင့် စီမံခန့်ခွဲမှု': [
        'Should I hire this applicant?', 'Should I keep the current manager in charge?',
        'Should I assign this important task to this employee?', 'Will the staff problems be resolved soon?',
        'Will I find a trustworthy employee for the business?', 'Is an employee likely to leave the business?',
        'Would changing staff benefit the business?'],
    'ပစ္စည်းပေးသွင်းသူနှင့် ကုန်စည်ပို့ဆောင်ရေး': [
        'Can I trust this supplier?', 'Will the ordered goods arrive on time?',
        'Will the import shipment be completed successfully?', 'Will customs or shipping problems be resolved?',
        'Will the missing goods be recovered?', 'Should I switch to a new supplier?',
        'Will exporting goods abroad be profitable?'],
    'ပြိုင်ဘက်၊ လိမ်လည်မှုနှင့် အငြင်းပွားမှု': [
        'Could a competing business harm my business?', 'Is there financial fraud within the business?',
        'Is someone I trust being dishonest with my business?', 'Will the missing business funds be recovered?',
        'Will I win the business dispute?', 'Can the dispute be settled without going to court?',
        'Will the business recover from reputational damage?'],
    'လုပ်ငန်းပိတ်ခြင်းနှင့် ပြန်လည်ထူထောင်ခြင်း': [
        'Should I continue operating my current business?', 'Should I close the loss-making business?',
        'Should I pause the business and restart it later?', 'Will reopening the closed business succeed?',
        'Can changing the business model reverse the losses?', 'When will business conditions improve again?'],
    'နိုင်ငံခြားခရီး': [
        'Will I travel abroad?', 'When will I travel abroad?', 'Will my planned overseas trip take place?',
        'Will I get a foreign visa, and when?', 'Will I get a job abroad, and when?',
        'Will I be able to study abroad?', 'Can I settle abroad permanently?',
        'Will the overseas trip go smoothly?', 'Will my departure abroad be delayed?',
        'When will I return from abroad?'],
    'ထီကံနှင့် လောင်းကစား': [
        'Do I have a chance of winning the lottery, and when?', 'Do I have a chance of winning the lottery?',
        'When is my strongest period for a lottery win?', 'How should I choose lottery numbers?',
        'Which Myanmar letters and numbers are lucky for me?', 'Could gambling bring me a gain?'],
}
groups_en.update({
    'အထွေထွေ':'General','ကျန်းမာရေး':'Health','အိမ်ထောင်ရေး':'Relationships',
    'လူပုဂ္ဂိုလ်နှင့်စရိုက်':'Person and character','မိသားစု':'Family',
    'လုပ်ငန်းအသစ် စတင်ခြင်း':'Starting a business','လုပ်ငန်းအမျိုးအစား ရွေးချယ်ခြင်း':'Choosing a business',
    'အမြတ်အစွန်းနှင့် ဝင်ငွေ':'Profit and income','လုပ်ငန်းတိုးချဲ့ခြင်း':'Business expansion',
    'မိတ်ဖက်နှင့် ရှယ်ယာရှင်များ':'Partners and shareholders','ရင်းနှီးမြှုပ်နှံခြင်း':'Investment',
    'ချေးငွေနှင့် ငွေကြေးစီးဆင်းမှု':'Loans and cash flow','အရောင်း၊ ဖောက်သည်နှင့် ဈေးကွက်':'Sales, customers and markets',
    'စာချုပ်၊ တင်ဒါနှင့် လိုင်စင်':'Contracts, tenders and licences',
    'လုပ်ငန်းဝယ်ယူခြင်းနှင့် ရောင်းချခြင်း':'Buying and selling a business',
    'ဝန်ထမ်းနှင့် စီမံခန့်ခွဲမှု':'Employees and management',
    'ပစ္စည်းပေးသွင်းသူနှင့် ကုန်စည်ပို့ဆောင်ရေး':'Suppliers and shipping',
    'ပြိုင်ဘက်၊ လိမ်လည်မှုနှင့် အငြင်းပွားမှု':'Competitors, fraud and disputes',
    'လုပ်ငန်းပိတ်ခြင်းနှင့် ပြန်လည်ထူထောင်ခြင်း':'Closing and rebuilding a business',
    'နိုင်ငံခြားခရီး':'Foreign travel','ထီကံနှင့် လောင်းကစား':'Lottery and gambling',
    'ပစ္စည်းအရောင်းအဝယ်':'Asset sales','ငွေကြေး':'Finance','ဥပဒေရေးရာ':'Legal matters',
})

sections=[]
group=None
for raw in markdown.splitlines():
    header=re.match(r'##\s+(.+?)(?:\s+\(\d+\))?$',raw.strip())
    if header:
        group=header.group(1)
        sections.append((group,[]))
        continue
    question=re.match(r'^\d+\.\s+(.+)$',raw.strip())
    if question and group:
        sections[-1][1].append(question.group(1).strip())

rows=[]
for group,titles in sections:
    if group in manual:
        assert len(manual[group])==len(titles),(group,len(manual[group]),len(titles))
        translations.update(zip(titles,manual[group]))
    assert group in groups_en,group
    for mm in titles:
        rows.append({'groupMm':group,'groupEn':groups_en[group],'titleMm':mm,'titleEn':translations.get(mm)})

extras={
    'မိမိဆိုင်ကယ် အရောင်းထွက်မလား၊ ဘယ်တော့ရောင်းထွက်မလဲ?':'Will my motorcycle sell, and when?',
    'မိမိကား အရောင်းထွက်မလား၊ ဘယ်တော့ရောင်းထွက်မလဲ?':'Will my car sell, and when?',
    'မိမိအိမ် အရောင်းထွက်မလား၊ ဘယ်တော့ရောင်းထွက်မလဲ?':'Will my house sell, and when?',
    'မိမိအိမ်ခြံမြေ အရောင်းထွက်မလား၊ ဘယ်တော့ရောင်းထွက်မလဲ?':'Will my real estate sell, and when?',
    'မိမိမြေ အရောင်းထွက်မလား၊ ဘယ်တော့ရောင်းထွက်မလဲ?':'Will my land sell, and when?',
}
translations.update(extras)
for row in rows:
    row['titleEn']=translations.get(row['titleMm'])

missing=[row['titleMm'] for row in rows if not row['titleEn']]
if missing:
    raise SystemExit('Missing translations:\n'+'\n'.join(missing))
assert len(rows)==247,len(rows)
out=ROOT/'public/horary_questions.bilingual.json'
out.write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print(f'Wrote {len(rows)} bilingual horary questions to {out}')
