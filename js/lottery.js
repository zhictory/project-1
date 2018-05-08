/**
 * 转盘小插件
 * @param {Object} win window对象
 * @param {Object} $ zepto对象
 */
!(function(win, $) {
	var defaultOpt = {
		el: $('#j_lottery'),
        rotateDeg: 3*360	// 默认每次转3圈
    };
    
    function Lottery(opts) {
    	this.opts = $.extend(true, {}, defaultOpt, opts);
    	this.init();
    }
    
    Lottery.prototype = {
    	constructor: Lottery,
    	
    	init: function() {
    		var _this = this;
    		
    		_this.tempDeg = 0;	// 已转的角度
    		_this.isLottery = false;	// 是否正在抽奖
    	},
    	
    	/**
    	 * 运行转盘
    	 * @param {Object} deg 转盘角度
    	 * @param {Function} callback 回调函数
    	 */
    	run: function(deg, callback) {
    		var _this = this;
  
    		if(_this.isLottery) {
    			// 正在抽奖
    			console.log('正在抽奖');
    			return;
    		}
  
  			if(deg < 0) {
  				console.log('请传入角度值');
  				return;
  			}
  			 
    		_this.isLottery = true;
    		
    		// 设置转盘所在角度
    		var targetDeg = 0;
    		if(deg < _this.tempDeg) {
    			targetDeg = 360 - (_this.tempDeg - deg);
    		} else {
    			targetDeg = deg - _this.tempDeg;
    		}
    		_this.tempDeg = _this.tempDeg + _this.opts.rotateDeg + targetDeg;
    		
    		// 转动转盘
    		_this.rotate(function() {
    			callback && callback();
    			_this.tempDeg = _this.tempDeg % 360;
    			var tempRotate = 'rotate('+ _this.tempDeg +'deg)';
    			_this.opts.el.css({
    				transform: tempRotate
    			});
    			_this.isLottery = false;
    		});
    	},
    	
    	// 旋转转盘
    	rotate: function(callback) {
    		var _this = this;
    		_this.opts.el.animate({
    			rotate: _this.tempDeg + 'deg'
    		}, 2000, 'ease', function() {
    			callback && callback();
    		});
    	}
    };
    
    win.Lottery = Lottery;
})(window, $);

$(function() {
	var globalData = {
		prize: 0,
		prizeText: "",
		totalTimes: 3,
		currentTimes: 0
	}
	var lottery = new Lottery(),
		isGoing = false,	// 是否正在抽奖
		isEnded = false;	// 是否抽奖结束
	
	// 模拟数据
	var prizeList = [1, 2, 3, 4, 5, 6],
		prizeTextList = ['一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '谢谢参与'];
	
	// 开始抽奖
	$('.j_startBtn').on('touchend', function() {
		playGame();
	}).on('click', function() {
		playGame();
	});
	
	// 初始化
	setLasttimesText();
	
	function playGame() {
		// 正在抽奖或者抽奖结束
		if(isGoing || isEnded) return;
		
		isGoing = true;
		
		// 此处为数据模拟
		globalData.currentTimes ++;
		var tempIndex = Math.floor(Math.random()*prizeList.length);
		globalData.prize = prizeList[tempIndex];
		globalData.prizeText = prizeTextList[tempIndex];
	
		// 转动转盘
		var deg = countDeg(globalData.prize);
		lottery.run(deg, function() {
			alert(globalData.prizeText);
			isGoing = false;
			setLasttimesText();
		});
	}
	
	/**
	 * 根据奖品等级计算转盘角度
	 * @param {Object} prize
	 * @return {Number} deg
	 */
	function countDeg(prize) {
		var deg = 0,
			cellDeg = parseInt(360 / 10),
			arr = [1, 3, 5, 7, 9];
		if(prize == 1) {
			// 一等奖
			deg = 0;
		} else if(prize == 2) {
			// 二等奖
			deg = cellDeg * 8;
		} else if(prize == 3) {
			// 三等奖
			deg = cellDeg * 6;
		} else if(prize == 4) {
			// 四等奖
			deg = cellDeg * 4;
		} else if(prize == 5) {
			// 五等奖
			deg = cellDeg * 2;
		} else {
			// 谢谢参与
			var index = Math.floor(Math.random()*5);
			deg = cellDeg * arr[index];
		}
		return deg;
	}
	
	/**
	 * 设置剩余抽奖次数文案
	 */
	function setLasttimesText() {
		var times = globalData.totalTimes - globalData.currentTimes;
		if(times <= 0) {
			isEnded = true;
			$('#j_lotteryTimes').html('<p>您已经没机会抽奖啦</p>');
		} else {
			$('#j_lotteryTimes').html('<p>您有<strong>'+ times +'</strong>次抽奖机会</p>');	
		}
	}
});