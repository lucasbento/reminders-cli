on run argv
    set dateString to date (item 1 of argv & " " & item 2 of argv)
    tell application "Reminders"
        make new reminder with properties { name: item 1 of argv, due date: dateString }
    end tell
end run
