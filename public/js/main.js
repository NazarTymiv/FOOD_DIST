import tabs from "./modules/tabs"
import calc from "./modules/calc"
import cards from "./modules/cars"
import forms from "./modules/forms"
import modal from "./modules/modal"
import slider from "./modules/slider"
import timer from "./modules/timer"

window.addEventListener("DOMContentLoaded", () => {
    tabs('.tabheader__item', '.tabcontent', 'tabheader__item_active')

    calc()

    cards()

    forms('form')

    modal('[data-modal]', '.modal')

    slider({
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    })

    timer('2021-08-31')
});
