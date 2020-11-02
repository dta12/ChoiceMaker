var factors_list_str = []
var factors_sig_int = []
var factors_imp_int = []
document.getElementById("next_button").onclick = function nextFunc() {
    var var_str = document.getElementById("var_input").value
    var sig_val = document.getElementById("slider_sig").value
    var imp_val = document.getElementById("slider_imp").value
    factors_list_str.push(var_str)
    factors_sig_int.push(sig_val)
    factors_imp_int.push(imp_val)
}
document.getElementById("finish_button").onclick = function finishFunc() {
    factors_str = JSON.stringify(factors_list_str.toString())
    factors_imp = JSON.stringify(factors_sig_int.toString())
    factors_sig = JSON.stringify(factors_imp_int.toString())
    window.localStorage.setItem("factor_str", factors_str);
    window.localStorage.setItem("imp_int", factors_imp);
    window.localStorage.setItem("sig_int", factors_sig);
}