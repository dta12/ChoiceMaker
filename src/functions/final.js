var factors_str = localStorage.getItem("factor_str")
var imp_str = localStorage.getItem("imp_int")
var sig_str = localStorage.getItem("sig_int")
var string_factors = factors_str.split(",")
var integer_imp = imp_str.split(",")
var integer_sig = sig_str.split(",")

var main = localStorage.getItem("main")
document.getElementById("grand").innerHTML = main

for (i = 0; i < string_factors.length; i++) {
    var nextDiv = document.createElement("div")
    nextDiv.className = "myDIV"
    var content = "factor: " + string_factors[i] + ", significance: " + integer_sig[i] + ", importance: " + integer_imp[i]
    fixed_content = content.replace(new RegExp('"', 'g'), '')
    var nextText = document.createTextNode(fixed_content)
    nextDiv.appendChild(nextText)
    element = document.getElementById("variables")
    element.appendChild(nextDiv)
}
var count = 0
var total = 0

for (j = 0; j < integer_imp.length; j++) {
    int_sig = integer_sig[j].replace(/\D/g, "");
    int_imp = integer_imp[j].replace(/\D/g, "");
    total = total + parseInt(int_sig) * parseInt(int_imp)
    count = count + 100 * 100
}
var average = total / count
var final_average = average * 100
document.getElementById("finalresult").innerText = final_average.toString() + "%"

var json = {
    choices: [{
        "mainchoice": main,
        "factor": string_factors,
        "significance": integer_sig,
        "importance": integer_imp,
    }]
};
document.getElementById("data").innerHTML = json