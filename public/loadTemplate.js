fetch("/content").then(function (response) {
    return response.text();
}).then(function (text) {
    console.log(text);
    document.getElementsByClassName("main-content")[0].innerHTML = text;
});
//# sourceMappingURL=loadTemplate.js.map