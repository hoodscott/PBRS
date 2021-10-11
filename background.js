function rateChange(command) {
  /* Don't do anything if no video is found */
  if (!document.querySelector('video')) return;
  
  const rateIncrement = 0.5;
  const rateMax = 4;
  const rateMin = rateIncrement;
  let rateChange = 0;
  
  switch (command) {
    case 'run-pbrs-increment':
      rateChange = rateIncrement;
      break;
    case 'run-pbrs-decrement':
      rateChange = -rateIncrement;
      break;
    case 'run-pbrs-reset':
      document.querySelector('video').playbackRate = 1;
    default:
      return;
  }
  
  const rateCurrent = document.querySelector('video').playbackRate;
  
  /* Do not allow rate to drop below the minimum or go above the maximum values */
  if ((rateChange < 0 && rateCurrent !== rateMin) ||
      (rateChange > 0 && rateCurrent !== rateMax))
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
