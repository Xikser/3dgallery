const scene = document.querySelector('.scene')
const gallery = document.querySelector('.gallery-container')
const sliderArray = Array.from(document.querySelectorAll('.slider'));
const sliderClass = 'transform-slider'
const hideSlider = 'hide-slider'

//arrows
const arrowUp = document.querySelector('.arrow--up')
const arrowDown = document.querySelector('.arrow--down')

window.addEventListener('keydown', (e) => {
    changeCurrentSlider(e)
})

document.querySelectorAll('.arrow').forEach(arrow => arrow.addEventListener('click', () => {
    changeCurrentSlider(arrow)
}))

function getCurrentSlider() {
    const current = document.querySelector('.current-slider')
    return current
}

const changeCurrentSlider = (e) => {
    //current = slider-0
    const current = getCurrentSlider()
    const next = getNextSlider(current)
    const previous = getPreviousSlider(current)
    const index = getSliderIndex(current)
    const eventType = event.type

    if (eventType === 'keydown') {
        if (e.key === 'ArrowUp' && index < sliderArray.length - 1) {
            current.classList.remove('current-slider')
            next.classList.add('current-slider')

            transformForwardSlider(current, next)
            changeSliderVisibility(e, current, next, index)
            clickArrowAnimation(arrowUp)
        }

        if (e.key === 'ArrowDown' && index > 0) {
            current.classList.remove('current-slider')
            previous.classList.add('current-slider')

            transformBackwardSlider(current, previous)
            changeSliderVisibility(e, current, next, index)
            clickArrowAnimation(arrowDown)
        }
    }
    //on click event
    else if (eventType === 'click') {
        if (e.classList.contains('arrow--up') && index < sliderArray.length - 1) {
            current.classList.remove('current-slider')
            next.classList.add('current-slider')

            transformForwardSlider(current, next)
            changeSliderVisibility(e, current, next, index)
            clickArrowAnimation(arrowUp)
        }

        if (e.classList.contains('arrow--down') && index > 0) {
            current.classList.remove('current-slider')
            previous.classList.add('current-slider')

            transformBackwardSlider(current, previous)
            changeSliderVisibility(e, current, next, index)
            clickArrowAnimation(arrowDown)
        }
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

    for (const slider of sliderArray) {
        if (slider === current) {
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

const changeSliderVisibility = (e, previous, current, index) => {
    //current -> previous
    //next -> current

    if (e.key === 'ArrowUp' || e.classList.contains('arrow--up')) {
        if (index >= 0 && index < 5) {
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

    if (e.key === 'ArrowDown' || e.classList.contains('arrow--down')) {
        if (index == 7) {
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

        if (index < 6) {
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

const clickArrowAnimation = (arrow) => {
    arrow.classList.add('arrow--clicked')

    setTimeout(() => {
        arrow.classList.remove('arrow--clicked')
    }, 200)
}