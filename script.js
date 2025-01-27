const historyList = document.getElementById("history-list");
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-btn");

// Load Clipboard History
function loadHistory(searchQuery = "") {
  historyList.innerHTML = ""; // Clear previous entries
  chrome.storage.local.get(["clipboardHistory"], (result) => {
    const history = result.clipboardHistory || [];
    const filteredHistory = searchQuery
      ? history.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
      : history;

    if (filteredHistory.length === 0) {
      historyList.innerHTML = `<li class="list-group-item text-muted">No matching results found.</li>`;
      return;
    }

    filteredHistory.forEach((item) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.textContent = item;

      const copyButton = document.createElement("button");
      copyButton.className = "btn btn-sm btn-outline-primary";
      copyButton.textContent = "Copy";
      copyButton.onclick = () => {
        navigator.clipboard.writeText(item);
        alert("Copied to clipboard!");
      };

      li.appendChild(copyButton);
      historyList.appendChild(li);
    });
  });
}

// Event: Initial Load
document.addEventListener("DOMContentLoaded", () => loadHistory());

// Event: Search Functionality
searchButton.addEventListener("click", () => {
  const query = searchBar.value.trim();
  loadHistory(query);
});



// const historyList = document.getElementById("history-list");
// const searchBar = document.getElementById("search-bar");
// const searchButton = document.getElementById("search-btn");

// // Load Clipboard History
// function loadHistory(searchQuery = "") {
//   historyList.innerHTML = ""; // Clear previous entries
//   chrome.storage.local.get(["clipboardHistory"], (result) => {
//     const history = result.clipboardHistory || [];
//     const filteredHistory = searchQuery
//       ? history.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
//       : history;

//     if (filteredHistory.length === 0) {
//       historyList.innerHTML = `<li class="list-group-item text-muted">No matching results found.</li>`;
//       return;
//     }

//     filteredHistory.forEach((item) => {
//       const li = document.createElement("li");
//       li.className = "list-group-item d-flex justify-content-between align-items-center";
//       li.textContent = item;

//       const copyButton = document.createElement("button");
//       copyButton.className = "btn btn-sm btn-outline-primary";
//       copyButton.textContent = "Copy";
//       copyButton.onclick = () => {
//         navigator.clipboard.writeText(item);
//         alert("Copied to clipboard!");
//       };

//       li.appendChild(copyButton);
//       historyList.appendChild(li);
//     });
//   });
// }

// // Event: Initial Load
// document.addEventListener("DOMContentLoaded", () => loadHistory());

// // Event: Search Functionality
// searchButton.addEventListener("click", () => {
//   const query = searchBar.value.trim();
//   loadHistory(query);
// });

// // Event: Store Clipboard Data on Copy
// document.addEventListener("copy", (event) => {
//   const text = event.clipboardData.getData("text");
//   chrome.storage.local.get(["clipboardHistory"], (result) => {
//     const history = result.clipboardHistory || [];
//     history.unshift(text);
//     chrome.storage.local.set({ clipboardHistory: history.slice(0, 50) });
//   });
// });

