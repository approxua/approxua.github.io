let $body = $('body');

const productSwiper = new Swiper('.products', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.products .arrows__right',
        prevEl: '.products .arrows__left',
    },
});

const responseSwiper = new Swiper('.response__slider-wrap', {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 16,
    centeredSlides: true,
    navigation: {
        nextEl: '.response .arrows__right',
        prevEl: '.response .arrows__left',
    },
    breakpoints: {
        1280: {
            slidesPerView: 3,
            loop: false,
            centeredSlides: false
        }
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

    $(window).on('scroll', function () {
        let $nextScroll = $(this).scrollTop();

        if ($nextScroll >= headerHeight && $nextScroll > $currentScroll) {
            header.slideUp(150)
        } else {
            header.slideDown(150)
        }

        $currentScroll = $nextScroll;
    })
}

function showMore() {
    $('.premium__show-more').on('click', function () {
        $('.premium__text').toggleClass('is-active');
        let text = ($(this).html() === 'Learn more') ? 'Learn less' : 'Learn more';
        $(this).html(text);
    })
}

function showMobmenu() {
    let header = $('.header')
    let burger = $('.header__burger');
    let nav = $('.header__nav');
    let shadow = $('.shadow');
    burger.on('click', function () {
        header.toggleClass('header--opened');
        nav.toggleClass('header__nav--opened');
        shadow.toggleClass('shadow--opened');
        $body.toggleClass('body--fixed');
    })

    shadow.on('click', function () {
        header.removeClass('header--opened');
        nav.removeClass('header__nav--opened');
        shadow.removeClass('shadow--opened');
        $body.removeClass('body--fixed');
    })
}

function openSelect() {
    let select = $('.shop__filter');
    let selectPlacehoder;

    select.on('click', function (e) {
        $(this).toggleClass('shop__filter--opened');

        if(e.target.classList.contains('shop__filter-item')) {
            e.preventDefault();
            selectPlacehoder = e.target.textContent;
            $(this).find('.shop__filter-item').removeClass('shop__filter-item--selected');
            $(this).find('.shop__filter-placeholder span').text(selectPlacehoder);
            e.target.classList.add('shop__filter-item--selected')
        }
    })
}

function missClick(){
    var div = $('.shop__filter');
    var button = $('.shop__filter-item');
    $(document).on('click', function (event) {
        if(div.hasClass('shop__filter--opened') && !div.is(event.target) && div.has(event.target).length === 0 && !button.is(event.target) && button.has(event.target).length === 0) {
            div.removeClass('shop__filter--opened');
        }
    })
}


let input = $('.card__count-number');
let curCount = input.val();

function calcCount(input) {
    let pricePerOne = Number($('[data-price]').attr('data-price'));
    let curPrice = parseInt(input.val()) * pricePerOne;

    $('.card__sum-total').text(curPrice.toFixed(2));
    curCount = input.val();
}

function cardCount() {

    let plus = $('.card__count-item--plus');
    let minus = $('.card__count-item--minus');

    input.on('input', function () {

        $(this).val($(this).val().replace(/[^\d]/g, ""));
        if(!$(this).val()) {
            $(this).val(1);
        }

        calcCount(input);
    })

    minus.on('click', function () {
        console.log(curCount);
        if(!(Number(curCount) === 1)) {
            input.val(--curCount)
            calcCount(input);
        }

    })

    plus.on('click', function () {
        input.val(++curCount)
        calcCount(input);
    })
}

function readMoreText() {
    $('.js-read-more-btn').on('click', function () {
        let fullText = $(this).parents('.js-read-more').find('.js-read-more-text').attr('data-text');
        $(this).parents('.js-read-more').find('.js-read-more-text').text(fullText);
        $(this).remove();
    })
}

function accordionInit() {
    $('.accordion__head').on('click', function () {
        if($(this).hasClass('accordion__head--active')) {
            $(this).removeClass('accordion__head--active');
            $(this).siblings('.accordion__content').slideUp();
        } else {
            $(this).parents('.accordion').find('.accordion__head').removeClass('accordion__head--active');
            $(this).parents('.accordion').find('.accordion__content').slideUp();
            $(this).addClass('accordion__head--active');
            $(this).siblings('.accordion__content').slideDown();
        }
    })
}

$(document).ready(function () {
    showMore();
    animationHeader();
    showMobmenu();
    openSelect();
    missClick();
    cardCount();
    readMoreText();
    accordionInit();
})