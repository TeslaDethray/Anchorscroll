(function($) {
  $.fn.anchorscroll = function(options) {

    var settings = $.extend({
      listContainer:  false,
      listType:       'ul',
      listID:         'anchorscroll-menu',
      anchorTarget:   'a',
      appearAt:       0,
    }, options);

    return this.each(function() {

      var anchorLocations = new Array();
      var appearLocation = 0;
      var ylocation = Math.floor($(this).offset().top);
      var targetName = settings.listType + '#' + settings.listID;

      var links = '<' + settings.listType + ' id="' + settings.listID + '">';
      
      $(this).children(settings.anchorTarget).each(function() {
        if((settings.anchorTarget != 'a') || (typeof $(this).attr('href') == 'undefined')) {
          var offset = $(this).offset().top;
          links += '<li class="anchor-' + offset + '"><a href="#' + $(this).attr('id') + '">' + $(this).attr('name') + '</a></li>';
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
        $(targetName).children('li').removeClass('active').removeClass('past').removeClass('future');
        $(this).children(settings.anchorTarget).removeClass('active').removeClass('past').removeClass('future');

        for(i = 0; i < anchorLocations.length; i++) {
          if($(window).scrollTop() >= (anchorLocations[i] - Number(settings.appearAt))) {
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
    });
  }
}(jQuery));
