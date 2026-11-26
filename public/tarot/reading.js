const byId = id => document.getElementById(id);
const grid = byId('grid');
const status = byId('status');
const question = byId('question');
const answer = byId('ai-answer');
const retry = byId('retry');
const readSelected = byId('read-selected');
const shuffleButton = byId('reset');
const yatraSubmit = byId('yatra-submit');
const limits = {one: 1, three: 3, twelve: 12, question: 1, yatra: 1};
const positions = ['အတိတ်', 'လက်ရှိ', 'ရှေ့ဆက်စဉ်းစားရန်'];
let mode = 'one';
let drawn = [];
let requestId = 0;
let shuffleTimer;
let responseTimer;
let shuffling = false;

function show(page) {
  for (const id of ['menu', 'selection', 'result']) byId(id).hidden = id !== page;
  window.scrollTo(0, 0);
}

function cancelReading() {
  requestId++;
  clearTimeout(responseTimer);
}

function returnHome() {
  cancelReading();
  clearTimeout(shuffleTimer);
  shuffling = false;
  show('menu');
}

function updateSelection() {
  readSelected.hidden = mode === 'yatra' || shuffling || drawn.length !== limits[mode]
    || (mode === 'question' && !question.value.trim());
  if (mode === 'yatra') {
    grid.hidden = true;
    status.textContent = 'ပြဿနာကို ရေးပြီး ခလုတ်နှိပ်ပါ။';
    return;
  }
  const remaining = limits[mode] - drawn.length;
  const needsQuestion = mode === 'question' && !question.value.trim();
  grid.hidden = needsQuestion && !shuffling;
  if (shuffling) return;
  status.textContent = needsQuestion ? 'ကတ်မရွေးခင် မေးခွန်းရေးပါ။' : remaining
    ? `နောက်ထပ် ${remaining.toLocaleString('my')} ကတ် ရွေးပါ။`
    : 'ကတ်ရွေးပြီးပါပြီ။';
}

function position(index) {
  if (mode === 'three') return positions[index];
  if (mode === 'twelve') return `လ ${(index + 1).toLocaleString('my')}`;
  if (mode === 'question') return 'မေးခွန်းအတွက် ရွေးထားသောကတ်';
  if (mode === 'yatra') return 'အဆောင်တားရော့ကတ်';
  return 'ရွေးထားသောကတ်';
}

function cardPreview(id, index) {
  const [file, title] = deck[id];
  const figure = document.createElement('figure');
  const image = document.createElement('img');
  image.src = 'cards/' + file;
  image.alt = title;
  figure.setAttribute('aria-label', position(index) + ' · ' + title);
  figure.append(image);
  return figure;
}

function renderDeck() {
  const order = deck.map((_, index) => index);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  grid.classList.add('wheel');
  grid.replaceChildren();
  const outerRing = document.createElement('div');
  outerRing.className = 'wheel-ring outer';
  const innerRing = document.createElement('div');
  innerRing.className = 'wheel-ring inner';
  const makeLogoImg = () => {
    const img = document.createElement('img');
    img.src = 'astrok_card_logo.png';
    img.alt = '';
    return img;
  };
  const center = document.createElement('div');
  center.className = 'wheel-center';
  center.setAttribute('aria-hidden', 'true');
  center.append(makeLogoImg());

  const outerCount = 48;
  const innerCount = order.length - outerCount;
  const wheelSize = Math.min(window.innerWidth * 0.94, 380);
  const outerRadius = Math.round(wheelSize * 0.415);
  const innerRadius = Math.round(wheelSize * 0.245);
  const buttons = [];

  order.forEach((id, index) => {
    const isOuter = index < outerCount;
    const ringIndex = isOuter ? index : index - outerCount;
    const totalInRing = isOuter ? outerCount : innerCount;
    const angle = (ringIndex / totalInRing) * 360;
    const radius = isOuter ? outerRadius : innerRadius;

    const button = document.createElement('button');
    button.className = 'back';
    button.type = 'button';
    button.append(makeLogoImg());
    button.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`;
    button.setAttribute('aria-label', `ကတ် ${(index + 1).toLocaleString('my')} ရွေးရန်`);
    button.onclick = () => {
      if (button.disabled || drawn.length >= limits[mode] || (mode === 'question' && !question.value.trim())) return;
      button.disabled = true;
      drawn.push(id);
      byId('picked').append(cardPreview(id, drawn.length - 1));
      if (drawn.length === limits[mode]) {
        for (const choice of buttons) choice.disabled = true;
      }
      updateSelection();
    };
    buttons.push(button);
    (isOuter ? outerRing : innerRing).append(button);
  });

  grid.append(outerRing, innerRing, center);
  updateSelection();
}

function shuffle() {
  if (shuffling) return;
  cancelReading();
  shuffling = true;
  readSelected.hidden = true;
  drawn = [];
  byId('picked').replaceChildren();
  grid.classList.remove('wheel');
  grid.replaceChildren();
  shuffleButton.disabled = true;
  grid.hidden = false;
  status.textContent = 'ကတ်များ မွှေနေပါသည်…';
  const stage = document.createElement('div');
  stage.className = 'shuffle-stage';
  stage.setAttribute('aria-hidden', 'true');
  for (let index = 0; index < 16; index++) {
    const card = document.createElement('span');
    card.className = 'shuffle-card';
    const logo = document.createElement('img');
    logo.src = 'astrok_card_logo.png';
    logo.alt = '';
    card.append(logo);
    card.style.setProperty('--side', index % 2 === 0 ? '-1' : '1');
    card.style.setProperty('--depth', String(index));
    card.style.setProperty('--delay', `${index * 46}ms`);
    stage.append(card);
  }
  grid.append(stage);
  shuffleTimer = setTimeout(() => {
    shuffling = false;
    shuffleButton.disabled = false;
    renderDeck();
  }, 3000);
}

function offlineReading(activeMode, cards, questionText) {
  if (activeMode === 'yatra' && typeof offlineYatraReading === 'function') {
    return offlineYatraReading(questionText);
  }
  if (activeMode === 'question' && Array.isArray(cards) && cards.length === 1 && typeof offlineQuestionReading === 'function') {
    return offlineQuestionReading(cards[0], questionText);
  }
  if (typeof oneCardReadings === 'undefined' || !Array.isArray(cards) || !cards.length) return '';
  if (activeMode === 'one') return oneCardReadings[cards[0]] || '';
  const splitParagraphs = id => (oneCardReadings[id] || '').split('\n\n').filter(Boolean);
  const firstSentences = (text, count) => {
    const parts = text.split('။').map(s => s.trim()).filter(Boolean);
    return parts.slice(0, count).join('။ ') + (parts.length ? '။' : '');
  };
  if (activeMode === 'three' && cards.length === 3) {
    const [c0, c1, c2] = cards;
    const p0 = splitParagraphs(c0);
    const p1 = splitParagraphs(c1);
    const p2 = splitParagraphs(c2);
    const stripDayPrefix = text => (text || '').replace(/^ဒီနေ့မှာ\s*/, '').replace(/^ဒီနေ့အတွက်\s*/, '');
    const pastSection = [
      `**၁။ အတိတ်ကာလ (${deck[c0][1]})**`,
      `ဇာတာအရ အတိတ်ကာလမှာ ဇာတာရှင်ဟာ **${deck[c0][2]}** နဲ့ ဆိုင်တဲ့ အခြေအနေတွေကို ဖြတ်သန်းခဲ့ရသူတစ်ဦး ဖြစ်ပါတယ်။ ${p0[0] || ''}`,
      p0[1] || '',
      `အတိတ်က ရရှိခဲ့တဲ့ ${deck[c0][2]} နဲ့ ဆိုင်တဲ့ အတွေ့အကြုံနဲ့ သင်ခန်းစာတွေဟာ ယခုလက်ရှိဘဝအတွက် အရေးပါတဲ့ အရင်းအနှီးတွေ ဖြစ်ပါတယ်ခင်ဗျာ။`
    ].filter(Boolean).join('\n\n');

    const presentSection = [
      `**၂။ ပစ္စုပ္ပန်ကာလ (${deck[c1][1]})**`,
      `လက်ရှိဇာတာအရ **${deck[c1][2]}** ကို အဓိက ညွှန်ပြနေတဲ့ ကာလဖြစ်ပါတယ်။ ${p1[0] || ''}`,
      p1[1] || '',
      `${p1[2] ? 'လက်ရှိအချိန်မှာ ' + stripDayPrefix(p1[2]) + ' ' : ''}ဒီကာလကို သတိရှိရှိနဲ့ အကောင်းဆုံး အသုံးချနိုင်မယ့် ဇာတာဖြစ်ပါတယ်ခင်ဗျာ။`
    ].filter(Boolean).join('\n\n');

    const futureSection = [
      `**၃။ အနာဂတ်ကာလ (${deck[c2][1]})**`,
      `အနာဂတ်ဇာတာအရ **${deck[c2][2]}** နဲ့ ဆိုင်တဲ့ အခြေအနေတွေ ကြုံတွေ့လာနိုင်ပါတယ်။ ${p2[0] || ''}`,
      p2[1] || '',
      `${p2[2] ? 'အနာဂတ်မှာ ' + stripDayPrefix(p2[2]) + ' ' : ''}သတိ၊ ဉာဏ်ပညာနဲ့ သည်းခံမှုရှိမယ်ဆိုရင် အခက်အခဲတွေကို ကျော်လွှားပြီး ကောင်းကျိုးတွေ ရရှိနိုင်မှာ ဖြစ်ပါတယ်ခင်ဗျာ။`
    ].filter(Boolean).join('\n\n');

    const adviceSection = [
      `**ဇာတာတစ်ခုလုံး၏ အနှစ်ချုပ်နှင့် အကြံပြုချက်**`,
      `ဇာတာရှင်ဟာ အတိတ်မှာ **${deck[c0][2]}** ကို ဖြတ်သန်းခဲ့သူ၊ ပစ္စုပ္ပန်မှာ **${deck[c1][2]}** ကို ကြုံတွေ့နေရသူ၊ အနာဂတ်မှာ **${deck[c2][2]}** ဆီ ဦးတည်ပြီး ဉာဏ်ပညာနဲ့ သတိတရားကို အသုံးချရမည့်သူ ဖြစ်ပါတယ်။`,
      `ကျွန်တော့်အနေနဲ့ အကြံပြုလိုတာက ${stripDayPrefix(p1[2])} ${stripDayPrefix(p2[2])} မလိုအပ်တဲ့ စိတ်ပူပန်မှုနဲ့ အငြင်းပွားမှုတွေကို ရှောင်ကြဉ်ပြီး လက်တွေ့ကျကျ ရှေ့ဆက်ပါ။`,
      `အတိတ်က ${deck[c0][2]}၊ ပစ္စုပ္ပန်က ${deck[c1][2]} နဲ့ အနာဂတ်အတွက် ${deck[c2][2]} တို့ဟာ ဇာတာရှင်ရဲ့ ဘဝအောင်မြင်မှုအတွက် အဓိကသော့ချက်သုံးခု ဖြစ်ပါတယ်ခင်ဗျာ။`,
      `ဟောကိန်းသည် ဖြစ်နိုင်ခြေများကို ကြိုတင်သုံးသပ်ဖော်ပြခြင်းဖြစ်ပြီး ဇာတာရှင်၏ လက်တွေ့ဆုံးဖြတ်ချက်နှင့် ကြိုးစားအားထုတ်မှုတို့ကသာ ဘဝအပြောင်းအလဲအတွက် အဓိကကျပါတယ်။`,
      `ဇာတာရှင် စိတ်ချမ်းသာ၊ ကိုယ်ကျန်းမာပြီး လိုအင်ဆန္ဒများ ပြည့်ဝပါစေကြောင်း ဆုမွန်ကောင်းတောင်းပေးလိုက်ပါတယ်ခင်ဗျာ။`
    ].join('\n\n');

    return ['**အတိတ်၊ ပစ္စုပ္ပန်နှင့် အနာဂတ် ဘဝဟောကိန်း**', pastSection, presentSection, futureSection, adviceSection].join('\n\n');
  }
  if (activeMode === 'twelve' && cards.length === 12) {
    const months = cards.map((id, idx) => {
      const paras = splitParagraphs(id);
      const concise = firstSentences(paras[0] || '', 2);
      return `**လ ${(idx + 1).toLocaleString('my')} · ${deck[id][1]} (${deck[id][2]})**\n${concise}`;
    });
    const summary = `**၁၂ လတာ ခြုံငုံသုံးသပ်ချက်**\nဒီ ၁၂ လတာ ခရီးစဉ်မှာ ${deck[cards[0]][2]} နဲ့ စတင်ပြီး အလယ်ပိုင်းမှာ ${deck[cards[5]][2]} ကို ဖြတ်သန်းကာ နှစ်ကုန်ပိုင်းမှာ ${deck[cards[11]][2]} ဆီ ဦးတည်သွားမယ့် အခြေအနေကို မြင်ရပါတယ်ခင်ဗျာ။`;
    return [...months, summary].join('\n\n');
  }
  return '';
}

window.finishTarotReading = (id, message, ok) => {
  if (id !== requestId) return;
  clearTimeout(responseTimer);
  answer.replaceChildren();
  let isOk = ok === true;
  let body = message;
  if (!isOk && ['one', 'three', 'twelve', 'question', 'yatra'].includes(mode)) {
    const fallback = offlineReading(mode, drawn, question.value.trim());
    if (fallback) {
      body = fallback;
      isOk = true;
    }
  }
  if (isOk && mode === 'yatra') {
    const cardMatch = body.match(/^\[\[CARD:(\d+)\]\]\s*/);
    if (cardMatch) {
      const cardId = Number(cardMatch[1]);
      if (Number.isInteger(cardId) && cardId >= 0 && cardId < deck.length) {
        byId('result-cards').replaceChildren(cardPreview(cardId, 0));
      }
      body = body.slice(cardMatch[0].length);
    }
  }
  if (!isOk) {
    answer.textContent = body;
  } else {
    const bold = /\*\*([^*\n]+)\*\*/g;
    let start = 0;
    for (const match of body.matchAll(bold)) {
      answer.append(document.createTextNode(body.slice(start, match.index)));
      const strong = document.createElement('strong');
      strong.textContent = match[1];
      answer.append(strong);
      start = match.index + match[0].length;
    }
    answer.append(document.createTextNode(body.slice(start)));
  }
  retry.hidden = isOk;
};

function requestReading() {
  if (shuffling || drawn.length !== limits[mode] || ((mode === 'question' || mode === 'yatra') && !question.value.trim())) return;
  const id = ++requestId;
  retry.hidden = true;
  const payloadObj = {
    mode, cards: drawn, question: (mode === 'question' || mode === 'yatra') ? question.value.trim() : ''
  };
  if (['one', 'three', 'twelve', 'question', 'yatra'].includes(mode) && navigator.onLine === false) {
    const fallback = offlineReading(mode, drawn, question.value.trim());
    if (fallback) {
      window.finishTarotReading(id, fallback, true);
      return;
    }
  }
  answer.textContent = mode === 'yatra'
    ? 'ပြဿနာနှင့် ကိုက်ညီသော တားရော့ယတြာနှင့် အဆောင်ကတ်ကို ရှာဖွေနေပါသည်…'
    : 'အဟော ရေးနေပါသည်…';
  clearTimeout(responseTimer);
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    if (window.parent && window.parent !== window) {
      responseTimer = setTimeout(() => {
        window.finishTarotReading(id, 'အဟော မရသေးပါ။', false);
      }, 15000);
      window.parent.postMessage({ type: 'astrok-tarot-reading', id, payload: payloadObj }, '*');
      return;
    }
    const fallback = offlineReading(mode, drawn, question.value.trim());
    window.finishTarotReading(id, fallback || 'အဟော မရသေးပါ။', Boolean(fallback));
    return;
  }
  responseTimer = setTimeout(() => {
    window.finishTarotReading(id, 'အဟော မရသေးပါ။ ပြန်စမ်းနိုင်ပါတယ်။', false);
  }, 25000);
  const payload = encodeURIComponent(JSON.stringify(payloadObj));
  window.location.href = 'astrok-tarot://reading/' + id + '?payload=' + payload;
}

window.addEventListener('message', event => {
  const data = event?.data;
  if (data && data.type === 'astrok-tarot-result' && typeof window.finishTarotReading === 'function') {
    window.finishTarotReading(data.id, data.message || '', data.ok === true);
  }
});

for (const button of document.querySelectorAll('[data-mode]')) {
  button.onclick = () => {
    mode = button.dataset.mode;
    byId('mode-title').textContent = button.textContent;
    byId('question-box').hidden = mode !== 'question' && mode !== 'yatra';
    if (yatraSubmit) yatraSubmit.hidden = mode !== 'yatra';
    shuffleButton.hidden = mode === 'yatra';
    byId('picked').hidden = mode === 'yatra';
    byId('selection-back').textContent = mode === 'yatra' ? 'ပြဿနာအသစ်မေးရန်' : 'ကတ်အသစ်ရွေးရန်';
    const qLabel = document.querySelector('label[for="question"]');
    if (qLabel) qLabel.textContent = mode === 'yatra'
      ? 'ဇာတာရှင်၏ ပြဿနာ / အခက်အခဲကို ရေးပါ'
      : 'သိချင်တဲ့အကြောင်း';
    question.value = '';
    show('selection');
    if (mode === 'yatra') {
      cancelReading();
      clearTimeout(shuffleTimer);
      shuffling = false;
      drawn = [];
      grid.replaceChildren();
      updateSelection();
    } else {
      shuffle();
    }
  };
}
if (yatraSubmit) {
  yatraSubmit.onclick = () => {
    if (!question.value.trim()) {
      status.textContent = 'ပြဿနာကို အရင်ရေးပေးပါ။';
      question.focus();
      return;
    }
    drawn = [0];
    openReading();
  };
}
byId('menu-back').onclick = returnHome;
byId('result-home').onclick = returnHome;
byId('selection-back').onclick = () => {
  show('selection');
  if (mode === 'yatra') {
    cancelReading();
    updateSelection();
  } else {
    shuffle();
  }
};
shuffleButton.onclick = shuffle;
question.oninput = updateSelection;
retry.onclick = requestReading;
readSelected.onclick = openReading;
window.resumeTarotReading = () => {
  if (!byId('result').hidden) requestReading();
};
function openReading() {
  if (shuffling || drawn.length !== limits[mode] || ((mode === 'question' || mode === 'yatra') && !question.value.trim())) return;
  const resultQuestion = byId('result-question');
  resultQuestion.textContent = (mode === 'question' || mode === 'yatra') ? question.value.trim() : '';
  resultQuestion.hidden = !resultQuestion.textContent;
  if (mode === 'yatra') {
    byId('result-cards').replaceChildren();
  } else {
    byId('result-cards').replaceChildren(...drawn.map(cardPreview));
  }
  show('result');
  requestReading();
}
