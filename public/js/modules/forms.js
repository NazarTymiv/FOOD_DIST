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