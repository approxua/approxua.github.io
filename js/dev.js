let $body = $('body');
let $window = $(window);

const brandsSwiper = new Swiper('.brands', {
    slidesPerView: 'auto',
    loop: false,
    freeMode: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    }
});

function getBodyClass() {
    if ($body.hasClass('body--fixed')) {
        return false
    }
}

function animationHeader() {
    const header = $('.header');
    const headerHeight = header.outerHeight();
    var $currentScroll = 0;

    if (getBodyClass()) return false

    $window.on('scroll', function () {
        let $nextScroll = $(this).scrollTop();

        if ($nextScroll >= headerHeight && $nextScroll > $currentScroll) {
            header.slideUp(150)
        } else {
            header.slideDown(150)
        }

        $currentScroll = $nextScroll;
    })
}

function animateScroll() {
    let timer = null;
    let oldDistance = $window.scrollTop();

    $window.on('scroll', function () {
        let footer = $('.footer')
        if ((footer.offset().top) >= ($window.scrollTop() + $window.innerHeight())) {
            clearTimeout(timer);

            let newDistance = $window.scrollTop();
            let distance = oldDistance < newDistance ? newDistance + 50 : newDistance - 50;

            $('.decor').css({'top': `${distance}px`});

            timer = setTimeout(function () {
                let difference = newDistance - oldDistance;
                let formattedDifference = difference < 0 ? difference * -1 : difference * 1;

                if (formattedDifference > 200) {
                    oldDistance = newDistance;
                    $('.decor').css({'top': `${oldDistance}px`})
                }
            }, 400);
        }
    });
}

let activeIndex = 0;

function nextPresentationSlide(section, index) {
    if(index !== activeIndex) {
        activeIndex = index;

        let imgClass = '.parallax__img';
        let imgActiveClass = 'parallax__img--active';
        let imgPrevClass = 'parallax__img--prev';
        let imgNextClass = 'parallax__img--next';

        let textClass = '.parallax__text';
        let textActiveClass = 'parallax__text--active';
        let textPrevClass = 'parallax__text--prev';
        let textNextClass = 'parallax__text--next';

        let prevSlide = index - 1;
        let nextSlide = index + 1;

        if (prevSlide < 0) {
            prevSlide = null;
        }

        if (nextSlide < 0) {
            nextSlide = null;
        }

        section.find(imgClass).removeClass(`${imgActiveClass} ${imgPrevClass} ${imgNextClass}`);
        section.find(`.parallax__img:eq(${prevSlide})`).addClass(imgPrevClass);
        section.find(`.parallax__img:eq(${index})`).addClass(imgActiveClass);
        section.find(`.parallax__img:eq(${nextSlide})`).addClass(imgNextClass);

        section.find(textClass).removeClass(textActiveClass);
        $(`.parallax__text:eq(${index})`).addClass(textActiveClass);
    }
}

function parallaxSlider(el) {
    let header = $('.header');
    let section = $(`.${el}`);
    let wrap = section.find('.parallax__wrap');
    let img = section.find('.parallax__img')
    let activeImg = section.find('.parallax__img--active');
    let height = img.innerHeight() * img.length;
    let index = 0;
    let distance = img.innerHeight() / 2;
    let prevSlide = 0;

    wrap.css({'height': height});
    activeImg.next().addClass('parallax__img--next');

    let scrollTop = $window.scrollTop();
    let sectionOffset = section.offset().top;
    let scroll = scrollTop - section.offset().top;

    if ((scrollTop > sectionOffset) && (scrollTop + $window.innerHeight() < sectionOffset + height)) {

        if (scroll > distance) {
            prevSlide = distance;
            distance = distance + img.innerHeight();
            index++
        } else if (scroll < prevSlide) {
            distance = distance - img.innerHeight();
            prevSlide = distance;
            index--;
        }

        nextPresentationSlide(section, index);
    }

    $window.on('scroll', function () {
        scrollTop = $window.scrollTop();
        sectionOffset = section.offset().top;
        let parallaxFlag = false;

        $('.parallax').each(function (i) {
            if ((scrollTop > $(this).offset().top) && (scrollTop + $window.innerHeight() < $(this).offset().top + $(this).innerHeight())) {
                parallaxFlag = true;

                if (parallaxFlag) {
                    header.addClass('header--parallax');
                }
            }
        })

        if (!parallaxFlag) {
            header.removeClass('header--parallax');
        }

        if ((scrollTop > sectionOffset) && (scrollTop + $window.innerHeight() < sectionOffset + height)) {

            scroll = scrollTop - section.offset().top;

            if (scroll > distance) {
                prevSlide = distance;
                distance = distance + img.innerHeight();
                index++
            } else if (scroll < prevSlide) {
                distance = distance - img.innerHeight();
                prevSlide = distance;
                index--;
            }

            nextPresentationSlide(section, index);
        }
    })


}


$(document).ready(function () {
    animationHeader();
    animateScroll();
    parallaxSlider('presentation');
    parallaxSlider('gallery');
})