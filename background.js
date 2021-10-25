function rateChange(command) {
  /* Don't do anything if no video is found */
  if (!document.querySelector('video')) return;
  
  /* Hardcode minimum/maximum/incremental values */
  const rateIncrement = 0.5;
  const rateMax = 4;
  const rateMin = rateIncrement;
  
  /* Get the current rate from the first video on the page */
  const rateCurrent = document.querySelector('video').playbackRate;
  let rateNew = rateCurrent;
  
  /* Calculate the new rate based on input command */
  switch (command) {
    case 'run-pbrs-increment':
      rateNew += rateIncrement;
      break;
    case 'run-pbrs-decrement':
      rateNew -= rateIncrement;
      break;
    case 'run-pbrs-reset':
      rateNew = 1;
      break;
    /* if no matching command is found, we can leave early */
    default:
      return;
  }
  
  
  /* Do not allow rate to drop below the minimum or go above the maximum values */
  if ((rateNew < 0 && rateCurrent !== rateMin) ||
      (rateNew > 0 && rateCurrent !== rateMax))
    /* Update all videos on the page with the new rate */
    Array.from(document.querySelectorAll('video')).forEach(
      el => el.playbackRate = rateNew
    );
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
