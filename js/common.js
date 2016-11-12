(function() {
  var $menu;
  $menu = $(".ui-menu");
  return $menu.on("click", function() {
    if ($("body").hasClass("js-menu")) {
      return $("body").removeClass("js-menu");
    } else {
      return $("body").addClass("js-menu");
    }
  });
})();

$(function() {
  var imageLoaded, items, lastTimer, timeend, updateCounter;
  items = [];
  timeend = false;
  setTimeout(function() {
    timeend = true;
      $('#link-next-slide .btn-arrow').addClass('animates');
    //console.log('imageLoaded ready');
    return imageLoaded();
  }, 200);
  lastTimer = setTimeout(function() {
    console.log('begin expired timer');
    timeend = true;
    items = [];
    console.log('imageLoaded time is expired');
    return imageLoaded();
  }, 8000);
  $("body *").each(function() {
    var src, tag;
    tag = this.tagName.toLowerCase();
    if (tag === 'img') {
      src = $(this).attr('src');
    } else if ($(this).css('background-image') !== 'none') {
      src = $(this).css('background-image');
      src = src.match(/\((.*?)\)/)[1].replace(/('|")/g, '');
    }
    if (src && $.inArray(src, items) === -1) {
      return items.push(src);
    }
  });
  imageLoaded = function() {
    if (timeend && items.length === 0) {
      clearTimeout(lastTimer);
      $("body").addClass("preloadready");
      $(document).trigger("preloadready");
      return setTimeout(function() {
        $(".vlogo").attr("class", "vlogo fill");
        return $("animate").each(function() {
          return $(this)[0].beginElement();
        });
      }, 1000);
    }
  };
  updateCounter = function() {
    var index;
    index = $.inArray(this.src, items);
    items.splice(index, 1);
    if (items.length === 0) {
      return imageLoaded();
    }
  };
  return $(items).each(function() {
    var item;
    item = new Image();
    item.src = this;
    return $(item).on('load', updateCounter);
  });
       
    
});

(function() {
  return $(document).on("preloadready", function() {
    if ($('[data-name=Главная]').length) {
        return setTimeout(function() {
          return $(".ui-menu").removeClass("js-demo");
        }, 5000);
    } else {
        return $(".ui-menu").removeClass("js-demo");
    }
  });
})();


$(function(){

    $('.contacts, .case, .content, .ui').wrapAll('<div class="content-perspective"/>');
    $('.content-perspective').append('<div class="click-close-menu"/>');
    
    if ($('.portfolio').length && $('.intro-header').length) {
        $('.content-perspective').addClass('ov-hidd');
    }
    
    $('#link-next-slide').on('click', function(){
        $('.slider-ui-arrow--r').click();
    });
    
    $('.menu').append('<div class="close-menu"><i/><i/></div>');

    $('.click-close-menu, .close-menu').on('click', function(){
        $('body').removeClass('js-menu');
    });
    
    
    if ($('.countdown').length) {
            
        $('.countdown').each(function(){

            var ts = eval($(this).data('countdown'));
            
            var note = $(this).next('.countdown-note')
            
            $(this).countdown({
                timestamp	: ts,
                callback	: function(days, hours, minutes, seconds){

                    var message = "<span>Дней</span><span>Часов</span><span>Минут</span><span>Секунд</span>";

                    note.html(message);
                }
            });
            
        });
        
    }

    
});