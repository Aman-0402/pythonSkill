// Session 27: Capstone, Part 1: Choose and Clean
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is a capstone?`, `A final project using everything you learned`, [`A Python package`, `A type of chart`, `An exam with no code`], `It is also a first portfolio piece.`],
  [`Which dataset is the best capstone choice?`, `Thousands of rows with numbers, categories and a date`, [`Ten rows of one column`, `A file with names and phone numbers`, `Fifty million rows you cannot open`], `It must be workable and have variety.`],
  [`Which is a good capstone question?`, `Which category earns the most revenue?`, [`Look at sales`, `Is it good?`, `Customers`], `Good questions are specific and answerable with numbers.`],
  [`Why keep the raw file untouched?`, `So the work can be repeated and explained`, [`Raw files are smaller`, `pandas cannot edit it`, `It loads faster`], `All cleaning belongs in code.`],
  [`What should a cleaning plan record?`, `Problem, decision and reason`, [`Only the row count`, `The chart colours`, `The file size`], `Every cleaning step is a decision.`],
  [`Why put the cleaning in one function?`, `It can be repeated, tested and reused`, [`Functions run faster than all code`, `pandas requires it`, `To hide the code`], `Run it again on next month's data.`],
  [`What does assert do when its condition is False?`, `Stops with an AssertionError`, [`Prints a smile`, `Fixes the data`, `Does nothing`], `When True it does nothing.`],
  [`Which check confirms that order ids do not repeat?`, `df["order_id"].is_unique`, [`df["order_id"].unique_check()`, `df.order_id.sum()`, `df.is_sorted()`], `It gives True or False.`],
  [`What does pd.cut do?`, `Sorts numbers into named ranges`, [`Deletes rows`, `Splits text`, `Cuts a file in two`], `Give bins= and labels=.`],
  [`Which format makes a month label that sorts correctly?`, `dt.strftime("%Y-%m")`, [`dt.month_name()`, `dt.day_name()`, `str(date)[0]`], `For example 2024-03.`],
  [`What is a data dictionary?`, `A description of every column`, [`A Python dict of the rows`, `A list of spellings`, `A saved chart`], `It saves hours later.`],
  [`What must you remove from a dataset before sharing it?`, `Personal details such as names and phone numbers`, [`All numbers`, `The dates`, `The column names`], `Never publish private data.`],
]
