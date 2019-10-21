
// ==UserScript==
// @name         textMode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://k12.51bolema.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

function select() {
    let questions = document.getElementsByClassName("questionTitle");//题目
    let options = document.getElementsByClassName("options"); //选项
    let arrays = [];
    for (var i = 0; i < questions.length; i++) {
        let questionImg = document.getElementsByClassName("question")[i].getElementsByClassName("questionImg");
        let option = options[i].innerText.replace(/[\r\n]/g, "");
        //console.log(options[i].innerText);
        let arr = [];
        let question = questions[i].innerText.replace(/[\r\n]/g, "");
        if(question.lastIndexOf("-->")>=0){
            question = question.substring(0,question.lastIndexOf("-->"));//去除提示
        }
        if (questionImg.length > 0) {
            let questionImgsrc = questionImg.item(0).children.item(0).src; //图片地址
            arr[0] = question + questionImgsrc;
        } else {
            arr[0] = question;
        }
        arr[1] = option;
        arrays[i] = arr;
    }
    let data = JSON.stringify(arrays);
    data.replace("%","perCent");
    console.log(data);
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://localhost:8080/webTest_7_Web_exploded/selectOption",
        data: "title=" + data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(data) {
            if(data.status==200){
                let obj = $.parseJSON(data.responseText);
                for(let i = 0;i<obj.length;i++){
                    let questionTitles = questions[i];
                    if(questionTitles.innerText.lastIndexOf("-->")>=0){
                        questionTitles.innerText = questionTitles.innerText.substring(0,questionTitles.innerText.lastIndexOf("-->"));
                    }
                    if(obj[i].code==1){
                        let list = obj[i].data;
                        console.log(list);
                        questionTitles.innerText = questionTitles.innerText+"-->"+list[0].q_answer;
                        //let div = $("<div style=\"color:#000\">"+(i+1)+"  "+list[0].q_answer+"</div>");
                        //div.appendTo($("#initmode"));
                        let number = null;
                        if(list[0].q_answer.length>1){
                            number = list[0].q_answer.split(",");
                        }
                        let option1 = options[i].getElementsByClassName("option");//第几题的全部选项
                        let sum = 0;
                        for(let j = 0; j<option1.length; j++){
                            let op = option1[j].innerText;
                            //console.log(list[0].q_answer);
                            if(list[0].q_answer.length==1){
                                if(list[0].q_answer == op.substring(0,1)){
                                    option1[j].click();
                                }
                            }else {
                                if(number[sum] == op.substring(0,1)){
                                    option1[j].click();
                                    sum++;
                                }
                            }
                        }
                    }else {
                        questionTitles.innerText = questionTitles.innerText+"-->没有答案";
                    }
                }
            }
        }
    });
    console.log(questions.length);
}

//添加题目和对应答案
function updatas1(){
    let questions = document.getElementsByClassName("questionTitle");//题目集合
    let options = document.getElementsByClassName("options");//选项
    let answers = document.getElementsByClassName("question-explain");//答案
    let arrays = [];
    let sum = 0;//题目总数
    for(let i = 0; i<answers.length;i++){
        let question = questions[i];
        if(question.innerText.indexOf("-->没有答案")>=0){
            //console.log(question.innerText.length+"  "+question.innerText.lastIndexOf("-->没有答案"));
            let aray = [];
            let leng = options.item(0).children.length;
            let answer = answers[i].children[1].innerText.substring(6,answers[i].children[1].innerText.length);//正确答案
            aray[0] = question.innerText.substring(0,question.innerText.lastIndexOf("-->没有答案"));//题目
            aray[2] = answer;//答案选项
            //for(let j = 0; j<leng-1;j++){
            aray[1]=options[i].innerText.replace(/[\r\n]/g, "");
            aray[1]=aray[1].substring(0,aray[1].lastIndexOf("您的答案为"));
            //let optiona = options[i].children[j].children[0].children[0].children[1].children[0].innerText.substring(0,1);
            // if(optiona==answer){
            //  aray[1] = options[i].children[j].children[0].children[0].children[1].children[1].innerText;
            //  break;
            //  }
            //}
            arrays[sum] = aray;
            sum++;
        }
    }
    let data = JSON.stringify(arrays);
    data.replace("%","perCent");
    //data = encodeURI(encodeURI(data));
    console.log(data);
    GM_xmlhttpRequest({
      method: "POST",
      url: "http://localhost:8080/webTest_7_Web_exploded/addOptions",
      data:"data="+data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      onload: function(data) {
          console.log(data);
          if(data.status==200){
              //let obj = JSON.parseJSON(data.responseText);
              console.log(data.responseText);
          }
      }
    });
}
$(document).ready(function() {
    init();
    $("#buttonin").bind("click", function() {
        select();
        console.log("select");
    });
    $("#buttonout").bind("click", function() {
        updatas1();
        console.log("updata");
    });
});


function init() {
    let contents = $("<div id=\"initmode\" style=\"background-color: rgba(255,255,255,0.1); width: 100px; height: 50px; position: absolute; top: 200px; right: 10px;\">" +
                        "<div style=\"text-align: center; margin-top: 10px;\">" +
                        "<input type=\"button\" value=\"开始\" id=\"buttonin\"/>&nbsp;" +
                        "<input type=\"button\" value=\"上传数据\" id=\"buttonout\"/>" +
                        "</div>" +
                        "</div>");
    $("body").append(contents);
}

