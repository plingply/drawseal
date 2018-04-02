/**
 * drawseal 1.1.1
 * created at Mon Apr 02 2018 14:13:18 GMT+0800 (CST)
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.veTouch = factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

var drawseal = function (obj) {
    /*
    obj = {
        id:'',//画布id
        text:"印章名称",
        imgurl:''//印章图片名称
    }
    */
    if (!obj) {
        console.error("参数不正确", {
            id: '',//画布id
            text: "印章名称",
            imgurl: ''//印章图片名称
        });
        return
    }
    if (!obj.id) {
        alert('请填写画布id');
        return
    }

    if (obj.imgurl && obj.imgurl != '') {
        //在这里绘制图片
    } else {
        //绘制仿制印章
        draw(obj);
    }


};

var create5star = function (context, sx, sy, radius, color, rotato) {
    //绘制五角星
    /** 
           * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上 
           * rotate:绕对称轴旋转rotate弧度 
           */
    context.save();
    context.fillStyle = color;
    context.translate(sx, sy); //移动坐标原点
    context.rotate(Math.PI + rotato); //旋转
    context.beginPath(); //创建路径
    var x = Math.sin(0);
    var y = Math.cos(0);
    var dig = Math.PI / 5 * 4;
    for (var i = 0; i < 5; i++) {
        //画五角星的五条边
        var x = Math.sin(i * dig);
        var y = Math.cos(i * dig);
        context.lineTo(x * radius, y * radius);
    }
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
};

var draw = function (obj) {
    var canvas = document.getElementById(obj.id);
    var context = canvas.getContext("2d");

    // 绘制印章边框
    var width = canvas.width / 2;
    var height = canvas.height / 2;
    context.lineWidth = 7;
    context.strokeStyle = "#f00";
    context.beginPath();
    context.arc(width, height, 110, 0, Math.PI * 2);
    context.stroke();
    //画五角星
    create5star(context, width, height, 20, "#f00", 0);
    // 绘制印章名称
    // context.font = '14px Helvetica';
    context.textBaseline = "middle"; //设置文本的垂直对齐方式
    context.textAlign = "center"; //设置文本的水平对对齐方式
    context.lineWidth = 1;
    context.fillStyle = "#f00";
    // 绘制印章单位
    context.translate(width, height); // 平移到此位置,
    context.font = "22px 微软雅黑";
    var count = obj.text.length; // 字数
    var angle = 4 * Math.PI / (3 * (count - 1)); // 字间角度
    var chars = obj.text.split("");
    var c;
    for (var i = 0; i < count; i++) {
        c = chars[i]; // 需要绘制的字符
        if (i == 0) { context.rotate(5 * Math.PI / 6); }
        else { context.rotate(angle); } //
        context.save();
        context.translate(90, 0); // 平移到此位置,此时字和x轴垂直
        context.rotate(Math.PI / 2); // 旋转90度,让字平行于x轴
        context.fillText(c, 0, 0); // 此点为字的中心点
        context.restore();
    }

    var imgs = new Image();
    imgs.src = src;
    imgs.onload = function () {
        window.print();
    };
};

return drawseal;

})));
