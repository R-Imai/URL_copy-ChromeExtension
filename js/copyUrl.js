function copyFunc(val){
  const copyField = document.createElement("textarea");
  copyField.textContent = val;
  const bodyElem = document.getElementsByTagName("body")[0]
  bodyElem.appendChild(copyField);
  copyField.select();

  document.execCommand('copy');

  bodyElem.removeChild(copyField);
}

function copyUrl(){
  copyFunc(decodeURI(location.href).replace(/ /g, '%20'));
}

function keyDownEvent(e) {
  const keyVal = e.key;
  const keyCode = e.keyCode;
  const isAlt = e.altKey;
  const isCtrl = e.ctrlKey;
  const isCmd = e.metaKey;
  const isShift = e.shiftKey;
  const triggerArr = [isAlt, isCtrl, isCmd, isShift]
  if (triggerArr[copyConfig.triggerIndex] && keyCode === copyConfig.keyCode){
    copyUrl();
    console.log('URL copy!')
  }
}

const copyConfig = {
  key: 'c',
  keyCode: 67,
  triggerIndex: 0
}

function setCopyConfig(key, trigger, keyCode) {
  copyConfig.key = key !== ''? key: 'c';
  copyConfig.keyCode = Number.isNaN(keyCode) ? 67 : Number(keyCode);
  copyConfig.triggerIndex = Number.isNaN(trigger) ? 0 : Number(trigger);
}

document.addEventListener('keydown', keyDownEvent);

chrome.runtime.onMessage.addListener(function(msg) {
  if(msg.trigger !== undefined && msg.key !== undefined && msg.keyCode !== undefined){
    setCopyConfig(msg.key, msg.trigger, msg.keyCode);
  }
});

chrome.storage.local.get(["trigger", "key", "keyCode"], function(items) {
  if(items.trigger !== undefined && items.key !== undefined && items.keyCode !== undefined){
    setCopyConfig(items.key, items.trigger, items.keyCode);
  }
});
