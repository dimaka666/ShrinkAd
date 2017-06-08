var canvas, stage, bgImg, bgMask, mW, mH;
var x = y = w = h = lw = lh = rw = rh = 0;

function initShrinkad(btnTxt, plc, imgUrl){
  	var data = { 
  		buttonText : btnTxt, 
  		width : $(plc).width(), 
  		height : $(plc).height()
  	};
 	$(plc).loadTemplate($('#bannerTmpl'), data);
 	initBanner(imgUrl);	

	canvas = document.getElementById('mycanvas1');
	stage = new createjs.Stage(canvas);
	mW = stage.canvas.width;
	mH = stage.canvas.height;

	loadImage(imgUrl);
	
	bgMask = new createjs.Shape();
	stage.addChild(bgMask);
	stage.update();
}

function initBanner(imgUrl) {
	canvas = document.getElementById('mycanvas1');
	stage = new createjs.Stage(canvas);
	mW = stage.canvas.width;
	mH = stage.canvas.height;

	loadImage(imgUrl);
	
	bgMask = new createjs.Shape();
	stage.addChild(bgMask);
	stage.update();
}


function joinNow(){
	if($('button').attr('data-state') == '0'){
		$('button').text('Submit and send');
	} else {
		$('button').text('Join Now');
	}
	var btnW = $('button').outerWidth();
	var btnH = $('button').outerHeight();
	var tx = $('button').offset().left - $('button').parent().offset().left;
	var ty = $('button').offset().top - $('button').parent().offset().top;

	if($('button').attr('data-state') == "0"){
		x = y = w = h = lw = lh = rw = rh = 0;
		createjs.Ticker.reset();
		createjs.Ticker.setFPS('60');
		createjs.Ticker.setInterval('10');
		createjs.Ticker.addEventListener("tick", function() {
			bgMask.graphics.clear();
			bgMask.graphics.moveTo(x,y);
			bgMask.graphics.lineTo(mW - w, 0 + h);
			bgMask.graphics.lineTo(mW - lw,mH - lh);
			bgMask.graphics.lineTo(0 + rw,mH -rh);
			bgMask.graphics.lineTo(x,y);
			bgImg.mask = bgMask;
	
			if(Math.round(x) < Math.round(tx)){
				x += tx/6;
			}
			if(Math.round(y) < Math.round(ty)){
				y += ty/6;				
			}
			if ( Math.round(w) < Math.round(mW - (tx + btnW))) {
				w += (mW - (tx + btnW))/16;
			}
			if ( h < ty ) {
				h +=ty/16;
			}
			if ( Math.round(lw) < Math.round(mW - (tx + btnW) ) ){
				lw += (mW - (tx + btnW))/24;
			}

			if (  Math.round(lh) < Math.round(mH - (ty + btnH) )) {
				lh += (mH - (ty + btnH))/24;
			}

			if ( Math.round(rw) < Math.round(tx)){
				rw += tx/30;
			}
			if (  Math.round(rh) < Math.round((mH - (ty + btnH)))){
				rh += (mH - (ty + btnH))/30;
			} else {
				createjs.Ticker.paused = true;
				// init();
			}
			stage.update();
		});
		$('button').attr('data-state', '1');

	} else {
			createjs.Ticker.reset();
			createjs.Ticker.setFPS('60');
			createjs.Ticker.setInterval('10');
			createjs.Ticker.addEventListener("tick", function() {
			bgMask.graphics.clear();
			bgMask.graphics.moveTo(x,y);
			bgMask.graphics.lineTo(mW - w, 0 + h);
			bgMask.graphics.lineTo(mW - lw,mH - lh);
			bgMask.graphics.lineTo(0 + rw,mH - rh);
			bgMask.graphics.lineTo(x,y);
			bgImg.mask = bgMask;
			if(Math.round(x) > 0){
				x -= tx/6;
			}
			if(Math.round(y) > 0){
				y -= ty/6;				
			}
			if ( Math.round(w) <= Math.round(mW - (tx + btnW))) {
				w -= (mW - (tx + btnW))/16;
			}
			if ( Math.round(h) > 0 ) {
				h -= ty/16;
			}
			if ( Math.round(lw) <= Math.round(mW - (tx + btnW) ) ){
				lw -= (mW - (tx + btnW))/24;
			}

			if (  Math.round(lh) < mH) {
				lh -= (mH - (ty + btnH))/24;
			}

			if ( Math.round(rw) > 0){
				rw -= tx/30;
			}
			if (  Math.round(rh) > 0){
				rh -= (mH - (ty + btnH))/30;
			} else {
				createjs.Ticker.paused = true;
			}

		stage.update();
		});
		$('button').attr('data-state', '0');
	}
}
function loadImage(url){
	bgImg = new createjs.Bitmap();
	bgImg.x = 0;
	bgImg.y = 0;
	var img = new Image();
	img.onload = imgLoaded;
	img.src = url;
	stage.addChild(bgImg);
	stage.update();
}

function imgLoaded(event){
	bgImg.image = event.target;
	var imgWidth = bgImg.image.width;
	var imgHeight = bgImg.image.height;
	var r1 = mW / imgWidth;
	var r2 = mH / imgHeight;
	if(r1 > r2 ){
		bgImg.scaleX = r1;
		bgImg.scaleY = r1;
	} else {
		bgImg.scaleX = r2;
		bgImg.scaleY = r2;
	}
	stage.update();
}
