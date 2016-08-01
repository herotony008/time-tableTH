
function date(objId,dateId,num,fn){
	//id 点击标签id
	//id2 写入年月日id
	//num 2 选择年月、3选择年月日
	//fn 传人函数

	/*日期开始*/
	var $obj = $(objId);
	var $dateId = $(dateId);
	//var $date = $('#checkDate');
	var data1=[];
	var data2=[];
	var data3=[];

	var startYear = 2015;

	var myDate = new Date();
	var nowYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
	var nowMonth = myDate.getMonth(); //获取当前月份(0-11,0代表1月)


	var data = [data1,data2,data3]
	var maxDay = 31;
	var arr_1 = $dateId.text().split("-");
	if(!arr_1[2]){
		arr_1[2]=1;
	}
	if(arr_1[1]==1 || arr_1[1]==3|| arr_1[1]==5|| arr_1[1]==7|| arr_1[1]==8|| arr_1[1]==10|| arr_1[1]==12){
		maxDay = 31
	}else if(arr_1[1]==2){
		if(arr_1[0]%4==0){
			maxDay = 29
		}else{
			maxDay = 28
		}
		
	}else{
		maxDay = 30
	}

	for(var i =0;i<= Math.floor(nowYear-startYear);i++){
		data1.push({
			text:startYear+i+'年',
			value:arr_1[1]
		})
	}

	for(var i =0;i< 12;i++){
		var s= startYear;
		data2.push({
			text:i+1+'月',
			value:arr_1[0]
		})
	}

	for(var i =0;i< maxDay;i++){
		data3.push({
			text:i+1+'日'
		})
	}


	if(num==2){
		$obj.picker({
			data: [data1, data2],
			selectIndex: [Math.floor(arr_1[0]-startYear), Math.floor(arr_1[1]-1)],
			addCls:"show1"

		}).on('picker.select', function (e, selectVal, selectIndex) {

			var year = getNum(data1[selectIndex[0]].text)
			var month = getNum(data2[selectIndex[1]].text)

			month = month >=10 ? month : "0"+month
			$dateId.text( year+ '-' + month );

			$("html").removeAttr("style");
			if(fn){
				fn;
			}
		})
	}else if(num==3){
		$obj.picker({
			data: [data1, data2, data3],
			selectIndex: [Math.floor(arr_1[0]-startYear), Math.floor(arr_1[1]-1), Math.floor(arr_1[2]-1)],
			addCls:"show2"

		}).on('picker.select', function (e, selectVal, selectIndex) {
			

			var year = getNum(data1[selectIndex[0]].text)
			var month = getNum(data2[selectIndex[1]].text)
			var date = getNum(data3[selectIndex[2]].text)
			var maxday = 31;


			//
			if(month==2){
				if(year%4==0){
					maxday=29;
				}else{
					maxday=28;
				}

				if(date > 28 && year%4==0){
					selectIndex[2]=28  //28即使29日

				}else if(date > 28 && year%4!=0){
					selectIndex[2]=27  //28日
				}

			}else if(month==4 || month==6 || month==9 || month==11 && date > 30){
				maxday=30;
				
				selectIndex[2]=29  //30日
				
			}
			


			year = getNum(data1[selectIndex[0]].text)
			month = getNum(data2[selectIndex[1]].text)
			date = getNum(data3[selectIndex[2]].text)




			data3 =[];
			for(var i=0;i<maxday;i++){
				data3.push({
					text:i+1+'日'
				})
			}
			//重填日期
			$obj.picker('refill', data3, 2);

			selectIndex[2]=date-1


			month = month >=10 ? month : "0"+month
			date = date >=10 ? date : "0"+date
			$dateId.text(year + '-' + month + '-' + date );
			$("html").removeAttr("style");
			
			if(fn){
				fn;
			}
			

		}).on('picker.change', function (e, index, selectIndex) {
			
			if(index==0){

				var year = getNum(data1[selectIndex].text)
				var moneth = data1[selectIndex].value
				data2 =[];
				for(var i=0;i<12;i++){
					data2.push({
						text:i+1+'月',
						value:year
					})
				}
				
				//重填月份
				//$date.picker('refill', data2, 1);		

				if(moneth==4 || moneth==6|| moneth==9|| moneth==11){
					maxDay = 30
				}else if(moneth==2){

					if(year%4==0){
						maxDay = 29
					}else{
						maxDay = 28
					}
					
				}else{
					maxDay = 31
				}

				if(data3.length !=maxDay){
					data3 =[];
					for(var i=0;i<maxDay;i++){
						data3.push({
							text:i+1+'日'
						})
					}
					//重填日期
					$obj.picker('refill', data3, 2);
				}

			


			}else if(index==1){

				var year = data2[selectIndex].value
				var month =getNum(data2[selectIndex].text)
				
				data1=[];
				for(var i =0;i<= Math.floor(nowYear-startYear);i++){
					data1.push({
						text:startYear+i+'年',
						value:month
					})
				}

				if(month==1 || month==3|| month==5|| month==7|| month==8|| month==10|| month==12){
					
					if(data3.length!=31){
						data3 = [];
						for(var i =0;i< 31;i++){
							data3.push({
								text:i+1+'日'
							})
						}
						//重填日期
						$obj.picker('refill', data3, 2);
					}
					
					
				}else if(month==4 || month==6 || month==9 || month==11){
					if(data3.length!=30){
						data3 = [];
						for(var i =0;i< 30;i++){
							data3.push({
								text:i+1+'日'
							})
						}
						//重填日期
						$obj.picker('refill', data3, 2);
					}
					
				}else if(month==2){
					
					var num = 28;
					if(year%4==0){
						num = 29
					}

					if(data3.length!=num){

						data3 = [];
						for(var i =0;i< num;i++){
							data3.push({
								text:i+1+'日'
							})
						}
						//重填日期
						$obj.picker('refill', data3, 2);
					}

					
				}
				
			}

		})
	}
	

	


	/*$date.on('click', function () {
		$(this).picker('show');
	});*/
}

//取数字
function getNum(text){
	var value = text.replace(/[^0-9]/ig,""); 
	return value
}

/*日期end*/