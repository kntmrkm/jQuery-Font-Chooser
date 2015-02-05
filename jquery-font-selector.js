/**
 * jQuery Font Selector - jQuery plugin
 * Forked from https://github.com/CD1212/jQuery-Font-Chooser
 */
$(function(){
  var settings;
  var methods = {
    init : function(options) {
      var root = this;
      var visible = false;
      var selected = false;

      var displayName = function(font) {
        if (settings['hide_fallbacks']) {
          return font.substr(0, font.indexOf(','));
        } else {
          return font;
        }
      };

      var getCSS = function(font) {
        font.shift();
        return font
      };

      var select = function(font) {
        root.find('span').html(displayName(font).replace(/["']{1}/gi, ''));
        font = getCSS(font.split(',')).toString();

        root.css('font-family', font);
        selected = font;

        root.callback(selected);
      };

      settings = $.extend( {
        selected: function(style) {
          console.log(style);
        },
        'initial': '',
        'fonts': ['Display Name, Font Name, Fallback Fonts'],
        'hide_fallbacks': true
      }, options);
      root.callback = settings['selected'];

      // Setup markup
      $(this).prepend('<span>' + settings['initial'].replace(/'/g,'&#039;') + '</span>');
      var ul = $('<ul class="font-selector-ul"></ul>').appendTo(this);
      ul.hide();

      for (var i = 0; i < settings['fonts'].length; i++) {
        var item = $('<li>' + displayName(settings['fonts'][i]) + '</li>').appendTo(ul);
        $(item).css('font-family', settings['fonts'][i]);
      }

      if (settings['initial'] != '') {
        select(settings['initial']);
      }

      ul.find('li').click(function() {
        if (!visible) { return; }
        ul.slideUp('fast', function() {
          visible = false;
        });

        select($(this).css('font-family'));
      });

      $(this).click(function(event) {
        if (visible) { return; }
        event.stopPropagation();
        ul.slideDown('fast', function() {
          visible = true;
        });
      });

      $('html').click(function() {
        if (visible) {
          ul.slideUp('fast', function() {
            visible = false;
          });
        }
      });
    },
    selected: function() {
      return this.css('font-family');
    }
  };

  $.fn.fontSelector = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.fontSelector' );
    }
  };
});

