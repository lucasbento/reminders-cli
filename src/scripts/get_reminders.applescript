tell application "Reminders"
    if (count of (reminders whose completed is false)) > 0 then
        set remindersList to name of reminders whose completed is false
        return remindersList
    else
        set output to "No reminders available"
    end if
end tell