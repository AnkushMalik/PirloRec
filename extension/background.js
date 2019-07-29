checker = 0; //just for toggle

// # this function creates the session, ie: it helps in init a txt file which is to be populated later on
chrome.browserAction.onClicked.addListener(function (tab) {


  if (checker % 2 == 0) {
    $.ajax({
      url: "http://localhost:3000/run_recorder",
      contentType: "application/json",
      dataType: "json",
      type: "POST",
      data: "{}"
    });
    window.open("https://www.google.com", "_blank");

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status == "complete" && tab.active) {
        chrome.tabs.sendMessage(tab.id, "Start");
      }
    });
  } else {
    chrome.tabs.sendMessage(tab.id, "Stop");
  }
  checker++;
});

// # Below helps in sending user tracking queries to flask server.
chrome.runtime.onMessage.addListener(function (request) {
  let data = JSON.stringify(request);
  $.ajax({
    url: "http://localhost:3000/record_actions",
    contentType: "application/json",
    dataType: "json",
    type: "POST",
    data: JSON.stringify(data)
  });
  // console.log(request);
  // console.log(data);
});
