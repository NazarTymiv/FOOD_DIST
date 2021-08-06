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