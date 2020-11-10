const scene = document.querySelector('.scene')
const gallery = document.querySelector('.gallery-container')
const sliderArray = Array.from(document.querySelectorAll('.slider'));
const sliderClass = 'transform-slider'
const hideSlider = 'hide-slider'

window.addEventListener('keydown', (e) => {
    const currentSlider = getCurrentSlider()
    const nextSlider = getNextSlider(currentSlider)
    const previousSlider = getPreviousSlider(currentSlider)
    
    changeCurrentSlider(e, currentSlider, nextSlider, previousSlider)
})

function getCurrentSlider() {
    const current = document.querySelector('.current-slider')
    return current
}

const changeCurrentSlider = (e, current, next, previous) => {
    const sliderIndex = getSliderIndex(current)
    //current = slider-0

    if(e.key === 'ArrowUp' && sliderIndex < sliderArray.length - 1) {
        current.classList.remove('current-slider')
        next.classList.add('current-slider')
        transformForwardSlider(current, next)
        changeSliderVisible(e, current, next, sliderIndex)
    }
    
    if(e.key === 'ArrowDown' && sliderIndex > 0 ) {
        current.classList.remove('current-slider')
        previous.classList.add('current-slider')
        transformBackwardSlider(current, previous)
        changeSliderVisible(e, current, next, sliderIndex)
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

const transformBackwardSlider = (current, previous) => {
    current.classList.add(sliderClass)
    previous.style.visibility = 'visible'
    previous.classList.remove(hideSlider)
}

const changeSliderVisible = (e, previous, current, index) => {
    //current -> previous
    //next -> current

    if(e.key === 'ArrowUp') {
        if(index >= 0 && index < 5) {
            const nextSlider = current.nextElementSibling
            const thirdSlider = nextSlider.nextElementSibling

            setTimeout(() => {
                current.style.opacity = '.9'
                nextSlider.style.opacity = '.5'
                thirdSlider.style.opacity = '.3'
            }, 0)

            clearSliderStyle(previous)
            
        } else if (index == 5) {
            const nextSlider = current.nextElementSibling

            setTimeout(() => {
                current.style.opacity = '.9'
                nextSlider.style.opacity = '.5'
                clearSliderStyle(previous)
            }, 0)
        }
        
        if (index == 6) {
            current.style.opacity = '.9'
            clearSliderStyle(previous)
        }
    }
    
    if(e.key === 'ArrowDown') {
        if(index == 7) {
            const nextSlider = previous.previousElementSibling
            setTimeout(() => {
                nextSlider.style.opacity = '.9'
                previous.style.opacity = ''
                previous.style.visibility = ''
            }, 0)
            
        } else if (index < 7) {
            const nextSlider = previous.previousElementSibling
            const thirdSlider = previous.nextElementSibling

            setTimeout(() => {
                nextSlider.style.opacity = '.9'
                previous.style.opacity = '.5'
                thirdSlider.style.opacity = ''   
                thirdSlider.style.visibility = ''     
            }, 0)
        }

        if(index < 6) {
            const thirdSlider = previous.nextElementSibling
            const x = thirdSlider.nextElementSibling

            setTimeout(() => {
                x.style.opacity = ''
                x.style.visibility = ''
            }, 0)
        }
    }
}

const clearSliderStyle = (slider) => {
    const TIME = 1200

    setTimeout(() => {
        slider.style.opacity = ''
        slider.style.visibility = ''
    }, TIME)
}