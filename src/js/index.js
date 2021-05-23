// JavaScript Document
//play窗口函数

//画小方块
function drawblock(x,y){
	_do.fillStyle="#FFF";
	_do.fillRect(x*20+1,y*20+1,19,19);
}
//清除小方块
function cleanblock(x,y){
	_do.fillStyle="#000";
	_do.fillRect(x*20+1,y*20+1,19,19);
}
//复制上层小方块
function copyTop(x,y){
	var imgData=_do.getImageData(x*20+1,y*20+1,19,19);
    _do.putImageData(imgData,x*20+1,(y+1)*20+1);
}
//获取小方块第一点的R数值
function getColor(x,y){
	var imgData=_do.getImageData(x*20+1,y*20+1,1,1);
    var red=imgData.data[0];
	return red;
}
//根据当前方块数组的数据绘制俄罗斯方块
function createBlock(x,y){
	maxX=0;
	maxY=0;
	for(var i=0;i<currentArr.length;i++){
		if(currentArr[i].x>maxX){
			maxX=currentArr[i].x;
		}
		if(currentArr[i].y>maxY){
			maxY=currentArr[i].y;
		}
	}
	Lx=2*maxX+1;
	Ly=2*maxY+1;
	for(var i=0;i<currentArr.length;i++){
		drawblock(x+currentArr[i].x+maxX,y+currentArr[i].y+maxY);
	}
}
//根据当前方块数组的数据移除俄罗斯方块
function dropBlock(x,y){
	maxX=0;
	maxY=0;
	for(var i=0;i<currentArr.length;i++){
		if(currentArr[i].x>maxX){
			maxX=currentArr[i].x;
		}
		if(currentArr[i].y>maxY){
			maxY=currentArr[i].y;
		}
	}
	Lx=2*maxX+1;
	Ly=2*maxY+1;
	for(var i=0;i<currentArr.length;i++){
		cleanblock(x+currentArr[i].x+maxX,y+currentArr[i].y+maxY);
	}
}
//检查旋转后所画位置是否有颜色块并检查右边界，返回false表示有颜色块不能画下一个旋转后的俄罗斯方块
function checkRotateNext(){
	var isRotate=true;
	maxX=0;
	maxY=0;
	for(var i=0;i<currentArr.length;i++){
		nextArr[i].x=-currentArr[i].y;
		nextArr[i].y=currentArr[i].x;;
	}
	for(var i=0;i<nextArr.length;i++){
		if(nextArr[i].x>maxX){
			maxX=nextArr[i].x;
		}
		if(nextArr[i].y>maxY){
			maxY=nextArr[i].y;
		}
	}
	Lx=2*maxX+1;
	Ly=2*maxY+1;
	for(var i=0;i<nextArr.length;i++){
		if(getColor(x+nextArr[i].x+maxX,y+nextArr[i].y+maxY)!=0){
			isRotate=false;
		}
	}
	if(x+Lx>15){
		isRotate=false;
	};
	return isRotate;
}
//检查当前位置是否有颜色块
function checkNext(){
	var isNext=true;
	maxX=0;
	maxY=0;
	for(var i=0;i<currentArr.length;i++){
		if(currentArr[i].x>maxX){
			maxX=currentArr[i].x;
		}
		if(currentArr[i].y>maxY){
			maxY=currentArr[i].y;
		}
	}
	Lx=2*maxX+1;
	Ly=2*maxY+1;
	for(var i=0;i<currentArr.length;i++){
		if(getColor(x+currentArr[i].x+maxX,y+currentArr[i].y+maxY)!=0){
			isNext=false;
		}
	}
	return isNext;
	
}
//检查能否左移
function checkLeft(){
	var isLeft=true;
	maxX=0;
	maxY=0;
	for(var i=0;i<currentArr.length;i++){
		if(currentArr[i].x>maxX){
			maxX=currentArr[i].x;
		}
		if(currentArr[i].y>maxY){
			maxY=currentArr[i].y;
		}
	}
	Lx=2*maxX+1;
	Ly=2*maxY+1;
	for(var i=0;i<currentArr.length;i++){
		if(getColor(x+currentArr[i].x-1+maxX,y+currentArr[i].y+maxY)!=0){
			isLeft=false;
		}
	}
	return isLeft;
	
}
//检查能否右移
function checkRight(){
	var isRight=true;
	maxX=0;
	maxY=0;
	for(var i=0;i<currentArr.length;i++){
		if(currentArr[i].x>maxX){
			maxX=currentArr[i].x;
		}
		if(currentArr[i].y>maxY){
			maxY=currentArr[i].y;
		}
	}
	Lx=2*maxX+1;
	Ly=2*maxY+1;
	for(var i=0;i<currentArr.length;i++){
		if(getColor(x+1+currentArr[i].x+maxX,y+currentArr[i].y+maxY)!=0){
			isRight=false;
		}
	}
	return isRight;
	
}
//旋转方块
function rotateBlock(x,y){
	//
	dropBlock(x,y);
	if(checkRotateNext()){
		maxX=0;
		maxY=0;
		for(var i=0;i<currentArr.length;i++){
			if(currentArr[i].x>maxX){
				maxX=currentArr[i].x;
			}
			if(currentArr[i].y>maxY){
				maxY=currentArr[i].y;
			}
		}
		Lx=2*maxX+1;
		Ly=2*maxY+1;
		for(var i=0;i<currentArr.length;i++){
			cleanblock(x+currentArr[i].x+maxX,y+currentArr[i].y+maxY);
		}
		
		maxX=0;
		maxY=0;
		for(var i=0;i<nextArr.length;i++){
			if(nextArr[i].x>maxX){
				maxX=nextArr[i].x;
			}
			if(nextArr[i].y>maxY){
				maxY=nextArr[i].y;
			}
		}
		Lx=2*maxX+1;
		Ly=2*maxY+1;
		for(var i=0;i<nextArr.length;i++){
			drawblock(x+nextArr[i].x+maxX,y+nextArr[i].y+maxY);
		}
		for(var i=0;i<currentArr.length;i++){
			currentArr[i].y=nextArr[i].y;
			currentArr[i].x=nextArr[i].x;;
		}	
	}
	else{
	    createBlock(x,y);
	}
}
//方块快速下滑
function downDown(){
	dropBlock(x,y);
	maxX=0;
	maxY=0;
	for(var i=0;i<currentArr.length;i++){
		if(currentArr[i].x>maxX){
			maxX=currentArr[i].x;
		}
		if(currentArr[i].y>maxY){
			maxY=currentArr[i].y;
		}
	}
	Ly=2*maxY+1;
	var isDown=true;
	var downY=0;
	while(isDown&&((y+downY+Ly)<=22)){
		if(isDown){
			downY+=1;
		}
		for(var i=0;i<currentArr.length;i++){
			if(getColor(x+currentArr[i].x+maxX,y+currentArr[i].y+downY+maxY)!=0){
				isDown=false;
			}
		}
	}
	y+=downY-1;
	createBlock(x,y);
}
//检查屏幕上的方块能否消除。
function checkScreen(){
	var totalRows=22;
	var totalLine=15;
	for(var row=totalRows;row>=0;row--){
		var isClean=true;
		for(var line=totalLine-1;line>=0;line--){
			if(getColor(line,row)==0){
				isClean=false;
			}
		}
		if(isClean){
			//清除该行
			for(var line=totalLine;line>=0;line--){
				cleanblock(line,row);
			}
			score+=Pscore*level;
			var scoreShow=document.getElementById("score");
			scoreShow.innerHTML=score;
			//该行以上的部分下移
			for(var upRow=row;upRow>=0;upRow--){
				for(var line=totalLine-1;line>=0;line--){
					copyTop(line,upRow-1);
				}
			}
		}
	}
}
//方块下滑
function movedown(){
	dropBlock(x,y);
	y+=1;
	if((y+Ly<=22)&&checkNext()){
	    checkScreen();
	    createBlock(x,y);
	}
	else{
		createBlock(x,y-1);
		checkScreen();
		rand=Math.floor(Math.random()*4);
        currentArr=nextBlock;
		getNextBlock()
        nextArr=[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
        x=6;
        y=0;
		if(getColor(x,y)||getColor(x+1,y)||getColor(x+2,y)){
		    clearInterval(timer);
			//游戏结束的操作
			over();
			
		}
		createBlock(x,y)
	}
}
//游戏开始。
function start(){
	clearInterval(timer);
	if(score>=Plevel)
	{   
	    level+=1;
	    Plevel+=Plevel;
	}
	if(score>=showScore)
	{  
	    showScore+=1000;
	    var currentScore=10000-score;
	    showText.innerHTML="离星哥请你吃饭还有"+currentScore+"分";
		showLv.style.display='block';
		setTimeout(function(){
			showLv.style.display='none';
		},2000);
	}
	switch(level){
		case 1:speed=1000; break;
		case 2:speed=800; break;
		case 3:speed=600; break;
		case 4:speed=500; break;
		case 5:speed=400; break;
		case 6:speed=350; break;
		case 7:speed=300; break;
		case 8:speed=250; break;
		case 9:speed=30; break;
		default:speed=20;break;
	}
	showLv.innerHTML=level;
	movedown();
	timer=setInterval(start,speed)
}
//游戏结束时显示的方法。
function over(){
	clearInterval(timer);
	if(score>=10000){
	_do.fillStyle="#F00";
	_do.font="40px Georgia";
    _do.fillText("Game Over!",40,180);
	_do.font="24px Georgia";
	_do.fillStyle="#F00";
	_do.fillText("请主动联系星哥叫你吃饭",20,240);
	}
	else{
	_do.fillStyle="#F00";
	_do.font="40px Georgia";
    _do.fillText("Game Over!",40,160);
	_do.fillStyle="#F00";
	_do.font="40px Georgia";
    _do.fillText("-_-||",110,220);
	_do.font="20px Georgia";
	var showScore=10000-score;
	_do.fillText("离星哥请你吃饭还有"+showScore+"分",24,280);
	_do.font="32px Georgia";
	_do.fillStyle="#F00";
	_do.fillText("星哥不能请你吃饭",26,340);
	}
}

//获取下一个方块
function getNextBlock(){
	rand=Math.floor(Math.random()*7);
	nextBlock=blockarr[rand];
	createNextBlock(0,0);
}
//play函数结束


//画下一个block
//画下一个小方块
function drawNextblock(x,y){
	_doNext.fillStyle="#FFF";
	_doNext.fillRect(x*20+1,y*20+1,19,19);
}
//创建下一个俄罗斯方块
function createNextBlock(x,y){
	for(var i=0;i<5;i++){
		for(var j=0;j<5;j++){
			cleanNextblock(i,j)
		}
	}
	maxX=0;
	maxY=0;
	for(var i=0;i<nextBlock.length;i++){
		if(nextBlock[i].x>maxX){
			maxX=nextBlock[i].x;
		}
		if(nextBlock[i].y>maxY){
			maxY=nextBlock[i].y;
		}
	}
	Lx=2*maxX+1;
	Ly=2*maxY+1;
	for(var i=0;i<nextBlock.length;i++){
		drawNextblock(x+nextBlock[i].x+maxX,y+nextBlock[i].y+maxY);
	}
}
//清除下一个方块画布元素
function cleanNextblock(x,y){
	_doNext.fillStyle="#000";
	_doNext.fillRect(x*20+1,y*20+1,19,19);
}

//画下一个结束