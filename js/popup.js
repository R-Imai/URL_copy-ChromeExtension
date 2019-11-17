function setVal(trigger, keyVal, keyCode) {
  chrome.storage.local.set({
    trigger: trigger,
    key: keyVal,
    keyCode: keyCode
  });
}

function readVal() {
  chrome.storage.local.get(["trigger", "key", "keyCode"], function(items) {
    if(items.trigger !== undefined && items.key !== undefined && items.keyCode !== undefined){
      document.getElementById("triggerSelect").value = items.trigger
      document.getElementById("keyInput").value = items.key
      document.getElementById("keyCode").value = items.keyCode
    }
  });
}

function onClick() {
  const trigger = document.getElementById("triggerSelect").value;
  const keyVal = document.getElementById("keyInput").value;
  const keyCode = document.getElementById("keyCode").value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      trigger: trigger,
      key: keyVal,
      keyCode: keyCode
    });
  });
  setVal(trigger, keyVal, keyCode);
}

function keyDownEvent(e) {
  const keyCode = e.keyCode;
  const keyVal = e.key;
  if(keyVal.length === 1){
    document.getElementById("keyCode").value = keyCode;
    document.getElementById("keyInput").value = keyVal;
  }
}

document.getElementById("keyInput").addEventListener('keydown', keyDownEvent);
document.getElementById('save').addEventListener('click', onClick);

readVal();
