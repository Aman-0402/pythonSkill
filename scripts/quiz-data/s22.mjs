// Session 22: Grouping and Aggregation
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What are the three steps behind groupby?`, `Split, apply, combine`, [`Load, clean, save`, `Sort, filter, print`, `Read, write, close`], `Split into groups, calculate, and join the answers.`],
  [`What does df.groupby("city")["maths"].mean() give?`, `The average maths of each city`, [`The average of all maths`, `The cities sorted by maths`, `The number of cities`], `One number per group.`],
  [`What is the difference between size() and count()?`, `size counts all rows, count skips blanks`, [`They are the same`, `size skips blanks, count does not`, `count works only on text`], `A group with a blank shows it clearly.`],
  [`What does df.groupby("city") print on its own?`, `Only a group object, no results`, [`A table of averages`, `The city names`, `An error`], `You must add a calculation such as mean().`],
  [`What does unstack() do to a two-level result?`, `Moves the inner level into columns`, [`Deletes the inner level`, `Sorts the rows`, `Makes a chart`], `It gives a handy cross-table.`],
  [`How do you turn group names back into a normal column?`, `reset_index()`, [`set_index()`, `unstack()`, `rename()`], `as_index=False gives the same result directly.`],
  [`What is the form of named aggregation?`, `avg=("maths", "mean")`, [`avg="maths.mean"`, `mean=avg("maths")`, `("maths", "avg")=mean`], `The new name goes on the left.`],
  [`What does a dictionary in agg do?`, `Picks a calculation for each column`, [`Renames the groups`, `Filters the rows`, `Sorts the columns`], `For example {"maths": "mean", "science": "max"}.`],
  [`What must a function given to agg return?`, `One value for the group`, [`A whole table`, `A list per row`, `Nothing`], `It receives a group as a Series.`],
  [`What is the main difference between agg and transform?`, `transform keeps every row, agg gives one row per group`, [`transform is only for text`, `agg keeps every row`, `They are the same`], `Use transform to compare each row with its group.`],
  [`What does value_counts(normalize=True) show?`, `The fraction of each value`, [`The count of each value`, `The sorted values`, `Only the top value`], `0.5 means half of the rows.`],
  [`Which gives counts of each pair as a table?`, `pd.crosstab(df["city"], df["gender"])`, [`df.pair("city", "gender")`, `df.city.gender.count()`, `pd.merge(df["city"], df["gender"])`], `Add margins=True for the totals.`],
  [`In pivot_table, what goes in index=?`, `What runs down the rows`, [`What runs across the top`, `The numbers to summarise`, `The calculation`], `columns= goes across and values= holds the numbers.`],
  [`What is the default aggfunc of pivot_table?`, `mean`, [`sum`, `count`, `max`], `Pass aggfunc="sum" to change it.`],
  [`Why do group results for Jan, Feb, Mar come out as Feb, Jan, Mar?`, `Groups are sorted alphabetically`, [`pandas shuffles them`, `Feb has the most rows`, `It is a bug`], `Use reindex or real dates to fix the order.`],
]
