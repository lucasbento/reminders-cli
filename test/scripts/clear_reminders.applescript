on run argv
  tell application "Reminders"
    delete (every reminder whose name starts with item 1 of argv)
  end tell
end run
