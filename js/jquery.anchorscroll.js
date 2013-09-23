(function($) {
  $.fn.anchorscroll = function(options) {

    var settings = $.extend({
      listContainer:  false,
      listType:       'ul',
      listID:         'anchorscroll-menu',
      anchorTarget:   'a',
      appearAt:       0,
      autoResize:     false
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
          var offset = Math.ceil($(this).offset().top);
          links += '<li class="anchor-' + offset + '">' + $(this).attr('name') + '</li>';
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

        for(i = 0; i < anchorLocations.length; i++) {
          if($(window).scrollTop() >= (anchorLocations[i] - appearLocation)) {
            classname = 'past';
          } else {
            if(classname == 'past') {
              $('.anchor-' + anchorLocations[i - 1]).addClass('active').removeClass('past');
            }
            classname = 'future';
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

      $('body').scrollTop(scrollTo);
     });

     if(settings.autoResize) {
       $(window).resize(function() {
         appearLocation = pickAppearLocation(settings.appearAt);
       });
     }

    });
  }
}(jQuery));
