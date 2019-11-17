// backgroundで受け取った値をコンソールに表示
function logBackgroundValue () {
    var test = chrome.extension.getBackgroundPage().test_value;
    console.log(test);
    return;
}

// 現在アクティブなタブにデータを送信
function sendToContents(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,
            JSON.stringify({ contents: "test value from popup" }),
            function (response) {
            });
    });
}

function setVal(trigger, keyVal) {
  chrome.storage.local.set({
    trigger: trigger,
    key: keyVal
  });
}

function readVal() {
  chrome.storage.local.get(["trigger", "key"], function(items) {
    if(items.trigger !== undefined && items.key !== undefined){
      document.getElementById("triggerSelect").value = items.trigger
      document.getElementById("keyInput").value = items.key
    }
  });
}

function onClick() {
  const trigger = document.getElementById("triggerSelect").value
  const keyVal = document.getElementById("keyInput").value
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      trigger: trigger,
      key: keyVal
    });
  });
  setVal(trigger, keyVal);
}

document.getElementById('save').addEventListener('click', onClick);

readVal();
