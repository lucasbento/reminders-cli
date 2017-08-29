on run argv
  tell application "Reminders"
    set currentReminder to last reminder whose name is item 1 of argv

    set name of currentReminder to item 1 of argv
    set due date of currentReminder to item 2 of argv & " " & item 3 of argv
  end tell
end run