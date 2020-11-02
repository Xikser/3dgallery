const scene = document.querySelector('.scene')
const gallery = document.querySelector('.gallery-container')
const sliderArray = Array.from(document.querySelectorAll('.slider'));
const sliderClass = 'transform-slider'
const hideSlider = 'hide-slider'

window.addEventListener('keydown', (e) => {
    const currentSlider = document.querySelector('.current-slider')
    const nextSlider = getNextSlider(currentSlider)
    const previousSlider = getPreviousSlider(currentSlider)
    
    changeCurrentSlider(e, currentSlider, nextSlider, previousSlider)
})

const changeCurrentSlider = (e, current, next, previous) => {
    const sliderIndex = getSliderIndex(current)

    if(e.key === 'ArrowUp' && sliderIndex < sliderArray.length - 1) {
        current.classList.remove('current-slider')
        next.classList.add('current-slider')
        transformForwardSlider(current, next)
        changeSliderOpacity(current, next, sliderIndex)
    }
    
    if(e.key === 'ArrowDown' && sliderIndex > 0 ) {
        current.classList.remove('current-slider')
        previous.classList.add('current-slider')
        transformBackwardSlider(current, previous, sliderIndex)
    }
    
    if(e.key === 'ArrowDown') {
    }
}

const getPreviousSlider = (currentSlider) => {
    const previousSlider = currentSlider.previousElementSibling
    return previousSlider
}

const getNextSlider = (currentSlider) => {
    const nextSlider = currentSlider.nextElementSibling
    return nextSlider
}

const setNextSlider = (slider) => {
    slider.classList.add('current-slider')
}

const getSliderIndex = (current) => {
    var index = 0

    for(const slider of sliderArray) {
        if(slider === current) {
            return index
        }
        index++
    }
    return sliderArray.length - 1
}

const transformForwardSlider = (slider, nextSlider) => {
    slider.classList.add(hideSlider)
    slider.style.visibility = 'hidden'
    nextSlider.classList.remove(sliderClass)
}

const transformBackwardSlider = (current, previous, index) => {
    // console.log(slider)
    current.classList.add(sliderClass)
    previous.style.visibility = 'visible'
    previous.classList.remove(hideSlider)
    clearSliderStyle(previous)
}

const changeSliderOpacity = (previous, current, index) => {
    if(index >= 0 && index < 5) {
        const nextSlider = current.nextElementSibling
        const thirdSlider = nextSlider.nextElementSibling
        
        previous.style.opacity = '0'
        current.style.opacity = '.9'
        nextSlider.style.opacity = '.3'
        thirdSlider.style.opacity = '.1'

        clearSliderStyle(previous)

    } else if (index == 5) {
        const nextSlider = current.nextElementSibling
        previous.style.opacity = '0'
        current.style.opacity = '.9'
        nextSlider.style.opacity = '.3'
        clearSliderStyle(previous)
    }
    
    if (index == 6) {
        current.style.opacity = '.9'
        clearSliderStyle(previous)
    }
}

const clearSliderStyle = (previous) => {
    const TIME = 1200

    setTimeout(() => {
        previous.style.opacity = ''
        nextSlider.style.opacity = ''
        thirdSlider.style.opacity = ''
    }, TIME)
}