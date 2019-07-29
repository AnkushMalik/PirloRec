chrome.runtime.onMessage.addListener(controller);

// #controller : a function which controllers the extension data flow
function controller(message, sender, sendResponse) {
  if (message == "Start") {
    run();
  } else {
    console.log("Pirlo recording stopped");
    run(0);
  }
}

// #run(k) : runs the core scripts depending upon the value of k(integer)
function run(k) {
  const handle_events = e => {
    console.log(e)
    element_path = xpath(e.target);
    console.log(element_path)
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


// #xpath(elem): tracks an element and grabs its unique xpath
function xpath(el) {
  if (typeof el == "string") return document.evaluate(el, document, null, 0, null)
  if (!el || el.nodeType != 1) return ''
  if (el.id) return "//*[@id='" + el.id + "']"
  var sames = [].filter.call(el.parentNode.children, function (x) { return x.tagName == el.tagName })
  return xpath(el.parentNode) + '/' + el.tagName.toLowerCase() + (sames.length > 1 ? '[' + ([].indexOf.call(sames, el) + 1) + ']' : '')
}

// #handle_recording(e,path) : operates various actions depending upon the type of action
function handle_recording(e, path) {
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