const prefixCommand = 'run-pbrs-';

function rateChange(command) {
  /* Don't do anything if no video is found */
  const firstVideo = document.querySelector('video');
  if (!firstVideo) return;
  
  /* Hardcode minimum/maximum/incremental values */
  const rateMin = 0.5;
  const rateMax = 4;
  const rateIncrement = rateMin;
  
  /* Get the current rate from the first video on the page */
  const rateCurrent = firstVideo.playbackRate;
  let rateNew = rateCurrent;
  
  /* Calculate the new rate based on input command */
  switch (command) {
    case 'increment':
      rateNew += rateIncrement;
      break;
    case 'decrement':
      rateNew -= rateIncrement;
      break;
    case 'reset':
      rateNew = 1;
      break;
    /* if no matching command is found, we can leave early */
    default:
      return;
  }
  
  /* Do not allow rate to drop below the minimum or go above the maximum values */
  if ((rateNew >= rateMin) && (rateNew <= rateMax))
    /* Update all videos on the page with the new rate */
    Array.from(document.querySelectorAll('video')).forEach(
      el => el.playbackRate = rateNew
    );
}

chrome.commands.onCommand.addListener((command, tab) => {
  if (tab.id >= 0 && command.startsWith(prefixCommand)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: rateChange,
      args: [command.substring(prefixCommand.length)]
    });
  };
});
