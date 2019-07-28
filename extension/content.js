events_to_record = ["click scroll keyup"]; //all events to map

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
  $("body").on("click scroll input", function(e) {
    element_path = dompath(e.target);
    handle_recording(e, element_path);
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

function handle_recording(e, path) {
  console.log(path);
  switch (e.type) {
    case "click":
      chrome.runtime.sendMessage({ type: "click", path: path });
      break;
    case "input":
      chrome.runtime.sendMessage({
        type: "input",
        path: path,
        value: e.target.value
      });
      break;
    default:
      console.log("tracking only click and data input only as of now");
      break;
  }
}

// function handle_recording(e, path) {
//   switch (e.type) {
//     case "click":
//       $.ajax({
//         url: "http://localhost:8888/record_action",
//         dataType: "json",
//         type: "POST",
//         data: JSON.stringify({ path: path, action: e.type })
//       });
//       console.log("click called");

//       break;
//     case "keyup":
//       $(e.target)
//         .closest("form")
//         .off("submit")
//         .on("submit", function() {
//           input = e.target.val();
//           $.ajax({
//             url: "http://localhost:8888/type_Action",
//             dataType: "json",
//             type: "POST",
//             data: JSON.stringify({ path: path, action: "typed", text: text })
//           });
//           console.log("keyup called");
//         });
//       break;
//   }
// }
