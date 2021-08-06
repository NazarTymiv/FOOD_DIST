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