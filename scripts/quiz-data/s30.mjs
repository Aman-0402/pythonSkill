// Session 30: Final Assessment and Next Steps
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is 7 // 2 in Python?`, `3`, [`3.5`, `1`, `4`], `// is whole-number division.`, `print(7 // 2)`],
  [`What does "python"[1:4] give?`, `yth`, [`pyt`, `ytho`, `tho`], `The end index is not included.`, `print("python"[1:4])`],
  [`How many times does for i in range(3, 10, 2) run?`, `4`, [`3`, `5`, `7`], `It gives 3, 5, 7 and 9.`, `print(len(range(3, 10, 2)))`],
  [`What is the difference between a list and a tuple?`, `A list can change and a tuple cannot`, [`A tuple can change and a list cannot`, `They are the same`, `A list holds only numbers`], `Tuples are immutable.`],
  [`Which safely reads a key that may be missing?`, `d.get(key)`, [`d[key]`, `d.key()`, `d.find(key)`], `It gives None instead of an error.`],
  [`In SQL, which keyword filters rows?`, `WHERE`, [`SELECT`, `FROM`, `ORDER BY`], `It matches a pandas condition.`],
  [`Which SQL keyword matches pandas groupby?`, `GROUP BY`, [`JOIN`, `LIMIT`, `WHERE`], `Combine it with AVG or SUM.`],
  [`Which SQL keyword matches pandas merge?`, `JOIN`, [`UNION BY`, `MERGE ALL`, `GROUP BY`], `a JOIN b ON a.id = b.id.`],
  [`What does a p-value measure?`, `The chance of a gap this big if the groups were really the same`, [`The size of the sample`, `How correct the data is`, `The percent of blanks`], `Under 0.05 by habit means unlikely to be luck.`],
  [`What does Power BI mainly make?`, `Interactive dashboards`, [`Python packages`, `Web servers`, `Databases`], `Click a city and every chart changes.`],
  [`In Power BI, what is closest to cleaning with pandas?`, `Power Query`, [`Publish`, `Slicers`, `Cards`], `It saves each step.`],
  [`In scikit-learn, what are X and y?`, `The clues and the answer to predict`, [`Two chart axes only`, `Two file names`, `Rows and columns`], `Features and target.`],
  [`Why use train_test_split?`, `To measure the model on data it has not seen`, [`To make training faster`, `To clean the data`, `To double the data`], `It is the honest way to measure.`],
  [`Predicting a house price is which kind of machine learning?`, `Regression`, [`Classification`, `Clustering`, `Sorting`], `It predicts a number.`],
  [`Sorting customers into types with no answers given is which kind?`, `Clustering`, [`Regression`, `Classification`, `Merging`], `Clustering finds groups by itself.`],
  [`What is the usual first job after this course?`, `Data analyst`, [`Chief data officer`, `Compiler engineer`, `Database administrator`], `You use exactly what you learned here.`],
]
