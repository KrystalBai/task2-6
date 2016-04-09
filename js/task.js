var data;
var queue=[];
var numericRegex = /^[0-9]+$/;
var input=document.getElementsByTagName("input")[0];
var q=document.querySelector(".queue");

/* 事件绑定函数 */
function addEvent(event, element, func) {
    if (element.addEventListener)  // W3C DOM
        element.addEventListener(event, func);
    else if (element.attachEvent) { // IE DOM
        element.attachEvent("on"+event, func);
    }
    else { // No much to do
        element[event] = func;
    }
}
/* 输入验证 */
function validate(re, name){
    if(re.test(input.value.trim())){
        input.style.background ='#ccffcc';
        document.getElementById(name + 'Error').style.display = "none";
        return true;
    }else{
        input.style.background ='#e35152';
        document.getElementById(name + 'Error').style.display = "block";
        return false;
    }
}

/* 从用户输入中获取数据 */
function getData() {
    data=validate(numericRegex,'input')?input.value.trim():undefined;
}

/* 数据显示 */
function renderData(){
    q.innerHTML=queue.map(function(d){
        return "<span>"+d+"</span>";
    }).join(" ");
}

function init(){
    var leftIn=document.getElementById("leftIn");
    var rightIn=document.getElementById("rightIn");
    var leftOut=document.getElementById("leftOut");
    var rightOut=document.getElementById("rightOut");
    addEvent("blur", input, function(){
        getData();
    });
    addEvent("focus", input, function(){
        this.value="";
    });

    /* 左入 */
    addEvent("click", leftIn, function(){
        getData();
        if(typeof data!="undefined") {
            queue.unshift(data);
            renderData();
        }
    });

    /* 右入 */
    addEvent("click", rightIn, function(){
        getData();
        if(typeof data!="undefined"){
            queue.push(data);
            renderData();
        }
    });

    /* 左出 */
    addEvent("click", leftOut, function(){
        getData();
        var item=queue.shift(data);
        renderData();
        if(typeof item!="undefined")alert(item);
    });

    /* 右入 */
    addEvent("click", rightOut, function(){
        getData();
        var item=queue.pop(data);
        renderData();
        if(typeof item!="undefined")alert(item);
    });

    /* 点击删除 */
    addEvent("click",q,function(e){
        var target = e.target || e.srcElement;
        if(target.nodeName.toLowerCase()==="span"){
            target.parentNode.removeChild(target);
            alert(target.innerText||target.textContent);
        }
        var newQueue= q.innerText|| q.textContent;
        queue=newQueue.split(/\s+/g);
    });
}
init();