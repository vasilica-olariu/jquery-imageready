// jquery.imageready.js
// @weblinc, @jsantell, (c) 2012

;(function( $ ) {
  $.fn.imageready = function ( callback, userSettings ) {
    var $container = $(this),
        options = $.extend( {}, $.fn.imageready.defaults, userSettings ),
        $images = this.find( 'img' ).add( this.filter( 'img' ) ),
        unloadedImages = $images.length;

    function loaded () {
      unloadedImages--;
      $container.trigger('imageready', $this);
      if((unloadedImages > 0) || (callback == null))
        return;

      callback();
      $container.trigger('imagesready');
    }

    function bindLoad () {
      var checkIE, isIE;

      this.one( 'load', loaded );
      isIE = (navigator.appName.indexOf("Internet Explorer")!=-1) ? true : false;

      if ( isIE ) {
        var src   = this.attr( 'src' ),
            param = src.match( /\?/ ) ? '&' : '?';

        param  += options.cachePrefix + '=' + ( new Date() ).getTime();
        this.attr( 'src', src + param );
      }
    }

    return $images.each(function () {
      var $this = $(this);

      if ( !$this.attr('src') )
        return loaded.call($this);

      (this.complete || this.readyState === 4)
        ? loaded.call($this)
        : bindLoad.call($this);
    });
  };

  $.fn.imageready.defaults = {
    cachePrefix: 'random'
  };

})( jQuery );
