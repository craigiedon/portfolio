function publicationList(publications) {
    var confList = document.createElement("ul");
    for (var _i = 0, publications_1 = publications; _i < publications_1.length; _i++) {
        var confPaper = publications_1[_i];
        var confItem = document.createElement("li");
        var paperLinkDom = document.createElement("div");
        if (confPaper.paperLink) {
            paperLinkDom.insertAdjacentHTML("beforeend", "<a href=\"" + confPaper.paperLink + "\"> paper link </a>");
        }
        if (confPaper.supplementaryMaterial) {
            paperLinkDom.insertAdjacentHTML("beforeend", "<a href=\"" + confPaper.supplementaryMaterial + "\"> technical supplement </a>");
        }
        confItem.append(printAuthors(confPaper.authors) + " (" + confPaper.year + "). " + confPaper.title + ". In " + confPaper.conference);
        confItem.appendChild(paperLinkDom);
        confList.appendChild(confItem);
    }
    return confList;
}
function printAuthors(authors) {
    var surnamesFirst = authors.map(function (author) {
        var _a = author.split(" "), firstName = _a[0], lastName = _a[1];
        return lastName + ", " + firstName[0] + ".";
    }).join(", & ");
    return surnamesFirst;
}
fetch("/front-page-content")
    .then(function (response) {
    return response.text();
})
    .then(function (text) {
    document.getElementsByClassName("main-content")[0].innerHTML = text;
    return fetch("/publications");
})
    .then(function (response) {
    return response.json();
})
    .then(function (publications) {
    var publicationFrag = document.createElement("div");
    var confHeader = document.createElement("h3");
    confHeader.innerText = "Conference Papers";
    var absHeader = document.createElement("h3");
    absHeader.innerText = "Extended Abstracts";
    var confList = publicationList(publications["conference"]);
    var absList = publicationList(publications["abstract"]);
    publicationFrag.appendChild(confHeader);
    publicationFrag.appendChild(confList);
    publicationFrag.appendChild(absHeader);
    publicationFrag.appendChild(absList);
    document.getElementById("publications").insertAdjacentElement('afterend', publicationFrag);
});
//# sourceMappingURL=loadTemplate.js.map