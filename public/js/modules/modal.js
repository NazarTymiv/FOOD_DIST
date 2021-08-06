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