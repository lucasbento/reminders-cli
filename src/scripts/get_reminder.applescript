on run argv
  tell application "Reminders"
    set reminder to last reminder whose name is item 1 of argv
  end tell
end run