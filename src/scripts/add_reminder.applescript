on run argv
    set dateString to date (item 2 of argv & " " & item 3 of argv)
    tell application "Reminders"
        make new reminder with properties { name: item 1 of argv, remind me date:date (item 3 of argv)}
        quit
    end tell
end run
