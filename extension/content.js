chrome.runtime.onMessage.addListener(controller);

function controller(message, sender, sendResponse) {
  if (message == "Start") {
    run();
  } else {
    console.log("Pirlo recording stopped");
    run(0);
  }
}

function run(k) {
  const handle_events = e => {
    console.log(e)
    element_path = dompath(e.target);
    handle_recording(e, element_path);
  }
  $("body").on("mousedown input", function (e) {
    handle_events(e)
  });
  $(function () {
    $('form').submit(function (e) {
      e.preventDefault();
      handle_events(e)
      return true;
    });
  });
  if (k == 0)
    $("body").off("mousedown submit input")
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

function handle_recording(e, path) {
  console.log(path);
  switch (e.type) {
    case "mousedown":
      chrome.runtime.sendMessage({ "type": "click", "path": path });
      break;
    case "input":
      chrome.runtime.sendMessage({
        "type": "input",
        "path": path,
        "value": e.target.value
      });
      break;
    default:
      console.log("tracking only click and data input only as of now");
      break;
  }
}