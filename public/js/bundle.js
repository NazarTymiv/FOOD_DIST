/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/modules/calc.js":
/*!***********************************!*\
  !*** ./public/js/modules/calc.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const calc = () => {
  const calcResult = document.querySelector('.calculating__result span');
  let sex = '',
      height = 0,
      weight = 0,
      age = 0,
      ratio = 0;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  const initLocalSettings = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(item => {
      item.classList.remove(activeClass);

      if (item.getAttribute('id') === localStorage.getItem('sex')) {
        item.classList.add(activeClass);
      }

      if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        item.classList.add(activeClass);
      }
    });
  };

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  const calcTotal = () => {
    if (!sex || !height || !weight || !age || !ratio) return calcResult.textContent = '_______';
    sex === 'female' ? calcResult.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio) : calcResult.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
  };

  calcTotal();

  const getStaticInformation = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(item => item.classList.remove(activeClass));
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  };

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  const getDynamicInformation = selector => {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      input.value.match(/\D/g) ? input.style.border = '1px solid red' : input.style.border = 'none';

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  };

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
};

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./public/js/modules/cars.js":
/*!***********************************!*\
  !*** ./public/js/modules/cars.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const cards = () => {
  const menu__fieldContainer = document.querySelector('.menu__fieldContainer');

  class Card {
    constructor(props) {
      this.title = props.title;
      this.descr = props.descr;
      this.price = props.price;
      this.img = props.img;
      this.altimg = props.altimg;
      this.classes = props.classes || ['menu__item'];
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = Math.floor(this.price * this.transfer);
    }

    render() {
      const element = document.createElement('div');
      this.classes.forEach(classes => element.classList.add(classes));
      element.innerHTML += `
                <div>
                    <img src="${this.img}" alt="${this.altimg}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
      menu__fieldContainer.append(element);
    }

  }

  axios.get('/menu').then(data => data.data.forEach(obj => new Card(obj).render()));
};

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./public/js/modules/forms.js":
/*!************************************!*\
  !*** ./public/js/modules/forms.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./public/js/modules/modal.js");


const forms = formSelector => {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: `img/form/spinner.svg`,
    success: `Дякуємо! Скоро ми з вами з'яжемось`,
    error: `Щось пішло не так`
  };

  const bindPostData = form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const json = Object.fromEntries(formData.entries());
      axios.post('/modal', json).then(resData => {
        console.log(resData);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => showThanksModal(message.error)).finally(() => form.reset());
    });
  };

  forms.forEach(form => {
    bindPostData(form);
  });

  const showThanksModal = message => {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal');
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)('.modal');
    }, 4000);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./public/js/modules/modal.js":
/*!************************************!*\
  !*** ./public/js/modules/modal.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hideModal": function() { return /* binding */ hideModal; },
/* harmony export */   "showModal": function() { return /* binding */ showModal; }
/* harmony export */ });
const showModal = modalSelector => {
  const modalBlock = document.querySelector(modalSelector);
  modalBlock.classList.add('show');
  modalBlock.classList.remove('hide');
  document.body.style.overflow = 'hidden';
};

const hideModal = modalSelector => {
  const modalBlock = document.querySelector(modalSelector);
  modalBlock.classList.remove('show');
  modalBlock.classList.add('hide');
  document.body.style.overflow = 'auto';
};

const modal = (triggerSelector, modalSelector) => {
  const modalOpenBtn = document.querySelectorAll(triggerSelector),
        modalBlock = document.querySelector(modalSelector);
  modalOpenBtn.forEach(item => {
    item.addEventListener('click', () => showModal(modalSelector));
  });
  modalBlock.addEventListener('click', e => {
    if (e.target === modalBlock || e.target.getAttribute('data-close') == '') {
      hideModal(modalSelector);
    }
  });

  const openModalScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight == document.body.scrollHeight) {
      showModal(modalSelector);
      window.removeEventListener('scroll', openModalScroll);
    }
  };

  window.addEventListener('scroll', openModalScroll);
};

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./public/js/modules/slider.js":
/*!*************************************!*\
  !*** ./public/js/modules/slider.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const slider = ({
  slide,
  nextArrow,
  prevArrow,
  wrapper,
  field
}) => {
  const slides = document.querySelectorAll(slide),
        prevBtn = document.querySelector(prevArrow),
        nextBtn = document.querySelector(nextArrow),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        widthSliderWrapper = window.getComputedStyle(slidesWrapper).width,
        dots = [];
  let numberSlide = 1;

  const getzero = num => {
    return num >= 0 && num < 10 ? `0${num}` : num;
  };

  slidesField.style.width = `${100 * slides.length}%`;
  slides.forEach(slide => {
    slide.style.width = widthSliderWrapper;
  });
  document.querySelector('#total').innerHTML = getzero(slides.length);

  const deleteNumberInWord = word => {
    return +word.replace(/\D/g, '');
  };

  const SelectingSlide = num => {
    slidesField.style.transform = `translateX(-${deleteNumberInWord(widthSliderWrapper) * (num - 1)}px)`;
    document.querySelector('#current').innerHTML = getzero(num);
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[num - 1].style.opacity = 1;
  };

  prevBtn.addEventListener('click', () => {
    numberSlide <= 1 ? numberSlide = slides.length : numberSlide--;
    SelectingSlide(numberSlide);
  });
  nextBtn.addEventListener('click', () => {
    numberSlide > slides.length - 1 ? numberSlide = 1 : numberSlide++;
    SelectingSlide(numberSlide);
  });
  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators');
  document.querySelector('.offer__slider').append(indicators);
  slides.forEach((item, index) => {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', index + 1);
    indicators.append(dot);
    dots.push(dot);
  });
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      numberSlide = index + 1;
      SelectingSlide(numberSlide);
    });
  });
  SelectingSlide(numberSlide);
};

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./public/js/modules/tabs.js":
/*!***********************************!*\
  !*** ./public/js/modules/tabs.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const tabs = (tabsSelector, tabsContentSelector, activeClass) => {
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector);

  const hideTabContent = () => {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  };

  const showTabContent = (index = 0) => {
    tabs[index].classList.add(activeClass);
    tabsContent[index].classList.add('show', 'fade');
    tabsContent[index].classList.remove('hide');
  };

  tabs.forEach((item, index) => {
    item.addEventListener('click', () => {
      hideTabContent();
      showTabContent(index);
    });
  });
  hideTabContent();
  showTabContent();
};

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./public/js/modules/timer.js":
/*!************************************!*\
  !*** ./public/js/modules/timer.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const timer = deadline => {
  const getDataForTimer = deadline => {
    const time = Date.parse(deadline) - Date.parse(new Date()),
          days = Math.floor(time / (1000 * 60 * 60 * 24)),
          hours = Math.floor(time / (1000 * 60 * 60) % 24),
          minutes = Math.floor(time / 1000 / 60 % 60),
          seconds = Math.floor(time / 1000 % 60);
    return {
      total: time,
      days,
      hours,
      minutes,
      seconds
    };
  };

  const getzero = num => {
    return num >= 0 && num < 10 ? `0${num}` : num;
  };

  const setClock = deadline => {
    const days = document.querySelector('#days'),
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const time = getDataForTimer(deadline);
      days.innerHTML = getzero(time.days);
      hours.innerHTML = getzero(time.hours);
      minutes.innerHTML = getzero(time.minutes);
      seconds.innerHTML = getzero(time.seconds);
      if (timeInterval <= 0) clearInterval(updateClock, 1000);
    }
  };

  setClock(deadline);
};

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./public/js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./public/js/modules/calc.js");
/* harmony import */ var _modules_cars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cars */ "./public/js/modules/cars.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./public/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./public/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./public/js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./public/js/modules/timer.js");







window.addEventListener("DOMContentLoaded", () => {
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', 'tabheader__item_active');
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_modules_cars__WEBPACK_IMPORTED_MODULE_2__.default)();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__.default)('form');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.default)('[data-modal]', '.modal');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)('2021-08-31');
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map