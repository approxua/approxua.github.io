const $window = $('window');
const $body = $('body');
const header = $('.header');

setTimeout(function () {

    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        getDirection: true
    });

    scroll.on("scroll", function (t) {
        document.documentElement.setAttribute("data-direction", t.direction);

        if(t.delta.y === 0) {
            header.removeClass('header--active');
        } else {
            header.addClass('header--active');
        }

        if(t.direction === 'down') {
            header.slideUp(150)
        } else {
            header.slideDown(150)
        }

    });
}, 100);

function getBodyClass() {
    if ($body.hasClass('body--fixed')) {
        return false
    }
}

function animationHeader() {
    const headerHeight = header.outerHeight();
    var $currentScroll = 0;

    if (getBodyClass()) return false

    $(window).on('scroll', function () {
        let $nextScroll = $(this).scrollTop();

        if ($nextScroll > headerHeight) {
            header.addClass('header--active');
        } else if ($nextScroll === 0) {
            header.removeClass('header--active');
        }

        if ($nextScroll >= headerHeight && $nextScroll > $currentScroll) {
            header.slideUp(150)
        } else {
            header.slideDown(150)
        }

        $currentScroll = $nextScroll;
    })
}

function coursesSwiper() {
    const tabsSwiper = new Swiper('.tabs', {
        slidesPerView: 'auto',
        slideToClickedSlide: true
    });

    const productSwiper = new Swiper('.courses__swiper', {
        slidesPerView: 4,
        runCallbacksOnInit: true,
        observer: true,
        spaceBetween: 30,
        navigation: {
            nextEl: '.courses__next',
            prevEl: '.courses__prev',
        },
        updateOnImagesReady: true,
    })

    let tabsTab = $('.tabs__tab');
    let activeTab = $('.tabs__tab.tabs__tab--active');
    let tabsScrollbar = $('.js-tabs-scrollbar');

    if (tabsTab.length > 0) {

        setTimeout(function () {
            tabsScrollbar.css('width', activeTab.innerWidth());
            tabsScrollbar.css('left', activeTab.position().left);
        }, )

        let filter = activeTab.attr('data-filter');

        $('.courses__swiper .swiper-slide').css('display', 'none');
        $('.courses__swiper .swiper-slide' + filter).css('display', '');

        productSwiper.updateSize();
        productSwiper.updateSlides();
        productSwiper.updateProgress();
        productSwiper.updateSlidesClasses();
        productSwiper.slideTo(0);

        tabsTab.click(function () {
            tabsTab.removeClass('tabs__tab--active').eq($(this).index()).addClass('tabs__tab--active');

            tabsScrollbar.css('width', $(this).innerWidth());
            tabsScrollbar.css('left', $(this).position().left);

            filter = $(this).attr('data-filter');

            $('.courses__swiper .swiper-slide').css('display', 'none');
            $('.courses__swiper .swiper-slide' + filter).css('display', '');

            productSwiper.updateSize();
            productSwiper.updateSlides();
            productSwiper.updateProgress();
            productSwiper.updateSlidesClasses();
            productSwiper.slideTo(0);

            return false;
        });
    }
}

$(document).ready(function () {
    coursesSwiper();
    // animationHeader();
})