/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/modules/calc.js":
/*!***********************************!*\
  !*** ./public/js/modules/calc.js ***!
  \***********************************/
/***/ ((module) => {

const calc = () => {
    const calcResult = document.querySelector('.calculating__result span')
    let sex = '',
        height = 0,
        weight = 0,
        age = 0,
        ratio = 0

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', 'female')
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }

    const initLocalSettings = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector)

        elements.forEach(item => {
            item.classList.remove(activeClass)
            if(item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass)
            }
            if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass)
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

    const calcTotal = () => {
        if(!sex || !height || !weight || !age || !ratio) return calcResult.textContent = '_______'

        sex === 'female' ? calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio) : calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
    }

    calcTotal()

    const getStaticInformation = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector)

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id')
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }

                elements.forEach(item => item.classList.remove(activeClass))

                e.target.classList.add(activeClass)
                
                calcTotal()
            })
        })
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')

    const getDynamicInformation = (selector) => {
        const input = document.querySelector(selector)

        input.addEventListener('input', () => {
            input.value.match(/\D/g) ? input.style.border = '1px solid red' : input.style.border = 'none'

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value
                    break
                case 'weight':
                    weight = +input.value
                    break
                case 'age':
                    age = + input.value
                    break
            }
            calcTotal()
        })
    }

    getDynamicInformation('#height')
    getDynamicInformation('#weight')
    getDynamicInformation('#age')
}

module.exports = calc

/***/ }),

/***/ "./public/js/modules/cars.js":
/*!***********************************!*\
  !*** ./public/js/modules/cars.js ***!
  \***********************************/
/***/ ((module) => {

const cards = () => {
    const menu__fieldContainer = document.querySelector('.menu__fieldContainer')

    class Card {
        constructor(props) {
            this.title = props.title
            this.descr = props.descr
            this.price = props.price
            this.img = props.img
            this.altimg = props.altimg
            this.classes = props.classes || ['menu__item']
            this.transfer = 27
            this.changeToUAH()
        }

        changeToUAH() {
            this.price = Math.floor(this.price * this.transfer)
        }

        render() {
            const element = document.createElement('div')
            
            this.classes.forEach(classes => element.classList.add(classes))

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
            `
            menu__fieldContainer.append(element)
        }
    }

    axios.get('/menu')
        .then(data => data.data.forEach(obj => new Card(obj).render())) 
}

module.exports = cards

/***/ }),

/***/ "./public/js/modules/forms.js":
/*!************************************!*\
  !*** ./public/js/modules/forms.js ***!
  \************************************/
/***/ ((module) => {

const forms = () => {
    const forms = document.querySelectorAll('form')

    const message = {
        loading: `img/form/spinner.svg`,
        success: `Дякуємо! Скоро ми з вами з'яжемось`,
        error: `Щось пішло не так`
    }

    const bindPostData = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.insertAdjacentElement('afterend', statusMessage)

            const formData = new FormData(form)

            const json = Object.fromEntries(formData.entries())

            axios.post('/modal', json)
                .then(resData => {
                    console.log(resData)
                    showThanksModal(message.success)
                    statusMessage.remove()
                })
                .catch(() => showThanksModal(message.error))
                .finally(() => form.reset())
        })
    }

    forms.forEach(form => {
        bindPostData(form)
    })

    const showThanksModal = (message) => {
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.classList.add('hide')
        showModal()

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `

        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            hideModal()
        }, 4000)
    }
}

module.exports = forms

/***/ }),

/***/ "./public/js/modules/modal.js":
/*!************************************!*\
  !*** ./public/js/modules/modal.js ***!
  \************************************/
/***/ ((module) => {

const modal = () => {
    const modalOpenBtn = document.querySelectorAll('[data-modal]'),
          modalBlock = document.querySelector('.modal')

    const showModal = () => {
        modalBlock.classList.add('show')
        modalBlock.classList.remove('hide')
        document.body.style.overflow = 'hidden'
    }

    modalOpenBtn.forEach(item => {
        item.addEventListener('click', showModal)
    })

    const hideModal = () => {
        modalBlock.classList.remove('show')
        modalBlock.classList.add('hide')
        document.body.style.overflow = 'auto'
    }

    modalBlock.addEventListener('click', e => {
        if(e.target === modalBlock || e.target.getAttribute('data-close') == '') {
            hideModal()
        }
    })

    const openModalScroll = () => {
        if(window.pageYOffset + document.documentElement.clientHeight == document.body.scrollHeight) {
            showModal()
            window.removeEventListener('scroll', openModalScroll)
        }
    }

    window.addEventListener('scroll', openModalScroll)
}

module.exports = modal

/***/ }),

/***/ "./public/js/modules/slider.js":
/*!*************************************!*\
  !*** ./public/js/modules/slider.js ***!
  \*************************************/
/***/ ((module) => {

const slider = () => {
    const slides = document.querySelectorAll('.offer__slide'),
          prevBtn = document.querySelector('.offer__slider-prev'),
          nextBtn = document.querySelector('.offer__slider-next'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          widthSliderWrapper = window.getComputedStyle(slidesWrapper).width,
          dots = []

    let numberSlide = 1

    const getzero = (num) => {
        return num >= 0 && num < 10 ? `0${num}` : num
    }

    slidesField.style.width = `${100 * slides.length}%`
    slides.forEach(slide => {
        slide.style.width = widthSliderWrapper
    })
    document.querySelector('#total').innerHTML = getzero(slides.length)

    const deleteNumberInWord = (word) => {
        return +word.replace(/\D/g, '')
    }

    const SelectingSlide = (num) => {
        slidesField.style.transform = `translateX(-${deleteNumberInWord(widthSliderWrapper) * (num - 1)}px)`
        document.querySelector('#current').innerHTML = getzero(num)
        dots.forEach(dot => dot.style.opacity = '.5')
        dots[num-1].style.opacity = 1
    }

    prevBtn.addEventListener('click', () => {
        numberSlide <= 1 ? numberSlide = slides.length : numberSlide--
        SelectingSlide(numberSlide)
    })

    nextBtn.addEventListener('click', () => {
        numberSlide > slides.length - 1 ? numberSlide = 1 : numberSlide++
        SelectingSlide(numberSlide)
    })







    

    const indicators = document.createElement('ol')
          
    indicators.classList.add('carousel-indicators')
    document.querySelector('.offer__slider').append(indicators)

    slides.forEach((item, index) => {
        const dot = document.createElement('li')
        dot.classList.add('dot')
        dot.setAttribute('data-slide-to', index + 1)
        indicators.append(dot)
        dots.push(dot)
    })

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            numberSlide = index + 1
            SelectingSlide(numberSlide)
        })
    })

    SelectingSlide(numberSlide)
}

module.exports = slider

/***/ }),

/***/ "./public/js/modules/tabs.js":
/*!***********************************!*\
  !*** ./public/js/modules/tabs.js ***!
  \***********************************/
/***/ ((module) => {

const tabs = () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent')
    
    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show')
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    const showTabContent = (index = 0) => {
        tabs[index].classList.add('tabheader__item_active')
        tabsContent[index].classList.add('show', 'fade')
        tabsContent[index].classList.remove('hide')
    }

    tabs.forEach((item, index) => {
        item.addEventListener('click', () => {
            hideTabContent()
            showTabContent(index)
        })
    })

    hideTabContent()
    showTabContent()
}

module.exports = tabs

/***/ }),

/***/ "./public/js/modules/timer.js":
/*!************************************!*\
  !*** ./public/js/modules/timer.js ***!
  \************************************/
/***/ ((module) => {

const timer = () => {
    const getDataForTimer = (deadline) => {
        const time = Date.parse(deadline) - Date.parse(new Date()),
              days = Math.floor(time / (1000 * 60 * 60 * 24)),
              hours = Math.floor(time / (1000 * 60 * 60) % 24),
              minutes = Math.floor((time / 1000 / 60) % 60),
              seconds = Math.floor((time / 1000) % 60)

        return {
            total: time,
            days,
            hours,
            minutes,
            seconds
        }
    }

    const getzero = (num) => {
        return num >= 0 && num < 10 ? `0${num}` : num
    }

    const setClock = (deadline) => {
        const days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000)

        updateClock()

        function updateClock() {
            const time = getDataForTimer(deadline)

            days.innerHTML = getzero(time.days)
            hours.innerHTML = getzero(time.hours)
            minutes.innerHTML = getzero(time.minutes)
            seconds.innerHTML = getzero(time.seconds)

            if(timeInterval <= 0) clearInterval(updateClock, 1000)
        }
    }

    setClock('2021-08-31')
}

module.exports = timer

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./public/js/modules/tabs.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./public/js/modules/calc.js"),
          cards = __webpack_require__(/*! ./modules/cars */ "./public/js/modules/cars.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./public/js/modules/forms.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./public/js/modules/modal.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./public/js/modules/slider.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./public/js/modules/timer.js")
    
    tabs()
    
    calc()
    
    cards()
    
    forms()
    
    modal()
    
    slider()
    
    timer()
    
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map