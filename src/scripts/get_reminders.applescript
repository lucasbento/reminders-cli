tell application "Reminders"
    -- Check if there are active reminders
    if (count of (reminders whose completed is false)) > 0 then
        set remindersList to name of reminders whose completed is false
        set output to ""
--        do shell script "echo " & remindersList
        repeat with itemNum from 1 to (count of (remindersList))
            set output to output & "- " & (item itemNum of remindersList) & return
            set output to output & "- " & (item itemNum of remindersList) & linefeed
        end repeat

        return output
    else
        set output to "No reminders available"
    end if
end tell