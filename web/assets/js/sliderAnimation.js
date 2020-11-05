for(const slider of sliderArray) {
    const sliderCircle = slider.querySelector(':scope .circle')
    const socialMediaContent = slider.querySelector(':scope .socialmedia-content')
    const socialMediaBox = socialMediaContent.querySelectorAll(':scope .socialmedia-box')

    sliderCircle.addEventListener('click', () => {
        // console.log(socialMediaContent)
        socialMediaContent.style.visibility = 'visible'
        socialMediaContent.style.opacity = '1'
     

        setTimeout(() => {
            socialMediaBox[0].style.left = '-150px'
            socialMediaBox[1].style.left = '-50px'
            socialMediaBox[2].style.left = '45px'
        }, 200)
    })
}