on run argv
  set dateString to current date + (item 2 of argv * days)
  set time of dateString to item 3 of argv * hours
  set minutes of dateString to 0 * hours
  tell application "Reminders"
    make new reminder with properties { name: item 1 of argv, remind me date: dateString }
  end tell
end run
