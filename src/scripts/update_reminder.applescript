on run argv
  tell application "Reminders"
    set currentReminder to get last reminder whose name is item 1 of argv

    set name of currentReminder to item 2 of argv
    set remind me date of currentReminder to my convertDate(item 3 of argv)
    quit
  end tell
end run

on convertDate(textDate)
  set resultDate to the current date

  set the year of resultDate to (text 1 thru 4 of textDate)
  set the month of resultDate to (text 6 thru 7 of textDate)
  set the day of resultDate to (text 9 thru 10 of textDate)
  set the time of resultDate to 0
  set the hours of resultDate to (text 12 thru 13 of textDate)
  set the minutes of resultDate to (text 15 thru 16 of textDate)

  return resultDate
end convertDate