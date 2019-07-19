interface Publication {
  authors: string[];
  title: string;
  year: number;
  conference: string;
  paperLink?: string;
  supplementaryMaterial?: string;
}

function publicationList(publications : Array<Publication>) : HTMLUListElement{
    let confList = document.createElement("ul");

    // Convert json publications to html list elements
    for (let confPaper of publications) {
      let confItem = document.createElement("li");
      let paperLinkDom = document.createElement("div");

      if (confPaper.paperLink) {
        paperLinkDom.insertAdjacentHTML("beforeend", `<a href="${confPaper.paperLink}"> paper link </a>`);
      }
      if (confPaper.supplementaryMaterial) {
        paperLinkDom.insertAdjacentHTML("beforeend", `<a href="${confPaper.supplementaryMaterial}"> technical supplement </a>`)
      }

      confItem.append(`${printAuthors(confPaper.authors)} (${confPaper.year}). ${confPaper.title}. In ${confPaper.conference}`);
      confItem.appendChild(paperLinkDom);
      confList.appendChild(confItem);
    }

    return confList
}

function printAuthors(authors: Array<string>): string {
  let surnamesFirst = authors.map((author) => {
    let [firstName, lastName] = author.split(" ");
    return `${lastName}, ${firstName[0]}.`;
  }).join(", & ");
  return surnamesFirst;
}

fetch("/front-page-content")
  .then(function (response) {
    return response.text()
  })
  .then(function (text) {
    document.getElementsByClassName("main-content")[0].innerHTML = text
    return fetch("/publications");
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (publications) {
    let publicationFrag = document.createElement("div")

    let confHeader = document.createElement("h3");
    confHeader.innerText = "Conference Papers";

    let absHeader = document.createElement("h3");
    absHeader.innerText = "Extended Abstracts";

    let confList = publicationList(publications["conference"])
    let absList = publicationList(publications["abstract"])

    // Insert publication list into DOM
    publicationFrag.appendChild(confHeader);
    publicationFrag.appendChild(confList);

    publicationFrag.appendChild(absHeader);
    publicationFrag.appendChild(absList);

    document.getElementById("publications").insertAdjacentElement('afterend', publicationFrag);
  });