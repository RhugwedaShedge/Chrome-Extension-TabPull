
let myLinks = []

const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
let delBtn = document.getElementsByClassName("del-btn")
let copyBtn = document.getElementsByClassName("copy-btn")

const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (linksFromLocalStorage) {
    if (typeof linksFromLocalStorage == "string") {
        myLinks = [linksFromLocalStorage]
    } else {
        myLinks = linksFromLocalStorage
    }
    renderLinks(myLinks)
}

// Execute the function on click
saveBtn.addEventListener("click", function saveLink() {
    
    myLinks.push(inputEl.value)
    
    // Clearing the text of input box
    inputEl.value = ""

    // Save the myLinks array to localStorage
    localStorage.setItem("myLinks", JSON.stringify(myLinks))

    // Rendering the links on the webpage
    renderLinks(myLinks)
})

function renderLinks(links) {
    
    let listItems = ""

    for (let i = 0; i < links.length; i++) {
    
        // Template String/Literals
        listItems += `
                <li>
                    <a target = '_blank' href='${links[i]}' id="a-tag">
                        ${links[i]}
                    </a> 
                    <button class="del-btn ${i}">X</button>
                    <button class="copy-btn ${i}"><img src="copy.png" alt=""></button>
                </li> ` 
        
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLinks = []
    renderLinks(myLinks)
})

tabBtn.addEventListener("click", function() {
    
    // Grap the url of the current tab -- chrome.tabs    
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {

        myLinks.push(tabs[0].url)

        // Save the myLinks array to localStorage
        localStorage.setItem("myLinks", JSON.stringify(myLinks))

        renderLinks(myLinks)

    })

})

let index

for (i = 0; i < delBtn.length; i++) {

    delBtn[i].addEventListener("click", function () {
    
        index = this.classList[1]

        // Deleting the element from myLinks
        myLinks.splice(index, 1)
        
        localStorage.setItem("myLinks", JSON.stringify(myLinks))

        // Rendering the links on the webpage
        renderLinks(myLinks)
    })

    copyBtn[i].addEventListener("click", function () {

        index = this.classList[1]

        let copyText = myLinks[index];

        var textArea = document.createElement("textarea");
        
        document.body.appendChild(textArea);
        // setAttribute('value', value) works with "input" does not work with "textarea".
        textArea.value = copyText;
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        copyBtn[index].innerHTML = `<img src="tick.jpg" alt="">`
        
    })
}




