(function($) {
  $.fn.anchorscroll = function(options) {

    var settings = $.extend({
      listContainer:  false,
      listType:       'ul',
      listID:         'anchorscroll-menu',
      anchorTarget:   'a',
      appearAt:       0,
      autoResize:     false,
      beforeListItem: '',
      afterListItem:  ''
    }, options);

    function pickAppearLocation(number) {
      if(number.search('%') > -1) {
        number = number.split('%');
        number = Math.floor($(window).height() * (Number(number[0]) / 100)); 
      }
      return Number(number);
    }

    return this.each(function() {

      var anchorLocations = new Array();
      var appearLocation = pickAppearLocation(settings.appearAt);
      var ylocation = Math.floor($(this).offset().top);
      var menuName = settings.listType + '#' + settings.listID;

      var links = '<' + settings.listType + ' id="' + settings.listID + '">';
      
      $(this).children(settings.anchorTarget).each(function() {
        if((settings.anchorTarget != 'a') || (typeof $(this).attr('href') == 'undefined')) {
          var offset = $(this).offset();
          offset = Math.ceil(offset.top);
          links += '<li class="anchor-' + offset + '">' + settings.beforeListItem + $(this).attr('name') + settings.afterListItem + '</li>';
          $(this).addClass('anchor-' + offset);
          anchorLocations.push(offset);
        }
      });

      links += '</' + settings.listType + '>';

      if(!settings.listContainer) {
        $(this).prepend(links);
      } else {
        $(settings.listContainer).prepend(links);
      }

      $(window).scroll(function() {
        $(menuName).children('li').removeClass('active').removeClass('past').removeClass('future');
        $(this).children(settings.anchorTarget).removeClass('active').removeClass('past').removeClass('future');
        var classname = 'past';

        for(i = 0; i < anchorLocations.length; i++) {
          if($(window).scrollTop() >= (anchorLocations[i] - appearLocation)) {
            classname = 'past';
          } else {
            if(classname == 'past') {
              $('.anchor-' + anchorLocations[i - 1]).addClass('active').removeClass('past');
            }
            classname = 'future';
          }
          //If last item was still designated as in the past, make it the active one.
          if($('.anchor-' + anchorLocations[(anchorLocations.length - 1)]).hasClass('past')) {
            $('.anchor-' + anchorLocations[(anchorLocations.length - 1)]).addClass('active').removeClass('past');
          }  
          $('.anchor-' + anchorLocations[i]).addClass(classname);
        }
      });

     $(menuName).children('li').click(function() {
      var scrollTo = 0;
      var classnames = $(this).attr('class').split(/\s+/);
       
      for(i = 0; i < classnames.length; i++) {
        var classname = classnames[i].split("-");
        if(classname[0] == 'anchor') {
          scrollTo = Number(classname[1]) - appearLocation;
        }
      }

      $('html, body').animate({scrollTop: scrollTo}, 500);
     });

     if(settings.autoResize) {
       $(window).resize(function() {
         appearLocation = pickAppearLocation(settings.appearAt);
       });
     }

    });
  }
}(jQuery));
