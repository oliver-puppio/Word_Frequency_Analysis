﻿function Ajax(method, url, param, callback) {
    method = method || "get";/* 设置method属性默认值get*/
    param = param || null;

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open(method, url, true);//open方法只是设置了一些请求参数。

    //如果请求方法是post,下面这名必须加
    //if (method.toLowerCase() == "post") {
    //    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    //}
    xhr.send(param);//发送请求及数据，

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

                //使用回调函数
                if (callback) {
                    callback(xhr.responseText);
                }
                else {
                    document.write(xhr.responseText);
                }
            }
        }
    }
}

var myfiles = localStorage.length > 0 ? load_file() : new Array(5);
var myfileslength = localStorage.length > 0 ? localStorage.length : 0;

function load_file() {
    var ans = new Array(localStorage.length);
    for (var i = 0; i < localStorage.length; i++) {
        ans[i] = eval("(" + localStorage.getItem(String(i)) + ")");
    }
    return ans;
}

function renew_localStorage() {
    for (var i = 0; i < myfileslength; i++)
        localStorage.setItem(String(i), JSON.stringify(myfiles[i]));
}

function create_json(param) {
    var new_j = eval("(" + param + ")");
    if (myfileslength == 5) {
        myfiles.pop();
        myfileslength--;
    }
    if (myfileslength < 5) {
        myfiles.unshift({
            filename: new_j["filename"],
            uptime: new_j["uptime"],
            info: new_j["info"],
            result: new_j["result"],
        });
        myfileslength++;
    }
    renew_localStorage();
    judge_json();
}

function delete_json(i) {
    if (myfileslength > 0) {
        myfiles.splice(i, 1);
        myfileslength--;
    }
    renew_localStorage();
    judge_json();
}

function judge_json() {
    for (var i = 0; i < 5; i++) {       
        document.getElementById(String(i)).style.display = i < myfileslength ? "block" : "none";
        if (i < myfileslength) {
            document.getElementById(String(i)).querySelector(".title").title = myfiles[i].filename;
            document.getElementById(String(i)).querySelector(".title").innerText = myfiles[i].filename;
            document.getElementById(String(i)).querySelector(".time").innerText = myfiles[i].uptime;
            document.getElementById(String(i)).querySelector(".info").innerText = myfiles[i].info;
        }
    }
}

window.onload = function () {
    judge_json();
    //init();
}

function init() {
    var new_html = window.open("你的新页面.html", "newwindow", "height=100, width=400, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no");
    new_html.document.write('<html>' +
        '<head>' +
        '<meta charset="utf-8" />' +

        '<script src="echarts.js"> </script>' +
        '<script src="echarts-wordcloud.js"></script>' +
        '<script src="dwc.js"></script>' +
        '<link href="Details.css" rel="stylesheet" type="text/css"/>' +

        '<title>词云</title>' +
        '<script type="text/javascript">' +
        'var str1 = "{filename:' + "'" + '测试.docx' + "'" + ' ,uptime:' + "'" + '2021/6/9 16:13:00' + "'" + ',result:{物流:19,数据:16,菜鸟:12,服务:9,消费者:7,技术:7,快速:7,提升:6,智能:6,商品:6,包裹:5,智慧:5,AR:4,行业:4,用户:4,工作人员:4,will:4,发展:3,效率:3,体验:3,商家:3,变得:3,快递:3,配送:3,仓库:3,中国:3,方式:3,引入:2,全新:2,领域:2,}}";' +
        "var detailed_information = eval('(' + str1 + ')');" +
        'var word_filename = detailed_information.filename;' +
        'var word_uptime = detailed_information.uptime;' +
        'var word_frequency = getWordFrequency(detailed_information.result);' +
        '</script>' +
        '</head>' +

        '<body>' +

        '<div id="topNav">' +
        '<img class="item" src="https://i.postimg.cc/6QrTjQh6/1.png" />' +
        '</div>' +

        '<div id="WordCloudDivBackGround">' +

        '<div id="WordFileName"> </div>' +

        '<div id="WordUpTime"> </div>' +

        '<div id="WordCloudDiv"> </div>' +

        '<div id="ColumnChart"> </div>' +
        '<table id="WordFrequencyTable">' +
        '<tr>' +
        '<th class="ordinal fontcenter">序号</th>' +
        '<th class="content fontcenter">词语</th>' +
        '<th class="content fontcenter">词频</th>' +
        '</tr>' +

        '<tbody id="WordFrequencyTableBody">' +

        '</tbody>' +
        '</table>' +

        '</div>' +



        '<div id="CopyRight">' +
        '<a href="FAQ.html">帮助 FAQ</a>' +
        '<a>&nbsp联系我们shishaungyuan@hust.edu.com</a>' +
        '</div>' +

        '<script type="text/javascript ">' +
        'var WordFileNameDiv = document.getElementById("WordFileName");' +
        'WordFileNameDiv.innerHTML = detailed_information.filename;' +
        'var WordUpTimeDiv = document.getElementById("WordUpTime");' +
        'WordUpTimeDiv.innerHTML = detailed_information.uptime;' +

        'var chart = echarts.init(document.getElementById("WordCloudDiv"));' +
        'var option = {' +
        'tooltip: { },' +
        'series: [{' +
        'type: "wordCloud",' +
        'gridSize: 2,' +
        'sizeRange: [12, 70],' +
        'rotationRange: [-90, 90],' +
        'shape: "pentagon",' +
        'width: 800,' +
        'height: 600,' +
        'drawOutOfBound: true,' +
        'textStyle: {' +
        'color: function() {' +
        'return (' +
        '"rgb(" + [' +
        'Math.round(Math.random() * 160),' +
        'Math.round(Math.random() * 160),' +
        'Math.round(Math.random() * 160),' +
        '].join(",") +' +
        '")"' +
        ')' +
        '},' +
        '},' +
        'emphasis: {' +
        'textStyle: {' +
        'shadowBlur: 10,' +
        "shadowColor: '#333'," +
        '},' +
        '},' +
        'data: word_frequency,' +
        '}, ],' +
        '};' +
        'chart.setOption(option);' +
        'window.onresize = chart.resize;' +

        'renderChart(word_frequency);' +
        'generateTable(word_frequency);' +

        '</script>' +

        '</body>' +

        '</html>');
}

function show_detail(param) {
    localStorage.setItem("current", string(param));
    window.location.href = "Details.html";
}