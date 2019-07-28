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

function dompath(elem) {
  let path;
  while (elem) {
    let subSelector = elem.localName;
    if (!subSelector) {
      break;
    }
    subSelector = subSelector.toLowerCase();
    const parent = elem.parentElement;
    if (parent) {
      const sameTagSiblings = parent.children;
      if (sameTagSiblings.length > 1) {
        let nameCount = 0;
        const index = [...sameTagSiblings].findIndex((child) => {
          if (elem.localName === child.localName) {
            nameCount++;
          }
          return child === elem;
        }) + 1;
        if (index > 1 && nameCount > 1) {
          subSelector += ':nth-child(' + index + ')';
        }
      }
    }

    path = subSelector + (path ? '>' + path : '');
    elem = parent;
  }
  console.log(path);
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