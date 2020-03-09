// 游戏
function Game (map, sname, food, block) {
	this.map = map;
	this.sname = sname;
	this.food = food;
	this.block = block;
	this.timer = null;
	this.flag = null;
	this.init();
}
//初始化
Game.prototype.init = function(){
	this.renderMap();
	this.renderFood();
	this.renderSname();
	this.renderBlock();
	this.start();
	this.bindEvent();
}
//渲染地图
Game.prototype.renderMap = function(){
	this.map.fill();
}
//渲染食物
Game.prototype.renderFood = function() {
	var row = this.food.row;
	var col = this.food.col;
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img +")";
	this.map.arr[row][col].style.backgroundSize = "cover";


}
// 渲染蛇
Game.prototype.renderSname = function() {
	// 获取蛇的头部
	var head = this.sname.arr[this.sname.arr.length - 1];
	// 渲染头部图片
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.sname.head_pic[this.sname.head_idx] + ")";
	

	// 渲染在地图中渲染蛇身体坐标元素的背景
	for (var i = 1; i < this.sname.arr.length - 1; i++) {
		// 定义变量用于简化书写
		var row = this.sname.arr[i].row;
		var col = this.sname.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url(" + this.sname.body_pic[0] + ")";
	}
	//获取尾巴
	var tail = this.sname.arr[0];

	// 渲染尾部图片
    this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.sname.tail_pic[this.sname.tail_idx] + ")";


}

//开始
Game.prototype.start = function() {
	this.flag = true;
	var me = this;
	this.timer = setInterval(function() {
		//移动
		me.sname.move();
		me.checkMap();
		me.checkFood();
		me.checkSname();
		me.checkBlock();
		if(me.flag) {
			me.map.clear();
			me.renderFood();
			me.renderSname();
			me.renderBlock();
		}

	},1000)
}

//键盘事件
Game.prototype.bindEvent = function() {
	var me =this;
	document.onkeydown = function(e) {
		var code = e.keyCode;
		if(code === 37 || code === 38 || code === 39 || code === 40){
			me.sname.change(code);
		}
	}
}
//游戏结束
Game.prototype.gameOver = function(){
	this.flag = false;
	clearInterval(this.timer);
}

//监测是否撞到墙
Game.prototype.checkMap = function() {
	//获取头部
	var head = this.sname.arr[this.sname.arr.length - 1];

	if (head.row < 0 || head.row >= 20 || head.col < 0 || head.col >= 20) {
		alert("撞墙了，游戏结束");
		this.gameOver();
	}
}

//监测是否吃到食物
Game.prototype.checkFood = function() {
	var head = this.sname.arr[this.sname.arr.length - 1];
	var Food = this.Food;
	if(head.row === food.row && head.col === food.col){
		console.log("吃到食物");
		this.sname.growUp();
		this.resetFood();
	}
}

//重置食物
Game.prototype.resetFood = function() {
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);

	//监测食物合法性
	for (var i = 0; i < this.sname.arr.length;i++){
		var one = this.sname.arr[i];
		if (one.row === row && one.col === col) {
			alert("重合蛇身上");
			this.resetFood();
			return;
		}
	}

	//监测食物与障碍物
	for (var i = 0; i < this.block.arr.length;i++){
		var one = this.block.arr[i];
		if (one.row === row && one.col=== col) {
			alert("重合到障碍物上");
			this.resetFood();
			return;
		}
	}
	this.food.reset(row, col);
}

//蛇吃到自己
Game.prototype.checkSname = function() {
	//获取头部
	var head = this.sname.arr[this.sname.arr.length - 1];
	for (var i = 0; i < this.sname.arr.length - 1;i++){
		//获取蛇的一节身体
		var one = this.sname.arr[i];
		if(head.row === one.row && head.col === one.col){
			console.log("吃到自己");
			alert("吃到自己，结束游戏")
			this.gameOver();
		}
	}
}

//渲染障碍物
Game.prototype.renderBlock = function() {
	for(var i = 0; i <this.block.arr.length;i++){
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;

		//地图上渲染
		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img +")";
		this.map.arr[row][col].style.backgroundSize = "cover";

	}
}

//监测蛇是否撞到障碍物

Game.prototype.checkBlock = function() {
	var head = this.sname.arr[this.sname.arr.length - 1];
	for (var i = 0; i < this.block.arr.length;i++) {
		var one = this.block.arr[i];
		if (head.row === one.row && head.col === one.col){
			console.log("撞到障碍物");
			alert("碰到障碍物，结束游戏")
			//结束游戏
			this.gameOver();
		}
	}
}