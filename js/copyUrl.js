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
  copyFunc(decodeURI(location.href))
}

function keyDownEvent(e) {
  const keyVal = e.key;
  const isAlt = e.altKey;
  const isCtrl = e.ctrlKey;
  const isCmd = e.metaKey;
  const isShift = e.shiftKey;
  const triggerArr = [isAlt, isCtrl, isCmd, isShift]
  console.log(triggerArr);
  console.log(keyVal);
  if (triggerArr[copyConfig.triggerIndex] && keyVal === copyConfig.key){
    copyUrl();
    console.log('copy!!!')
  }
}

const copyConfig = {
  key: "c",
  triggerIndex: 0
}

function setCopyConfig(key, trigger) {
  copyConfig.key = key !== ''? key: 'c';
  copyConfig.triggerIndex = Number.isNaN(trigger) ? 0 : Number(trigger);
  console.log(copyConfig);
}

document.addEventListener('keydown', keyDownEvent);
chrome.runtime.onMessage.addListener(function(msg) {
  if(msg.trigger !== undefined && msg.key !== undefined){
    setCopyConfig(msg.key, msg.trigger);
  }
});

chrome.storage.local.get(["trigger", "key", "hoge"], function(items) {
  if(items.trigger !== undefined && items.key !== undefined){
    setCopyConfig(items.key, items.trigger);
  }
});
