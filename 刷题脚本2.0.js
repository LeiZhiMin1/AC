function select() {
    let questions = document.getElementsByClassName("questionTitle"); //题目
    let options = document.getElementsByClassName("options"); //选项
    let arrays = [];
    for (let i = 0; i < questions.length; i++) {
        let questionImg = document.getElementsByClassName("question")[i].getElementsByClassName("questionImg");
        let option = options[i].innerText.replace(/[\r\n]/g, "");
        let arr = [];
        let question = questions[i].innerText.replace(/[\r\n]/g, "");
        if (question.lastIndexOf("-->") >= 0) {
            question = question.substring(0, question.lastIndexOf("-->")); //去除提示
        }
        if (questionImg.length > 0) {
            let questionImgsrc = questionImg.item(0).children.item(0).src; //图片地址
            arr[0] = question + questionImgsrc;
        } else {
            arr[0] = question;
        }
        arr[0] = arr[0].replace(/[ ]/g, "");
        arr[1] = option;
        arr[1] = arr[1].replace(/[ ]/g, "");
        arrays[i] = arr;
    }
    let i = 0;
    let setTimeOut = setInterval(function() {
            // console.log(i);
            if (i == arrays.length - 1) clearInterval(setTimeOut);
            GM_xmlhttpRequest({
                method: "POST",
                url: "http://localhost:8080/webTest_7_Web_exploded/selectOption",
                data: "title=" + arrays[i][0] + "&option=" + arrays[i][1],
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                synchronous: true,
                onload: function(data) {
                    if (data.status == 200) { //解析返回是否成功
                        let obj = $.parseJSON(data.responseText); //转换为js对象
                        // console.log(obj);
                        let questionTitles = questions[i];
                        if (questionTitles.innerText.lastIndexOf("-->") >= 0) {
                            questionTitles.innerText = questionTitles.innerText.substring(0,
                                questionTitles.innerText.lastIndexOf("-->"));
                        }
                        if (obj.code == 0) {
                            let list = obj.data;
                            // console.log(list);
                            questionTitles.innerText = questionTitles.innerText + "-->" + list[0].q_answer;
                            let number = null;
                            if (list[0].q_answer.length > 1) {
                                number = list[0].q_answer.split(",");
                            }
                            let option1 = options[i].getElementsByClassName("option"); //第几题的全部选项
                            let sum = 0;
                            for (let j = 0; j < option1.length; j++) {
                                let op = option1[j].innerText;
                                if (list[0].q_answer.length == 1) {
                                    if (list[0].q_answer == op.substring(0, 1)) {
                                        option1[j].click();
                                    }
                                } else {
                                    if (number[sum] == op.substring(0, 1)) {
                                        option1[j].click();
                                        sum++;
                                    }
                                }
                            }
                        } else {
                            questionTitles.innerText = questionTitles.innerText + "-->没有答案";
                        }
                    } else {
                        alert("服务器错误");
                    }
                    i++;
                }
            });
        },
        2000);
}

//添加题目和对应答案
function updatas1() {
    let questions = document.getElementsByClassName("questionTitle"); //题目集合
    let options = document.getElementsByClassName("options"); //选项集合
    let answers = document.getElementsByClassName("question-explain"); //答案集合
    let arrays = [];
    let sum = 0; //题目下标
    for (let i = 0; i < answers.length; i++) {
        let question = questions[i];
        let aray = [];
        let answer = answers[i].children[1].innerText.substring(6, answers[i].children[1].innerText.length); //正确答案
        let questionImg = document.getElementsByClassName("question")[i].getElementsByClassName("questionImg"); //图片
        let newAnswer = question.innerText.substring(question.innerText.lastIndexOf("-->") + 2, question.innerText.length);
        console.log(newAnswer + "  " + answer);
        console.log(newAnswer === answer);
        if (question.innerText.indexOf("-->没有答案") >= 0) {
            aray[0] = question.innerText.substring(0, question.innerText.lastIndexOf("-->没有答案")); //题目
            if (questionImg.length > 0) {
                let questionImgsrc = questionImg.item(0).children.item(0).src; //图片地址
                aray[0] += questionImgsrc;
            }
            aray[0] = aray[0].replace(/[ ]/g, "");
            aray[1] = options[i].innerText.replace(/[\r\n]/g, "");
            aray[1] = aray[1].replace(/[ ]/g, "");
            aray[1] = aray[1].substring(0, aray[1].lastIndexOf("您的答案为")); //题目选项
            aray[2] = answer; //答案
            aray[3] = 0; //0等于新增题目1等于更新题目
            arrays[sum] = aray;
            sum++;
        } else if (newAnswer == answer) {
            console.log(newAnswer + "  " + answer);
            // aray[0] = question.innerText.substring(0, question.innerText.lastIndexOf("-->")); //题目
            // if (questionImg.length > 0) {
            //     let questionImgsrc = questionImg.item(0).children.item(0).src; //图片地址
            //     aray[0] += questionImgsrc;
            // }
            // aray[1] = options[i].innerText.replace(/[\r\n]/g, "");
            // aray[1] = aray[1].substring(0, aray[1].lastIndexOf("您的答案为")); //题目选项
            // aray[2] = answer; //答案
            // aray[3] = 1; //0等于新增题目1等于更新题目
            // arrays[sum] = aray;
        }
    }
    console.log(arrays);
    let i = 0;
    let setTimeInput = setInterval(function() {
        if (i == arrays.length - 1) {
            f();
            clearInterval(setTimeInput);
        }
        if (arrays[i][3] == 0) {
            GM_xmlhttpRequest({
                method: "POST",
                url: "http://localhost:8080/webTest_7_Web_exploded/addOption",
                data: "title=" + arrays[i][0] + "&option=" + arrays[i][1] + "&answer=" + arrays[i][2],
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
        }
    }, 500);
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
        url: "http://localhost:8080/webTest_7_Web_exploded/updateOption",
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
        "</div>");
    $("body").append(contents);
}
