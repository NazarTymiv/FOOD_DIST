const showModal = (modalSelector) => {
    const modalBlock = document.querySelector(modalSelector)

    modalBlock.classList.add('show')
    modalBlock.classList.remove('hide')
    document.body.style.overflow = 'hidden'
}

const hideModal = (modalSelector) => {
    const modalBlock = document.querySelector(modalSelector)

    modalBlock.classList.remove('show')
    modalBlock.classList.add('hide')
    document.body.style.overflow = 'auto'
}

const modal = (triggerSelector, modalSelector) => {
    const modalOpenBtn = document.querySelectorAll(triggerSelector),
          modalBlock = document.querySelector(modalSelector)

    modalOpenBtn.forEach(item => {
        item.addEventListener('click', () => showModal(modalSelector))
    })

    modalBlock.addEventListener('click', e => {
        if(e.target === modalBlock || e.target.getAttribute('data-close') == '') {
            hideModal(modalSelector)
        }
    })

    const openModalScroll = () => {
        if(window.pageYOffset + document.documentElement.clientHeight == document.body.scrollHeight) {
            showModal(modalSelector)
            window.removeEventListener('scroll', openModalScroll)
        }
    }

    window.addEventListener('scroll', openModalScroll)
}

export default modal
export {hideModal, showModal}