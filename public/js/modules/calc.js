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

export default calc