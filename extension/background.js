checker = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
  if (checker % 2 == 0) {
    window.open("https://www.google.com", "_blank");

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if (changeInfo.status == "complete" && tab.active) {
        chrome.tabs.sendMessage(tab.id, "Start");
      }
    });
  } else {
    chrome.tabs.sendMessage(tab.id, "Stop");
  }
  checker++;
});

chrome.runtime.onMessage.addListener(function(request) {
  let data = request;
  $.ajax({
    url: "http://localhost:3000/record_action",
    dataType: "json",
    type: "POST",
    data: data
  });
  console.log(data);
});
