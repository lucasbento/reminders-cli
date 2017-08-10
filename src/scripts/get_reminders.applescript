--tell application "Reminders"
--    set reminderList to get properties of every reminder whose completed is false
--    repeat with reminder in reminderList
--      return reminder
--    end repeat
--end tell


tell application "Reminders"
    set todo_accounts to every account
    -- accounts have lists. loop thru accounts to get their lists.
    repeat with i from 1 to length of todo_accounts
        tell account i
            set todo_lists to get every list
            -- lists have reminders. loop thru lists to get their reminders
            repeat with j from 1 to length of todo_lists
                tell list j
                    set todos to (get reminders)
                    -- if there are no reminders for a list, then ignore the list
                    if length of todos is greater than 0 then
                    -- Write out the name of the list
                        do shell script "echo " & (quoted form of (get name)) & " >> ~/Desktop/todos.txt"
                        -- loop thru the reminders to get properties
                        repeat with k from 1 to length of todos
                            set this_todo to item k of todos
                            do shell script "echo [  ] " & (quoted form of (get name of this_todo)) & " >> ~/Desktop/todos.txt"
                        end repeat
                    end if
                end tell
            end repeat
        end tell
    end repeat
end tell