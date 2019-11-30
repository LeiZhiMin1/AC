// ==UserScript==
// @name         伯乐
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  try to take over the world!
// @author       You
// @match        https://k12.51bolema.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

let setting = {
  length: 0, // 总题目数
  number: 0, // 题目下标
  questions: { // 没有答案的集合
    length: 0, // 没有答案的总数
    number: 0, // 没有答案集合的下标
    indexs: [] // 没有答案的集合
  }
}
// 查询
function select() {
  // 初始化设置
  setting.length = 0;
  setting.number = 0;
  setting.questions.length = 0;
  setting.questions.number = 0;
  setting.questions.indexs = [];
  document.getElementsByClassName('mytitles')[0].innerText = "";
  // 获取题目数量
  setting.length = document.getElementsByClassName('question-info').length;
  // 所有题目
  let questionTitles = document.getElementsByClassName('questionTitle');
  // 所有选项
  let options = document.getElementsByClassName('options');
  let setTimeOut = setInterval(function() {
      // 跳出定时器
      if (setting.number == setting.length - 1) {
        clearInterval(setTimeOut);
      }
      // 当前题目
      let thisQuestionTitle = questionTitles.item(setting.number);
      // 当前选项
      let thisOption = options.item(setting.number);
      // 格式化后的题目
      let question = format(delHint(thisQuestionTitle.innerText));
      // 格式化后的选项
      let option = format(thisOption.innerText);
      GM_xmlhttpRequest({
        method: "POST",
        url: "http://www.shiqudehuiyi.top:8080/selectOption",
        data: "title=" + question + "&option=" + option,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        synchronous: true,
        onload: function(data) {
          if (data.status == 200) { //解析返回是否成功
            let obj = $.parseJSON(data.responseText); //转换为js对象
            // console.log(obj);
            if (obj.code == 0) {
              let list = obj.data;
              // 答案
              let answer = list.qanswer;
              thisQuestionTitle.innerText = addHint(thisQuestionTitle.innerText, answer);
              // 所有选项
              let optionAll = thisOption.getElementsByClassName('option');
              let answers = [];
              // 判断答案是否是多个
              if (answer.length > 1) {
                answers = answer.split(",");
              }
              if (answer.length > 1) {
                for (let j = 0; j < answers.length; j++) {
                  for (let i = 0; optionAll.length > i; i++) {
                    if (optionAll[i].innerText.substring(0, 1) === answers[j]) {
                      optionAll[i].click();
                    }
                  }
                }
              } else {
                for (let i = 0; optionAll.length > i; i++) {
                  if (optionAll[i].innerText.substring(0, 1) === answer) {
                    optionAll[i].click();
                  }
                }
              }
            } else {
              // 在题目中插入提示
              thisQuestionTitle.innerText = addHint(thisQuestionTitle.innerText, "没有答案");
              setting.questions.length++;
              setting.questions.indexs[setting.questions.number] = setting.number;
              setting.questions.number++;
            }
          } else {
            alert("服务器错误");
          }
          setting.number++;
        }
      });
    },
    1000);
}
// 数据格式化
function format(obj) {
  obj = obj.replace(/[\r\n]/g, "");
  obj = obj.replace(/[ ]/g, "");
  obj = obj.replace(/[%]/g, "百分号");
  return obj;
}
// 添加提示
function addHint(obj, answer) {
  obj = delHint(obj);
  return obj + "---->" + answer;
}
// 去除提示
function delHint(obj) {
  let index = obj.lastIndexOf("---->");
  if (index !== -1) {
    obj = obj.substring(0, index);
  }
  return obj;
}

//添加题目和对应答案
function updatas1() {
  // 初始化设置
  setting.questions.number = 0;
  // 所有题目
  let questionTitles = document.getElementsByClassName('questionTitle');
  // 所有选项
  let options = document.getElementsByClassName('options');
  let setTimeOut = setInterval(function() {
      // 跳出定时器
      if (setting.questions.number == setting.questions.indexs.length - 1) {
        clearInterval(setTimeOut);
        document.getElementsByClassName('mytitles')[0].innerText = "上传完成，总共上传了" + setting.questions.length + "个";
      }
      // 当前题目
      let thisQuestionTitle = questionTitles.item(setting.questions.indexs[setting.questions.number]);
      // 当前选项和答案
      let thisOptionAndAnswer = options.item(setting.questions.indexs[setting.questions.number]);
      // 当前选项
      let thisOption = thisOptionAndAnswer.getElementsByClassName('option');
      // 格式化后的题目
      let question = format(delHint(thisQuestionTitle.innerText));
      let optionstr = "";
      for (let i = 0; i < thisOption.length; i++) {
        optionstr += thisOption[i].innerText;
      }
      // 格式化后的选项
      let option = format(optionstr);
      // 当前答案
      let thisAnswer = thisOptionAndAnswer.getElementsByClassName('question-explain')[0].getElementsByTagName('span')[
        3].innerText;
      GM_xmlhttpRequest({
        method: "POST",
        url: "http://www.shiqudehuiyi.top:8080/addOption",
        data: "QTitle=" + question + "&QOption=" + option + "&QAnswer=" + thisAnswer,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        synchronous: true,
        onload: function(data) {
          console.log(data);
          if (data.status == 200) {
            console.log(data.responseText);
          }
        }
      });
      setting.questions.number++;
    },
    1000);
}


function f() {
    let x = window.screen.width / 2;
    let y = window.screen.height / 2;
    var i = $('<div>提交成功</div>');
    i.css({
        "position": "absolute",
        left: (x + 50) + "px",
        top: (y + 20) + "px",
        opacity: 1
    });
    $("body").append(i);
    i.animate({

    }, 1000, function() {
        i.remove();
    })
}
//修改题目
function updateOption(obj, id, i) {
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://www.shiqudehuiyi.top:8080/webTest_7_Web_exploded/updateOption",
        data: "title=" + obj[0] + "&option=" + obj[1] + "&answer=" + obj[2] + "&id=" + id,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        synchronous: true,
        onload: function(data) {
            console.log(data);
            if (data.status == 200) {
                console.log(data.responseText);
            }
            i++;
        }
    });
    return i;
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
    let contents = $(
        "<div id=\"initmode\" style=\"background-color: rgba(255,255,255,0.1); width: 100px; height: 50px; position: absolute; top: 200px; right: 10px;\">" +
        "<div style=\"text-align: center; margin-top: 10px;\">" +
        "<input type=\"button\" value=\"开始\" id=\"buttonin\"/>&nbsp;" +
        "<input type=\"button\" value=\"上传数据\" id=\"buttonout\"/>" +
        "</div>" +
        "<div class=\"mytitles\" style=\"font-size: 30px;color: black;\"></div>"+
        "</div>");
    $("body").append(contents);
}
