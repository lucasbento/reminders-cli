on run argv
  tell application "Reminders"
    delete (every reminder whose name is item 1 of argv)
  end tell
end run
