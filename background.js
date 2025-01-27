chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ clipboardHistory: [] });
  });
  
  chrome.commands.onCommand.addListener((command) => {
    if (command === "save_clipboard") {
      navigator.clipboard.readText().then((text) => {
        chrome.storage.local.get(["clipboardHistory"], (result) => {
          const history = result.clipboardHistory || [];
          history.unshift(text);
          chrome.storage.local.set({ clipboardHistory: history.slice(0, 50) });
        });
      });
    }
  });
  
  chrome.action.onClicked.addListener(() => {
    console.log("Action clicked");
  });
  