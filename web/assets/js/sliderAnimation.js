for (const slider of sliderArray) {
    const sliderCircle = slider.querySelector(':scope .circle')
    const socialMediaContent = slider.querySelector(':scope .socialmedia-content')
    const socialMediaBox = socialMediaContent.querySelectorAll(':scope .socialmedia-box')
    const imageBox = slider.querySelector(':scope .image-box')
    const image = imageBox.querySelector(':scope img')
    const contentBox = imageBox.querySelector(':scope .content-box')

    sliderCircle.addEventListener('click', () => {
        setSocialMediaContentStyle(slider, socialMediaContent, socialMediaBox)
    })

    image.addEventListener('click', () => {
        setImageStyle(image, imageBox)

        setTimeout(() => {
            showContent(contentBox, imageBox)
        }, 0)
    })
}


//circles animation

const setSocialMediaContentStyle = (slider, socialMediaContent, socialMediaBox) => {
    var circleIsVisible = false

    if (!socialMediaContent.classList.contains('socialmedia--visible')) {
        socialMediaContent.classList.add('socialmedia--visible')
        circleIsVisible = true
        moveControlMap(circleIsVisible)
        showBoxes(slider, socialMediaBox)
    } else {
        hideBoxes(socialMediaBox)

        setTimeout(() => {
            circleIsVisible = false
            moveControlMap(circleIsVisible)
            socialMediaContent.classList.remove('socialmedia--visible')
        }, 1500)
    }
}

const showBoxes = (slider, box) => {
    if (slider.classList.contains('slider--left')) {
        setTimeout(() => {
            box[0].style.left = '-150px'
            box[1].style.left = '-50px'
            box[2].style.left = '45px'
        }, 200)
    } else if (slider.classList.contains('slider--right')) {
        setTimeout(() => {
            box[0].style.left = '445px'
            box[1].style.left = '350px'
            box[2].style.left = '250px'
        }, 200)
    } else {
        setTimeout(() => {
            box[0].style.bottom = '-100px'
            box[0].style.left = '45px'

            box[1].style.bottom = '-100px'
            box[1].style.left = '150px'

            box[2].style.bottom = '-100px'
            box[2].style.left = '250px'
        }, 200)
    }
}

const hideBoxes = (box) => {
    box[0].style.left = ''
    box[1].style.left = ''
    box[2].style.left = ''

    box[0].style.bottom = ''
    box[1].style.bottom = ''
    box[2].style.bottom = ''
}

// end circles animation //

//move control map //

const moveControlMap = (status) => {
    const currentSlider = getCurrentSlider()
    const controlMap = document.querySelector('.control-map')

    if (status == true && (currentSlider.classList.contains('slider--after-0') || currentSlider.classList.contains('slider--after-7'))) {
        controlMap.style.left = "65%"
    } else {
        controlMap.style.left = ''
    }
}

//end control map section //

//content box section //

const setImageStyle = (image, imageBox) => {
    if (!imageBox.classList.contains('--clicked')) {
        image.style.borderRadius = '0'
        image.classList.add('--image-clicked')

        imageBox.classList.add('--clicked')
        imageBox.classList.add('--clicked-style')

        transformImage(imageBox, image)
    } else {
        image.style.borderRadius = '50%'
        image.classList.remove('--image-clicked')

        imageBox.classList.remove('--clicked')
        imageBox.classList.remove('--clicked-style')

        resetImageStyle(imageBox, image)
    }
}

const transformImage = (imageBox, image) => {
    const slider = imageBox.parentNode.parentNode

    if (slider.classList.contains('slider--right')) {
        image.style.boxShadow = "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)"
        image.style.position = 'relative'
        image.style.left = '35%'
        image.style.maxHeight = '450px'

        imageBox.style.left = '-25%'
        imageBox.style.top = '-10%'
        imageBox.style.maxHeight = '390px'

    } else if (slider.classList.contains('slider--left')) {
        //left sliders
        image.style.position = 'relative'
        image.style.boxShadow = "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)"
        imageBox.style.maxHeight = '390px'
        image.style.maxHeight = '450px'

        image.style.left = '-30%'
        imageBox.style.left = '20%'
        imageBox.style.top = '-10%'

    } else {
        //centered sliders
        image.style.boxShadow = "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)"
        image.style.position = 'relative'
        image.style.left = '35%'
        image.style.maxHeight = '450px'

        imageBox.style.left = '-5%'
        imageBox.style.top = '-10%'
        imageBox.style.maxHeight = '390px'
    }

}

const resetImageStyle = (imageBox, image) => {
    image.style.left = ''
    imageBox.style.left = ''
    imageBox.style.top = ''
}

const showContent = (content, imageBox) => {
    const slider = imageBox.parentNode.parentNode

    if (imageBox.classList.contains('--clicked')) {
        content.style.visibility = 'visible'
        content.style.opacity = '1'

        if (!slider.classList.contains('slider--left')) {
            content.style.left = '50%'

            setTimeout(() => {
                content.style.left = '0'
            }, 300)
        } else {
            content.style.left = '0'

            setTimeout(() => {
                content.style.left = 'calc(100% - 400px)'
            }, 300)
        }


        //transform text on mousemove
        content.addEventListener('mousemove', (e) => {
            const title = content.querySelector(':scope h1')
            const text = content.querySelector(':scope p')

            if (slider.classList.contains('slider--left')) {
                //left sliders
                let xAxis = (content.offsetWidth / 10 - e.pageX / 32) / 2
                let yAxis = (content.offsetHeight / 2 - e.pageY / 3) / 10

                transformContent(title, text, xAxis, yAxis)
            } else if (slider.classList.contains('slider--right')) {
                //right sliders
                let xAxis = (content.offsetWidth / 6 - e.pageX / 15) / 2
                let yAxis = (content.offsetHeight / 2 - e.pageY / 3) / 10

                transformContent(title, text, xAxis, yAxis)
            } else {
                //centered axis
                let xAxis = (content.offsetWidth / 2 - e.pageX / 3) / 10
                let yAxis = (content.offsetHeight / 2 - e.pageY / 3) / 10

                transformContent(title, text, xAxis, yAxis)
            }
        })


        //reset transform
        content.addEventListener('mouseleave', () => {
            const title = content.querySelector(':scope h1')
            const text = content.querySelector(':scope p')

            resetTransformContent(title, text)
        })

    } else {
        resetContentStyle(content)
    }
}

const transformContent = (title, text, x, y) => {
    title.style.transform = `translateZ(25px) rotateY(${x}deg) rotateX(${y}deg)`
    text.style.transform = `translateZ(10px) rotateY(${x}deg) rotateX(${y}deg)`
}

const resetTransformContent = (title, text) => {
    title.style.transition = 'all .3s ease-out'
    text.style.transition = 'all .3s ease-out'
    title.style.transform = ''
    text.style.transform = ''

    setTimeout(() => {
        title.style.transition = ''
        text.style.transition = ''
    }, 0)
}

const resetContentStyle = (content) => {
    content.style.visibility = ''
    content.style.width = ''
    content.style.height = ''
    content.style.opacity = ''
    content.style.left = ''
}