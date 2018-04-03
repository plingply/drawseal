let drawseal = function (obj) {
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
        })
        return
    }
    if (!obj.id) {
        console.error('请填写画布id')
        return
    }

    if (obj.imgurl && obj.imgurl != '') {
        //在这里绘制图片
        drawimg(obj)
    } else {
        if (!obj.text || (obj.text + '').length == 0) {
            console.error('印章名称太短')
            return
        }
        //绘制仿制印章
        draw(obj)
    }


}

let create5star = function (context, sx, sy, radius, color, rotato) {
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
    let x = Math.sin(0);
    let y = Math.cos(0);
    let dig = Math.PI / 5 * 4;
    for (let i = 0; i < 5; i++) {
        //画五角星的五条边
        let x = Math.sin(i * dig);
        let y = Math.cos(i * dig);
        context.lineTo(x * radius, y * radius);
    }
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
}

let draw = function (obj) {
    let canvas = document.getElementById(obj.id);
    if (!canvas) {
        console.error("找不到画布")
        return
    }
    let context = canvas.getContext("2d");
    canvas.height = canvas.width

    if (canvas.width < 200) {
        console.warn("canvas宽高相等并大于200,如果设置过小，会自动设置为200")
        canvas.width = 200;
        canvas.height = 200;
    }
    // 绘制印章边框
    let width = canvas.width - 40;
    let height = width;
    context.lineWidth = 7;
    context.strokeStyle = "#f00";
    context.beginPath();
    context.arc(width / 2 + 20, height / 2 + 20, width / 2, 0, Math.PI * 2);
    context.stroke();
    //画五角星
    create5star(context, width / 2 + 20, height / 2 + 20, 20, "#f00", 0);
    // 绘制印章名称
    // context.font = '14px Helvetica';
    context.textBaseline = "middle"; //设置文本的垂直对齐方式
    context.textAlign = "center"; //设置文本的水平对对齐方式
    context.lineWidth = 1;
    context.fillStyle = "#f00";
    // 绘制印章单位
    context.translate(width / 2 + 20, height / 2 + 20); // 平移到此位置,
    context.font = "22px 微软雅黑";
    let count = obj.text.length; // 字数
    let angle = 4 * Math.PI / (3 * (count - 1)); // 字间角度
    let chars = obj.text.split("");
    let c;
    for (let i = 0; i < count; i++) {
        c = chars[i]; // 需要绘制的字符
        if (i == 0) context.rotate(5 * Math.PI / 6);
        else context.rotate(angle); //
        context.save();
        context.translate(width / 2 - 20, 0); // 平移到此位置,此时字和x轴垂直
        context.rotate(Math.PI / 2); // 旋转90度,让字平行于x轴
        context.fillText(c, 0, 0); // 此点为字的中心点
        context.restore();
    }
}

let drawimg = function (obj) {
    let canvas = document.getElementById(obj.id);
    if (!canvas) {
        console.error("找不到画布")
        return
    }
    let context = canvas.getContext("2d");
    canvas.height = canvas.width

    if (canvas.width < 200) {
        console.error("canvas宽高相等并大于200")
        canvas.width = 200;
        canvas.height = 200;
    }
    // 绘制印章边框
    let width = canvas.width;
    let height = width;

    let img = new Image();
    img.src = obj.imgurl
    img.onload = function () {
        context.drawImage(img, 0, 0, width, width * img.height / img.width);
    }

}

export default drawseal