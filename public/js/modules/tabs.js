const tabs = (tabsSelector, tabsContentSelector, activeClass) => {
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector)
    
    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show')
        })

        tabs.forEach(item => {
            item.classList.remove(activeClass)
        })
    }

    const showTabContent = (index = 0) => {
        tabs[index].classList.add(activeClass)
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

export default tabs