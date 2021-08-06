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