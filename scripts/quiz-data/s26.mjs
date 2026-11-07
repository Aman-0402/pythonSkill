// Session 26: Exploratory Data Analysis (EDA)
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is EDA?`, `Getting to know a dataset before building on it`, [`A chart library`, `A kind of database`, `A way to save files`], `Look at size, quality and patterns first.`],
  [`Who named exploratory data analysis?`, `John Tukey`, [`Guido van Rossum`, `Ada Lovelace`, `Wes McKinney`], `He was a statistician.`],
  [`What comes first in the EDA workflow?`, `Writing down the goal and questions`, [`Drawing charts`, `Building a model`, `Saving the file`], `Questions guide everything else.`],
  [`Which check finds repeated rows?`, `df.duplicated().sum()`, [`df.isna().sum()`, `df.shape`, `df.dtypes`], `Then decide whether to drop them.`],
  [`How can describe() reveal a typing mistake?`, `The min or max looks impossible`, [`It prints a warning`, `It removes the row`, `It colours the value`], `A quantity of 500 stood out in our data.`],
  [`What does right-skewed mean?`, `Most values are small with a long tail of big ones`, [`Most values are big`, `All values are equal`, `The data is sorted`], `Money data often looks like this.`],
  [`In right-skewed data, how does the mean compare with the median?`, `The mean is bigger`, [`The mean is smaller`, `They are always equal`, `The mean is zero`], `Big values pull the mean up.`],
  [`Which is usually the better typical value for skewed money data?`, `The median`, [`The mean`, `The maximum`, `The sum`], `It is not pulled by a few huge orders.`],
  [`In our shop, which category had the fewest orders but the most revenue?`, `Gadgets`, [`Stationery`, `Books`, `Bags`], `Counting orders and counting money tell different stories.`],
  [`Why look at the count next to an average?`, `An average of a few rows is a weak fact`, [`To make the table wider`, `Because mean needs it`, `To remove blanks`], `Small groups mislead.`],
  [`What does resample("MS").sum() do on a date index?`, `Totals the values for each month`, [`Sorts the months`, `Removes the months`, `Picks a random month`], `"D" is daily and "W" is weekly.`],
  [`What should an EDA end with?`, `A short written summary`, [`A deleted file`, `Only a chart`, `A new dataset`], `Findings, problems and next steps.`],
  [`Should you fill missing ratings with made-up values?`, `No, leave them blank and say so`, [`Yes, always use 5`, `Yes, always use 0`, `Yes, use random numbers`], `Inventing data gives false results.`],
  [`What does nunique() help you spot?`, `Useless columns and identifiers`, [`Missing values only`, `The largest value`, `The chart type`], `One value is useless and all different is an id.`],
]
