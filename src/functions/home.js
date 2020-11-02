document.getElementById("go_button").onclick = function main_choice() {
    var mainchoice_in = document.getElementById("input_text").value
    window.localStorage.setItem("main", mainchoice_in)
}