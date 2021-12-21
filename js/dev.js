const swiper = new Swiper('.top-banner__wrap', {
    on: {
        slideChange: function () {
            const index_currentSlide = this.realIndex + 1;
            if(index_currentSlide > 9) {
                $('.top-banner__arrows .slide-count').text(index_currentSlide);
            } else {
                $('.top-banner__arrows .slide-count').text('0' + index_currentSlide);
            }
        },
    },
    // Optional parameters
    // direction: 'horisontal',
    loop: true,

    // If we need pagination
    // pagination: {
    //     el: '.swiper-pagination',
    // },
    //
    // // Navigation arrows
    navigation: {
        nextEl: '.top-banner__arrows .arrows__next',
        prevEl: '.top-banner__arrows .arrows__prev',
    },

    //
    // // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
});

const mainProducts = new Swiper('.main-products__slider', {
    loop: true,
    slidesPerView: "4",
    spaceBetween: 40,
    navigation: {
        nextEl: '.main-products__arrows .arrows__next',
        prevEl: '.main-products__arrows .arrows__prev',
    },
});

const tavrosGroup = new Swiper('.tavros-group__slider', {
    on: {
        slideChange: function () {
            const index_currentSlide = this.realIndex + 1;
            if(index_currentSlide > 9) {
                $('.tavros-group__arrows .slide-count').text(index_currentSlide);
            } else {
                $('.tavros-group__arrows .slide-count').text('0' + index_currentSlide);
            }
        },
    },
    freeMode: true,
    navigation: {
        nextEl: '.tavros-group__arrows .arrows__next',
        prevEl: '.tavros-group__arrows .arrows__prev',
    },
});

var mouseCursor = document.querySelector('.cursor');
var dataAttr = document.querySelectorAll('[data-cursor]');

window.addEventListener('mousemove', moveCursor);

function moveCursor(e) {
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
}



function setTerritoryPos() {
    $('.territory__item').on('mouseover', function () {
        $('.territory__item').removeClass('is-active');
        $(this).addClass('is-active');
        $('.territory__item').attr('data-position', $(this).index() + 1);
    })
}

$(document).ready(function () {
    setTerritoryPos();

    $(document).on('mouseover', '[data-cursor]:not(.cursor-active)', function () {
        let dataClass = $(this).attr('data-cursor');
        let dataImg = $(this).attr('data-cursor-img');
        $(this).addClass('cursor-active');
        $('.cursor').addClass(dataClass);
        $('.cursor').addClass('cursor-is-active');
        $('.cursor').css('background-image', 'url(' + dataImg + ')');
    })
    $(document).on('mouseleave', '.cursor-active[data-cursor]', function () {
        let dataClass = $(this).attr('data-cursor');
        $(this).removeClass('cursor-active');
        $('.cursor').removeClass('cursor-is-active');
        $('.cursor').removeClass(dataClass);
        // $('.cursor').css({ 'background-image' : ''});
    })
})
