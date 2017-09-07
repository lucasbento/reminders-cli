on run argv
  tell application "Reminders"
    set currentReminder to get last reminder whose name is item 1 of argv

    set completed of currentReminder to true
  end tell
end run