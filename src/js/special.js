import '../css/special.styl';

import BaseSpecial from './base';
import Data from './data';
import Svg from './svg';
import { makeElement, removeChildren } from './lib/dom';
import * as Share from './lib/share';
import { animate } from './lib/animate';
import makeSwipeable from './lib/swipe';
import * as Analytics from './lib/analytics';

const CSS = {
  main: 'otkritie',
};

const EL = {};

class Special extends BaseSpecial {
  constructor(params = {}) {
    super();

    Object.assign(this.params, params);
    this.saveParams();

    if (Data && params.data) {
      Object.assign(Data, params.data);
    }

    this.keyUpHandler = this.keyUpHandler.bind(this);

    if (this.params.css) {
      this.loadStyles(this.params.css).then(() => this.init());
    } else {
      this.init();
    }
  }

  createElements() {
    EL.logo = makeElement('a', `${CSS.main}__logo`, {
      href: 'https://www.psbank.ru/Business/Everyday/Cards/Corporate?utm_source=special&utm_medium=publicrelations&utm_campaign=vc29112018&utm_content=test',
      target: '_blank',
      innerHTML: Svg.logo,
    });

    EL.q = makeElement('div', `${CSS.main}__question`);

    EL.controls = makeElement('div', `${CSS.main}__controls`);
    EL.optionL = makeElement('div', `${CSS.main}__option`, {
      innerHTML: `<button class="${CSS.main}__btn">Да</button>`,
      data: {
        type: 'left',
      },
    });
    EL.optionR = makeElement('div', `${CSS.main}__option`, {
      innerHTML: `<button class="${CSS.main}__btn">Нет</button>`,
      data: {
        type: 'right',
      },
    });

    EL.nextBtn = makeElement('button', [`${CSS.main}__btn`, `${CSS.main}__btn--next`], {
      textContent: 'Далее',
      data: {
        click: 'continue',
      },
    });

    EL.optionL.addEventListener('click', () => { this.answer('left'); });
    EL.optionR.addEventListener('click', () => { this.answer('right'); });

    EL.cards = makeElement('div', `${CSS.main}__cards`);
    EL.nextCards = makeElement('div', `${CSS.main}__next-cards`);

    EL.cardWrapper = makeElement('div', `${CSS.main}__card`);

    EL.card = makeElement('div', `${CSS.main}-card`);
    EL.cPages = makeElement('div', `${CSS.main}-card__pages`);
    EL.cHead = makeElement('div', `${CSS.main}-card__head`);
    EL.cBottom = makeElement('div', `${CSS.main}-card__bottom`);
    EL.cTextFrom = makeElement('div', `${CSS.main}-card__text-from`);
    EL.cTextTo = makeElement('div', `${CSS.main}-card__text-to`);

    EL.cHead.appendChild(EL.cTextFrom);
    EL.cBottom.appendChild(EL.cTextTo);

    EL.card.appendChild(EL.cPages);
    EL.card.appendChild(EL.cHead);
    EL.card.appendChild(EL.cBottom);

    EL.backCard = makeElement('div', [`${CSS.main}-card`, 'is-back']);
    EL.bcHead = makeElement('div', `${CSS.main}-card__head`);
    EL.bcBottom = makeElement('div', `${CSS.main}-card__bottom`);
    EL.bcAnswer = makeElement('div', `${CSS.main}-card__answer`);
    EL.bcAnswerTitle = makeElement('div', `${CSS.main}-card__answer-title`);
    EL.bcAnswerText = makeElement('div', `${CSS.main}-card__answer-text`);

    EL.bcAnswer.appendChild(EL.bcAnswerTitle);
    EL.bcAnswer.appendChild(EL.bcAnswerText);

    EL.bcBottom.appendChild(EL.bcAnswer);

    EL.backCard.appendChild(EL.bcHead);
    EL.backCard.appendChild(EL.bcBottom);

    EL.cardWrapper.appendChild(EL.card);
    EL.cardWrapper.appendChild(EL.backCard);

    EL.cards.appendChild(EL.nextCards);
    EL.cards.appendChild(EL.cardWrapper);

    EL.q.appendChild(EL.cards);
    EL.q.appendChild(EL.controls);

    makeSwipeable(EL.card, (t) => {
      this.answer(t, 'Swipe');
    });

    EL.result = makeElement('div', `${CSS.main}-result`);
    EL.rHead = makeElement('div', `${CSS.main}-result__head`);
    EL.rHeadInner = makeElement('div', `${CSS.main}-result__head-inner`);
    EL.rBottom = makeElement('div', `${CSS.main}-result__bottom`);
    EL.rResult = makeElement('div', `${CSS.main}-result__result`);
    EL.rTitle = makeElement('div', `${CSS.main}-result__title`);
    EL.rShare = makeElement('div', `${CSS.main}-result__share`);
    EL.rRestartBtn = makeElement('div', `${CSS.main}-result__restart-btn`, {
      innerHTML: `<span>Пройти еще раз</span>${Svg.refresh}`,
      data: {
        click: 'restart',
      },
    });
    EL.rText = makeElement('div', `${CSS.main}-result__text`, {
      innerHTML: Data.result.text,
    });

    EL.rHeadInner.appendChild(EL.rResult);
    EL.rHeadInner.appendChild(EL.rTitle);
    EL.rHeadInner.appendChild(EL.rShare);
    EL.rHeadInner.appendChild(EL.rRestartBtn);

    EL.rHead.appendChild(EL.rHeadInner);
    EL.rBottom.appendChild(EL.rText);

    EL.result.appendChild(EL.rHead);
    EL.result.appendChild(EL.rBottom);

    EL.help = makeElement('div', `${CSS.main}-help`);
    EL.hInner = makeElement('div', `${CSS.main}-help__inner`);
    EL.hIcon = makeElement('div', `${CSS.main}-help__icon`, {
      innerHTML: Svg.swipe,
    });
    EL.hText = makeElement('div', `${CSS.main}-help__text`, {
      innerHTML: '<p>Свайпайте карточку влево, если считаете, что можно.</p><p>Вправо — если нет.</p>',
    });
    EL.hBtn = makeElement('button', `${CSS.main}-help__btn`, {
      textContent: 'Понятно',
      data: {
        click: 'hideHelp',
      },
    });

    EL.hInner.appendChild(EL.hIcon);
    EL.hInner.appendChild(EL.hText);
    EL.hInner.appendChild(EL.hBtn);

    EL.help.appendChild(EL.hInner);

    EL.nextCard = makeElement('div', `${CSS.main}-next-card`);
    EL.ncHead = makeElement('div', `${CSS.main}-next-card__head`);
    EL.ncBottom = makeElement('div', `${CSS.main}-next-card__bottom`);

    EL.nextCard.appendChild(EL.ncHead);
    EL.nextCard.appendChild(EL.ncBottom);
  }

  hideHelp() {
    animate(EL.help, 'fadeOut', '200ms').then(() => {
      this.container.removeChild(EL.help);
    });
  }

  static makeNextCard(index) {
    const q = Data.questions[index];

    // EL.bcImg.src = q.img;

    return EL.nextCard;
  }

  showCount() {
    const index = this.activeIndex + 1;
    removeChildren(EL.nextCards);

    if (index === Data.questions.length) {
      return;
    }

    const nextCard = Special.makeNextCard(index);

    if (index > Data.questions.length / 2) {
      EL.nextCards.innerHTML = '<div></div>';
      EL.nextCards.firstChild.appendChild(nextCard);
    } else if (index > Data.questions.length / 4) {
      EL.nextCards.innerHTML = '<div></div><div></div>';
      EL.nextCards.firstChild.appendChild(nextCard);
    } else {
      EL.nextCards.innerHTML = '<div></div><div></div><div></div>';
      EL.nextCards.firstChild.appendChild(nextCard);
    }
  }

  static getResult(score) {
    let result = '';
    let index = 0;
    Data.results.some((item, i) => {
      if (item.range[0] <= score && item.range[1] >= score) {
        result = item;
        index = i;
        return true;
      }
      return false;
    });

    return { result, index };
  }

  onOptionHover(e) {
    if (this.isAnswered || this.activeIndex > 0) return;

    const el = e.currentTarget;
    const t = el.dataset.type;
    const hint = makeElement('div', [`${CSS.main}__option-hint`, `${CSS.main}__option-hint--${t}`], {
      innerHTML: t === 'left' ? `<div>Или свайпни карточку влево</div>${Svg.swipeL}` : `${Svg.swipeR}<div>Или свайпни карточку вправо</div>`,
    });

    el.appendChild(hint);
    el.addEventListener('mouseout', () => {
      el.removeChild(hint);
    }, { once: true });
  }

  start() {
    // this.container.classList.add('is-testing');

    this.makeNextQuestion();

    if (/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768) {
      this.container.appendChild(EL.help);
      animate(EL.help, 'fadeIn', '200ms', '400ms');
    } else {
      EL.optionL.addEventListener('mouseover', this.onOptionHover.bind(this));
      EL.optionR.addEventListener('mouseover', this.onOptionHover.bind(this));
    }

    this.initCardEvents();

    Analytics.sendEvent('Start', 'Show');
  }

  restart() {
    this.container.classList.remove('is-result');
    this.container.removeChild(EL.result);
    this.container.appendChild(EL.q);

    EL.nextBtn.textContent = 'Далее';
    EL.nextBtn.dataset.click = 'continue';

    this.setInitialParams();
    this.initCardEvents();
    this.makeNextQuestion();
  }

  continue() {
    this.activeIndex += 1;

    const animationClassName = this.lastAnsweredType === 'left' ? 'fadeOutLeft' : 'fadeOutRight';

    animate(EL.backCard, animationClassName).then(() => {
      this.container.classList.remove('is-answered');

      EL.cards.removeChild(EL.cardWrapper);
      EL.cardWrapper.style.transform = '';

      EL.backCard.classList.remove('is-correct');
      EL.backCard.classList.remove('is-incorrect');

      this.makeNextQuestion();
    });

    Analytics.sendEvent('Next');
  }

  makeNextQuestion() {
    const question = Data.questions[this.activeIndex];

    this.isAnswered = false;

    removeChildren(EL.controls);
    EL.controls.appendChild(EL.optionL);
    EL.controls.appendChild(EL.optionR);

    EL.cPages.innerHTML = `${this.activeIndex + 1}/${Data.questions.length}`;

    EL.cTextFrom.innerHTML = `Можно ли на кэшбек<br>от покупки<br><b>${question.from}</b>`;
    EL.cTextTo.innerHTML = `Купить<br><b>${question.to}</b>`;

    this.showCount();

    EL.cards.appendChild(EL.cardWrapper);
    animate(EL.card, 'cardZoomIn', '200ms');
  }

  answer(t, trigger = 'Click') {
    if (this.isAnswered) { return; }
    this.isAnswered = true;

    const question = Data.questions[this.activeIndex];

    this.lastAnsweredType = t;

    this.makeAnswer(question, t);

    Analytics.sendEvent(`Option - ${t}`, trigger);
  }

  makeAnswer(question, type) {
    this.container.classList.add('is-answered');

    EL.cardWrapper.style.transform = `translate3d(0,0,0) rotateY(${type === 'left' ? -180 : 180}deg)`;

    removeChildren(EL.controls);
    EL.controls.appendChild(EL.nextBtn);

    if (question.correct === type) {
      this.correctAnswers += 1;
      EL.backCard.classList.add('is-correct');
    } else {
      EL.backCard.classList.add('is-incorrect');
    }

    EL.bcAnswerTitle.textContent = question.answerTitle;
    EL.bcAnswerText.innerHTML = question.answer;

    if (this.activeIndex === Data.questions.length - 1) {
      EL.nextBtn.innerHTML = 'Результат';
      EL.nextBtn.dataset.click = 'result';
    }
  }

  result() {
    // const { result, index } = Special.getResult(this.correctAnswers);

    EL.cards.removeChild(EL.cardWrapper);
    EL.cardWrapper.style.transform = '';

    EL.backCard.classList.remove('is-correct');
    EL.backCard.classList.remove('is-incorrect');

    this.container.classList.remove('is-answered');
    this.container.classList.add('is-result');
    this.container.removeChild(EL.q);
    this.container.appendChild(EL.result);

    EL.rResult.innerHTML = `${this.correctAnswers} из ${Data.questions.length} правильных ответов`;
    EL.rTitle.innerHTML = 'Рублёвая монета дорожает в&nbsp;100 раз, если её гравировку перекосило';

    removeChildren(EL.rShare);
    Share.make(EL.rShare, {
      url: this.params.share.url + this.correctAnswers,
      title: this.params.share.title,
      twitter: this.params.share.title,
    });

    this.destroyCardEvents();

    Analytics.sendEvent('Result');
  }

  setInitialParams() {
    this.activeIndex = 0;
    this.correctAnswers = 0;
  }

  keyUpHandler(e) {
    if (e.keyCode === 37 || e.keyCode === 39) {
      this.answer(e.keyCode === 37 ? 'left' : 'right', 'KeyUp');
    }
  }

  initCardEvents() {
    document.addEventListener('keyup', this.keyUpHandler);
  }

  destroyCardEvents() {
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  init() {
    this.setInitialParams();
    this.createElements();
    removeChildren(this.container);
    this.container.appendChild(EL.logo);
    this.container.appendChild(EL.q);

    this.params.isFeed ? this.container.classList.add('is-feed') : '';

    this.start();
  }
}

export default Special;
