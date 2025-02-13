chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

async function setupAlarm() {
  try {
    const data = await chrome.storage.local.get('alarmSettings');
    // console.log(data)
    const settings = data.alarmSettings || {};

    await chrome.alarms.clear('dailyReminder');
    
    if (settings?.isEnabled) {
      const [hours, minutes] = settings.time.split(':').map(Number);
      const now = new Date();
      const nextAlarm = new Date(now);
      nextAlarm.setHours(hours, minutes, 0, 0);
      
      if (now > nextAlarm) {
        nextAlarm.setDate(nextAlarm.getDate() + 1);
      }
      
      chrome.alarms.create('dailyReminder', {
        when: nextAlarm.getTime(),
        periodInMinutes: 24 * 60 
      });
    }
  } catch (error) {
    console.error('Error setting up alarm:', error);
  }
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.alarmSettings) {
    setupAlarm();
  }
});

chrome.runtime.onInstalled.addListener(setupAlarm);

chrome.alarms.onAlarm.addListener((alarm) => {
    const messages = [
      "Oh joy! Time for your favorite activity - filling out the WI form! 🎉",
      "Drop everything! Your WI form is feeling lonely and needs attention",
      "Guess what's more exciting than coffee? Your WI form awaits! ☕",
      "Breaking news: Your WI form misses you desperately",
      "Warning: Extreme form-filling excitement ahead! WI form time!",
      "Your daily dose of bureaucratic adventure has arrived - WI form time!",
      "Congratulations! You've won the chance to fill out another WI form!",
      "Alert: Your WI form is having separation anxiety. Please help.",
      "Stop whatever important thing you're doing - WI form > everything",
      "Your WI form is throwing a tantrum. Time to give it some love!"
    ];
  
    if (alarm.name === 'dailyReminder') {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/logo.png',
        title: 'Form Reminder',
        message: messages[Math.floor(Math.random() * messages.length)],
        priority: 2
      });
    }
  });

chrome.notifications.onClicked.addListener(() => {
  chrome.sidePanel.open();
});