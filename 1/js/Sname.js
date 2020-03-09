// 蛇
function Sname(pic_obj) {
	this.arr = [
		{row: 4,col: 4},
		{row: 4,col: 5},
		{row: 4,col: 6},
		{row: 4,col: 7},
		{row: 4,col: 8},
		{row: 4,col: 9}

	];
	this.direction = 39;
	this.lock = true;
	this.head_pic = pic_obj.head_pic;
	this.body_pic = pic_obj.body_pic;
	this.tail_pic = pic_obj.tail_pic;
	this.head_idx = 2;
	this.tail_idx = 0;
}
Sname.prototype.move = function() {
	//头部
	var newHead = {
		row: this.arr[this.arr.length - 1].row,
		col: this.arr[this.arr.length - 1].col
	}
	//判断蛇的位置
	if (this.direction === 37){
		newHead.col--;
	}else if(this.direction === 38){
		newHead.row--;
	}else if(this.direction === 39){
		newHead.col++;
	}else if (this.direction === 40) {
		newHead.row++;
	}

	//蛇头放入最后一项
	this.arr.push(newHead);

	this.arr.shift();
	this.lock = true;

	//移动时变尾部图片
	 var tail = this.arr[0];
	 var pg = this.arr[1];
	 if(tail.row === pg.row){
	 	this.tail_idx = tail.col > pg.col ? 2:0;
	 }else{
	 	this.tail_idx = tail.row > pg.row ? 3 : 1;

	 }
	}
	//蛇转向
	Sname.prototype.change = function(direction){
		if (!this.lock){
			return;
		}
		this.lock = false;
		var result = Math.abs(direction - this.direction);
		if(result === 2 || result === 0){
			return;
		}else {
			this.direction = direction;
		}
		//改变头部图片
		if (direction === 37) {
			this.head_idx = 0;
		}else if(direction === 38) {
			this.head_idx = 1;
		}else if(direction === 39) {
			this.head_idx = 2;
		}else if(direction === 40) {
			this.head_idx = 3;
		}

	}

	//蛇生长
	Sname.prototype.growUp = function() {
		//蛇的尾部
		var tail = this.arr[0];
		//添加数组
		this.arr.unshift(tail);
	}