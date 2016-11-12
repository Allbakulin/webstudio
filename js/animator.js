var animator;

animator = {
  params: {
    vh: 0,
    ct: 0,
    cb: 0
  },
  $items: null,
  init: function() {
    this.$items = $('.animateMe');
    this.updatePosition();
    this.binding();
    return this.checking();
  },
  updateVH: function() {
    return this.params.vh = $(window).height();
  },
  updatePosition: function() {
    this.params.ct = $(window).scrollTop();
    this.params.vh = $(window).height();
    return this.params.cb = this.params.ct + this.params.vh;
  },
  binding: function() {
    $(window).on('resize', $.proxy(this.updateVH, this));
    $(window).on('scroll', $.proxy(this.updatePosition, this));
    return $(window).on('scroll', $.proxy(this.checking, this));
  },
  checking: function() {
    var module;
    module = this;
    this.$items.each(function() {
      var it;
      it = $(this).offset().top;
      if (it <= module.params.cb) {
        return $(this).addClass('animated');
      }
    });
    return this.$items = this.$items.not('.animated');
  }
};

$(document).on('preloadready', $.proxy(animator.init, animator));

$('.case-web-btn').on('click', function() {
  return $('.case-web').toggleClass('view');
});

$(window).on('scroll', function() {
  var ch, ct;
  ct = $(window).scrollTop();
  ch = $(window).height();
  if (ct >= ch) {
    $('.case-btn').addClass('fixed');
    return $('.case-btn').removeClass('static');
  } else {
    $('.case-btn').removeClass('fixed');
    return $('.case-btn').addClass('static');
  }
});

$('.case-btn').on('click', function() {
  return $('.case').toggleClass('js-toggle');
});
