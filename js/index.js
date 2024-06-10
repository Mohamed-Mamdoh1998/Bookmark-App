var siteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("bookmarkUrl");

var siteList = [];

if (localStorage.getItem("sitesDetails") !== null) {
    siteList = JSON.parse(localStorage.getItem("sitesDetails"));
    displayData();
}
// Add Bookmark
function addItem() {
    var siteNameValue = siteName.value.trim();
    var siteUrlValue = siteUrl.value.trim();

    // Validate inputs
    if (!isValidInput(siteNameValue, siteUrlValue)) {
        return;
    }

    // Ensure the URL starts with http:// or https://
    if (!siteUrlValue.startsWith('http://') && !siteUrlValue.startsWith('https://')) {
        siteUrlValue = 'http://' + siteUrlValue;
    }

    var siteInfo = {
        name: siteNameValue,
        url: siteUrlValue
    };

    siteList.push(siteInfo);
    localStorage.setItem("sitesDetails", JSON.stringify(siteList));
    clearData();
    displayData();
    
    console.log(siteList);
}

// Clear Input After Submition
function clearData() {
    siteName.value = "";
    siteUrl.value = "";
}
// Display Data in HTML
function displayData() {
    var cartona = "";

    for (var i = 0; i < siteList.length; i++) {
        cartona += `
        <tr>
            <td>${i}</td>
            <td>${siteList[i].name}</td>
            <td><a href="${siteList[i].url}" target="_blank" class="btn btn-warning">Visit</a></td>
            <td><button onclick="deleteItem(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
        `;
    }

    document.getElementById("tbData").innerHTML = cartona;
}

// Remove Data From List And LocalStorage
function deleteItem(index) {
    siteList.splice(index, 1);
    localStorage.setItem("sitesDetails", JSON.stringify(siteList));
    displayData();
}
// Validations
function isValidInput(name, url) {
    if (name === "") {
        alert("Site Name cannot be empty.");
        return false;
    }

    if (url === "") {
        alert("Site URL cannot be empty.");
        return false;
    }

    if (!isValidURL(url)) {
        alert("Please enter a valid URL.");
        return false;
    }

    return true;
}

function isValidURL(string) {
    var res = string.match(/(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?/);
    return (res !== null);
}