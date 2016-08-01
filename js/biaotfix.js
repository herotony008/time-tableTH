//检测ios6判断函数 begin
function gtIOS6() {
    var userAgent = window.navigator.userAgent;
    var ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/);
    return ios && ios[2] && (parseInt(ios[2].replace(/_/g, '.'), 10) >= 6);
}


///动态表头固定方法 begin
function fixTitle(objA,Topheight,parentClass,zindexNum){
	//objA  obj-jq对象 //Topheight 固定top 的高度  //parentClass 表头外套没高度的父级 //zindexNum设置层级
	objA.each(function(i){
		var OTitle = $(this);
		var TitleHeight = OTitle.height();
		var J_titleHeight = Topheight;//top的高度
		var OTitleParent = OTitle.parent();
		var TitleParentHeight = OTitleParent.height();
		var OTitleParentBig = OTitle.closest(parentClass);
		var TitleParentBigHeight = OTitleParentBig.height();
		var rectB = OTitleParentBig[0].getBoundingClientRect().top;

		var TitleParentBigTop = OTitleParentBig.offset().top

		if( rectB < J_titleHeight && rectB > -TitleParentBigHeight+J_titleHeight+TitleHeight){

			OTitleParent.css("height",TitleHeight)

			OTitle.css({"position":"fixed","zIndex":i+zindexNum,"left":0,"top":J_titleHeight,"width":"100%"});

		}else if(rectB < J_titleHeight+TitleHeight && rectB >= J_titleHeight && i!=0){
			
			OTitleParent.css("height",TitleHeight)

			OTitle.css({"position":"absolute","left":0,"top":TitleParentBigTop,"width":"100%"});
			objA.eq(i-1).css({"position":"absolute","left":0,"top":TitleParentBigTop-TitleHeight,"width":"100%"});
		}else{
			OTitle.removeAttr("style").css("zIndex",i+zindexNum);
			
		}
	})
}
///动态表头固定方法 end
