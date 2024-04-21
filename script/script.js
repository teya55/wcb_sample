'use strict';

$(function () {
  // ハンバーガーボタンクリックでボタンのアニメーションとナビ開閉
  $('.menu-btn').on('click', function (event) {
    $(event.currentTarget).toggleClass('open');
    $('.main-nav').toggleClass('slide');
  });

  // #で始まるリンクをクリックしたらスムースにスクロール + ナビゲーションを閉じてボタンを元に戻す
  // href属性が#で始まる<a>要素をクリックしたとき
  $('a[href^="#"]').on('click', function (event) {
    // href属性の値を取得
    const href = $(event.currentTarget).attr('href');
    // html要素または変数hrefの値の要素を取得
    const target = $(href === '#' ? 'html' : href);
    // ページトップから要素targetまでの縦方向の距離を取得（横方向はoffset().left）
    const position = target.offset().top;
    // ハンバーガーボタンとナビゲーションをリセット
    $('.menu-btn').removeClass('open');
    $('.main-nav').removeClass('slide');
    // htmlまたはbody要素をpositionまでスクロール
    $('html, body').animate({ scrollTop: position }, 600, 'swing');
  });

  // ページトップへボタン
  const pagetop = $('.page-top');
  // window(node)がスクロールされた時に実行
  $(window).on('scroll', function () {
    // ページトップからのスクロール量が100pxを超えたらボタンを表示（非表示）
    if ($(this).scrollTop() > 100) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
    // 要素を下からフェードインさせるファンクションを呼び出す
    scroll_effect();
    // footer-navファンクションを呼び出す
    nav_slide();
  });
  // ページトップへ500msかけてスムーススクロール
  pagetop.on('click', function () {
    $('body, html').animate({ scrollTop: 0 }, 500, 'linear');
  });

  // スクロールで要素を下からフェードインさせるファンクションを定義
  function scroll_effect() {
    // .item要素に対して繰り返し処理を行う
    $('.item').each(function () {
      const scroll = $(window).scrollTop(); // ブラウザのスクロール量
      const elemPos = $(this).offset().top; // .item要素までの位置
      const windowHeight = $(window).height(); // ブラウザウィンドウの高さ
      // スクロール量が、(.item要素までの位置 - ウィンドウの高さ) + 100px より多くなったら
      if (scroll > elemPos - windowHeight + 100) {
        // .item要素にクラスを追加
        $(this).addClass('scrollin');
      }
    });
  }

  // .footer-navを下スクロールで消し、上スクロールで出すファンクションを定義
  let startPos = 0; // 直前のスクロール位置
  let currentPos = 0; // 現在のスクロール位置
  function nav_slide() {
    // ページトップからのスクロール位置を取得
    currentPos = $(window).scrollTop();
    if (currentPos > startPos && currentPos > 100) {
      $('.footer-nav').addClass('hide');
    } else {
      $('.footer-nav').removeClass('hide');
    }
    // 現在のスクロール位置をstartPosにセット
    startPos = currentPos;
  }
});

// swiperパラメータ
const swiper = new Swiper('.swiper', {
  // 表示スライド数
  slidesPerView: 1,
  // ページネーションを追加
  pagination: {
    el: '.swiper-pagination',
  },
  // ナビボタンを追加
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // オートプレイ
  autoplay: {
    delay: 3000,
    // 最後のスライドまでいくと自動再生を止める
    // stopOnLastSlide: 'false',
  },
  speed: 2000,
  // スライドをループモードに
  loop: true,
  // その他のエフェクト
  // effect: "cube",
  // effect: "flip",
  // フェードエフェクト
  // effect: "fade",
  // fadeEffect: {
  // 	crossFade: true
  // },
});
