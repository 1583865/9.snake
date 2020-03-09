//s食物类
function Food(x, y, img) {
	//坐标
	this.row = x;
	this.col = y;
	this.img = img;
}
Food.prototype.reset = function(x, y) {
	this.row = x;
	this.col = y;
}