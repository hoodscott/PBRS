
function rateChange(command) {
  let rateChange = 0;
  
  switch (command) {
    case 'run-pbrs-increment':
      rateChange = 0.5;
      break;
    case 'run-pbrs-decrement':
      rateChange = -0.5;
      break;
    case 'run-pbrs-reset':
      document.querySelector('video').playbackRate = 1;
      return;
  }
  
  /* Do not allow rate to drop below 0.5 */
  if (rateChange >= 0 || document.querySelector('video').playbackRate !== 0.5)
    document.querySelector('video').playbackRate += rateChange;
}

chrome.commands.onCommand.addListener((command, tab) => {
  if (tab.id >= 0 && command.startsWith('run-pbrs-')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: rateChange,
      args: [command]
    });
  };
});