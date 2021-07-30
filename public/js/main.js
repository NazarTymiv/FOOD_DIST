window.addEventListener('DOMContentLoaded', () => {
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

    // TIMER
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

    // MODAL
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

    // USE CLASSES FOR CARDS
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

    // FORM
    const forms = document.querySelectorAll('form')

    const message = {
        loading: `img/form/spinner.svg`,
        success: `Дякуємо! Скоро ми з вами з'яжемось`,
        error: `Щось пішло не так`
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })

        return await res.json()
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

    // SLIDER
    const slides = document.querySelectorAll('.offer__slide'),
          prevBtn = document.querySelector('.offer__slider-prev'),
          nextBtn = document.querySelector('.offer__slider-next'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          widthSliderWrapper = window.getComputedStyle(slidesWrapper).width,
          dots = []

    let numberSlide = 1

    slidesField.style.width = `${100 * slides.length}%`
    slides.forEach(slide => {
        slide.style.width = widthSliderWrapper
    })
    document.querySelector('#total').innerHTML = getzero(slides.length)

    const SelectingSlide = (num) => {
        slidesField.style.transform = `translateX(-${+widthSliderWrapper.slice(0, -2) * (num - 1)}px)`
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



    // SLIDER NAVIGATION
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
})