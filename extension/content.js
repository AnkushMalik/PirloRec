events_to_record = ["click scroll submit keypres"]; //all events to map

chrome.runtime.onMessage.addListener(controller);

function controller(message, sender, sendResponse) {
  console.log(message);

  if (message == "Start") {
    run();
  } else {
    console.log("Pirlo recording stopped");
  }
}

function run() {
  $("body").on("click scroll submit", function(e) {
    element_path = dompath(e.target);
    event_type = e.type;
    handle_recording(event_type, element_path);
  });
}

function dompath(element) {
  var path = "";
  for (; element && element.nodeType == 1; element = element.parentNode) {
    var inner = $(element).children().length == 0 ? $(element).text() : "";
    var eleSelector =
      element.tagName.toLowerCase() +
      (inner.length > 0 ? ":contains('" + inner + "')" : "");
    path = " " + eleSelector + path;
  }
  return path;
}

function handle_recording() {}
