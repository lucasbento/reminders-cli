on run argv
  tell application "Reminders"
    set completed of (last reminder whose name contains item 1 of argv) to true
  end tell
end run