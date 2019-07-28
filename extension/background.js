checker = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
  if (checker % 2 == 0) {
    window.open("https://www.google.com", "_blank");

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if (changeInfo.status == "complete" && tab.active) {
        $.ajax({
          url: "http://localhost:3000/run_recorder",
          contentType: "application/json",
          dataType: "json",
          type: "POST",
          data: "{}"
        });
        chrome.tabs.sendMessage(tab.id, "Start");
      }
    });
  } else {
    chrome.tabs.sendMessage(tab.id, "Stop");
  }
  checker++;
});

chrome.runtime.onMessage.addListener(function(request) {
  let data = JSON.stringify(request);
  $.ajax({
    url: "http://localhost:3000/record_actions",
    contentType: "application/json",
    dataType: "json",
    type: "POST",
    data: JSON.stringify(data)
  });
  console.log(request);
  console.log(data);
});
