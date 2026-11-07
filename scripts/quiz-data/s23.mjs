// Session 23: Sorting, Merging and Joining
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`How do you sort by maths with the highest first?`, `df.sort_values("maths", ascending=False)`, [`df.sort("maths", high=True)`, `df.order("maths")`, `df.sort_values("maths", reverse=True)`], `ascending=False puts the biggest first.`],
  [`What does sort_values(["city", "maths"]) do with ties in city?`, `Uses maths to break them`, [`Removes them`, `Leaves a blank`, `Gives an error`], `The list gives the order of sorting.`],
  [`What does reset_index(drop=True) do after sorting?`, `Renumbers the rows and forgets the old numbers`, [`Sorts the rows again`, `Drops the first row`, `Adds a new index column`], `Without drop=True the old index becomes a column.`],
  [`Which gives the top 2 rows by maths?`, `df.nlargest(2, "maths")`, [`df.top(2, "maths")`, `df.max(2)`, `df.head("maths", 2)`], `It is quicker than sort plus head.`],
  [`Two students tie on the top mark. What rank do both get with method="min"?`, `1`, [`1.5`, `2`, `0`], `The default method would give both 1.5.`],
  [`What does pd.concat([jan, feb]) do?`, `Stacks the rows of the two tables`, [`Matches the rows by id`, `Adds the numbers together`, `Compares the tables`], `The tables go in a list.`],
  [`Why use ignore_index=True in concat?`, `To renumber the rows from 0`, [`To ignore the columns`, `To remove duplicates`, `To keep the old numbers`], `Otherwise you see 0, 1, 0, 1.`],
  [`In concat, what happens to a column found in only one table?`, `It is filled with NaN for the other rows`, [`It is dropped`, `It causes an error`, `It is filled with 0`], `Columns are matched by name.`],
  [`Which is the default kind of join in merge?`, `inner`, [`left`, `right`, `outer`], `Inner keeps only keys found in both tables.`],
  [`Which how= keeps every row of the left table?`, `left`, [`inner`, `right`, `cross`], `Rows with no match get NaN.`],
  [`Which how= keeps every row of both tables?`, `outer`, [`inner`, `left`, `both`], `It is useful for finding what does not match.`],
  [`What does indicator=True add to a merge?`, `A _merge column saying where each row came from`, [`A row number`, `A chart`, `A count of matches`], `It shows both, left_only or right_only.`],
  [`When the key has a different name in each table, what do you use?`, `left_on and right_on`, [`on_left and on_right`, `key1 and key2`, `rename_on`], `Both columns stay, so drop the extra one.`],
  [`What do the _x and _y endings after a merge mean?`, `Both tables had a column with that name`, [`The columns are x and y axes`, `The merge failed`, `The rows were doubled`], `Use suffixes= for clearer names.`],
  [`Why can a merge give more rows than the left table?`, `The right table has repeated keys`, [`merge adds blank rows`, `Inner joins always grow`, `It cannot`], `Check len() before and after.`],
  [`What does df.apply(f, axis=1) call f on?`, `Each row`, [`Each column`, `Each cell`, `The whole table once`], `Use row["maths"] inside the function.`],
]
