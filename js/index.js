/*
* textSlider 0.1
* Copyright (c) 2014 tnnyang http://tnnyang.cnblogs.com/
* Dependence Zepto v1.1.6 & fx.js & touch-0.2.14.min.js
* Author by 小坏
*/
(function ($) {
  $.fn.textSlider = function (options) {
    //默认配置
    var defaults = {
      speed: 40, //滚动速度,值越大速度越慢
      line: 1 //滚动的行数
    };

    var opts = $.extend({}, defaults, options);

    var $timer;
    function marquee(obj, _speed) {
      var top = 0;
      var margintop;
      $timer = setInterval(function () {
        top++;
        margintop = 0 - (top/100) + 'rem';
        obj.find("ul").animate({
          marginTop: margintop
        }, 0, function () {
          var s = Math.abs(parseFloat($(this).css("margin-top")));
          if (s >=.3) {
            top = 0;
            $(this).css("margin-top", 0); //确保每次都是从0开始，避免抖动
            $(this).find("li").slice(0, 1).appendTo($(this));
          }
        });
      }, _speed);
    }

    this.each(function () {
      var speed = opts["speed"], line = opts["line"], _this = $(this);
      var $ul = _this.find("ul");
      if ($ul.height() > _this.height()) {
        marquee(_this, speed);
      }

      //触摸开始
      _this.on('touchstart', function (ev) {
        ev.preventDefault();
        clearInterval($timer);
      });

      //向上滑动
      _this.on('swipeup', function (ev) {
        ev.preventDefault();
        clearInterval($timer);
        if ($ul.height() > _this.height()) {
          for (i = 0; i < opts.line; i++) {
            $ul.find("li").first().appendTo($ul);
          }
          $ul.css("margin-top", 0);
        }
      });
    });
  }
})(Zepto);

$("#j_actLotteryList").textSlider({
    speed: 50,
    line:1
});