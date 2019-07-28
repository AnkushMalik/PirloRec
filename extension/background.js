checker = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
  if (checker % 2 == 0) {
    window.open("https://www.google.com", "_blank");
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if (changeInfo.status == "complete" && tab.active) {
        chrome.tabs.sendMessage(tab.id, "Start");
      }
    });
    chrome.tabs.onUpdated.addListener();
  } else {
    chrome.tabs.sendMessage(tab.id, "Stop");
  }
  checker++;
});
