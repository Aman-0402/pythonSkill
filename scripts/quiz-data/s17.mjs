// Session 17: NumPy Operations
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What does vectorised maths mean?`, `An operation is applied to every item of an array with no loop`, [`The array is turned into a list first`, `Only the first item is changed`, `The array is sorted first`], `NumPy does the loop for you in fast code.`],
  [`What does np.array([10, 20, 30, 40]) // 3 give?`, `[ 3  6 10 13]`, [`[3.33 6.67 10. 13.33]`, `[ 3  6  9 12]`, `[1 2 0 1]`], `// is floor division on each item.`, `import numpy as np
print(np.array([10, 20, 30, 40]) // 3)`],
  [`What does np.array([10, 20, 30, 40]) % 3 give?`, `[1 2 0 1]`, [`[ 3  6 10 13]`, `[0 0 0 0]`, `[1 1 1 1]`], `% gives the remainder of each item.`, `import numpy as np
print(np.array([10, 20, 30, 40]) % 3)`],
  [`What is the total cost?

import numpy as np

price = np.array([100, 250, 80])
qty = np.array([2, 1, 5])
print((price * qty).sum())`, `850`, [`430`, `1000`, `600`], `200 + 250 + 400 is 850.`, `import numpy as np
print((np.array([100, 250, 80]) * np.array([2, 1, 5])).sum())`],
  [`What does np.sqrt(np.array([1, 4, 9, 16])) give?`, `[1. 2. 3. 4.]`, [`[1 2 3 4]`, `[1 16 81 256]`, `10.0`], `The square root of each item, as floats.`, `import numpy as np
print(np.sqrt(np.array([1, 4, 9, 16])))`],
  [`What does np.abs(np.array([-3, 2, -7])) give?`, `[3 2 7]`, [`[-3  2 -7]`, `[3 2 -7]`, `12`], `abs removes the minus signs.`, `import numpy as np
print(np.abs(np.array([-3, 2, -7])))`],
  [`What does np.round(np.array([1.234, 5.678]), 2) give?`, `[1.23 5.68]`, [`[1. 6.]`, `[1.2 5.7]`, `[1.234 5.678]`], `The second argument is the number of decimals.`, `import numpy as np
print(np.round(np.array([1.234, 5.678]), 2))`],
  [`Why use np.sqrt instead of math.sqrt on an array?`, `np.sqrt works on a whole array, math.sqrt only on one number`, [`math.sqrt is not allowed`, `np.sqrt is slower`, `They are exactly the same`], `math.sqrt on an array gives a TypeError.`],
  [`What does np.array([0, 25, 37, 100]) * 9 / 5 + 32 give?`, `[ 32.   77.   98.6 212. ]`, [`[ 32  77  98 212]`, `[0. 25. 37. 100.]`, `[ 32.  77.  98.6 210. ]`], `This converts Celsius to Fahrenheit for every item.`, `import numpy as np
print(np.array([0, 25, 37, 100]) * 9 / 5 + 32)`],
  [`What is broadcasting?`, `NumPy stretching a smaller array to fit a bigger one`, [`Sending an array over the internet`, `Sorting an array`, `Making random numbers`], `It lets arrays of different shapes work together.`],
  [`What does np.array([[1, 2, 3], [4, 5, 6]]) + 10 give?`, `Every item gets 10 added`, [`Only the first row changes`, `An error`, `10 is added once to the total`], `The single number is used for every item.`],
  [`What is [[1, 2, 3], [4, 5, 6]] + [100, 200, 300] for arrays?`, `[[101 202 303] [104 205 306]]`, [`[[101 102 103] [104 105 106]]`, `[[101 202 303]]`, `An error`], `The row is added to each row.`],
  [`Do shapes (2, 3) and (3,) broadcast together?`, `Yes`, [`No, 2 does not match 3`, `Only if both are 1D`, `Only with a loop`], `Sizes are compared from the right-hand end, and 3 matches 3.`],
  [`Do shapes (2, 3) and (2,) broadcast together?`, `No`, [`Yes`, `Only for addition`, `Only for multiplication`], `3 does not match 2.`],
  [`Do shapes (2, 3) and (2, 1) broadcast together?`, `Yes, the 1 is stretched to 3`, [`No, the shapes differ`, `Only for text`, `Only if the array is square`], `A size of 1 can always be stretched.`],
  [`What error appears for np.ones((2, 3)) + np.array([1, 2])?`, `ValueError`, [`NameError`, `SyntaxError`, `KeyError`], `The shapes cannot be broadcast together.`],
  [`What does np.where(marks >= 50, "Pass", "Fail") do?`, `Picks Pass where the test is true and Fail where it is false`, [`Finds the position of 50`, `Sorts the marks`, `Prints Pass once`], `It is a vectorised if and else.`],
  [`What does np.clip(np.array([-5, 3, 12, 7, 20]), 0, 10) give?`, `[ 0  3 10  7 10]`, [`[-5  3 12  7 20]`, `[0 3 0 7 0]`, `[ 0  3 10  7 20]`], `Below 0 becomes 0 and above 10 becomes 10.`, `import numpy as np
print(np.clip(np.array([-5, 3, 12, 7, 20]), 0, 10))`],
  [`What does (marks > 90).any() mean?`, `True if at least one mark is above 90`, [`True if every mark is above 90`, `The number of marks above 90`, `The biggest mark`], `any needs just one match.`],
  [`What does (marks > 30).all() mean?`, `True only if every mark is above 30`, [`True if one mark is above 30`, `The number of marks`, `The smallest mark`], `all needs every item to match.`],
  [`What is printed?

import numpy as np

marks = np.array([45, 82, 67, 91, 38, 74])
print((marks >= 50).sum())`, `4`, [`2`, `6`, `3`], `82, 67, 91 and 74 are 50 or more.`, `import numpy as np
marks = np.array([45, 82, 67, 91, 38, 74])
print((marks >= 50).sum())`],
  [`What does np.count_nonzero(marks < 50) count?`, `How many marks are below 50`, [`The sum of the marks below 50`, `The biggest mark`, `The marks equal to 0`], `True counts as non-zero.`],
  [`What does np.median(np.array([1, 2, 3, 4, 1000])) give?`, `3.0`, [`202.0`, `1000.0`, `4.0`], `The middle value, which one huge number hardly moves.`, `import numpy as np
print(np.median(np.array([1, 2, 3, 4, 1000])))`],
  [`What does np.array([1, 2, 3, 4, 1000]).mean() give?`, `202.0`, [`3.0`, `1000.0`, `10.0`], `The huge number pulls the mean up.`, `import numpy as np
print(np.array([1, 2, 3, 4, 1000]).mean())`],
  [`What does a.std() measure?`, `How spread out the numbers are`, [`The middle value`, `The total`, `The biggest number`], `std is the standard deviation.`],
  [`What is a.var() compared to a.std()?`, `The square of std`, [`Half of std`, `The same as std`, `The square root of std`], `Variance is the standard deviation squared.`],
  [`What does np.percentile(a, 90) give?`, `The value that 90 percent of the items are below`, [`The 90th item`, `90 percent of the total`, `The mean times 0.9`], `It is a position in the sorted data.`],
  [`What does a.prod() give?`, `All the items multiplied together`, [`All the items added`, `The biggest item`, `The number of items`], `prod is the product.`],
  [`What does marks.sum(axis=0) give for a table with rows as students?`, `The total of each column (subject)`, [`The total of each row (student)`, `One total for everything`, `An error`], `axis=0 goes down the columns.`],
  [`What does marks.sum(axis=1) give for a table with rows as students?`, `The total of each row (student)`, [`The total of each column`, `One total for everything`, `An error`], `axis=1 goes across the rows.`],
  [`What does keepdims=True do in a.sum(axis=1, keepdims=True)?`, `Keeps the result as a table, shape (2, 1) for 2 rows`, [`Keeps the original array unchanged`, `Keeps only the first row`, `Raises an error`], `That lets you divide each row by its own total.`],
  [`What does np.cumsum(np.array([5, 3, 8, 2, 7])) give?`, `[ 5  8 16 18 25]`, [`[5 3 8 2 7]`, `[25 20 17  9  7]`, `25`], `A running total.`, `import numpy as np
print(np.cumsum(np.array([5, 3, 8, 2, 7])))`],
  [`What does np.diff(np.array([5, 3, 8, 2, 7])) give?`, `[-2  5 -6  5]`, [`[ 2 -5  6 -5]`, `[5 3 8 2 7]`, `[-2  5 -6  5  0]`], `The change from each item to the next, one item shorter.`, `import numpy as np
print(np.diff(np.array([5, 3, 8, 2, 7])))`],
  [`What does np.argsort(np.array([45, 82, 67, 91, 38])) give?`, `[4 0 2 1 3]`, [`[38 45 67 82 91]`, `[3 1 2 0 4]`, `[0 1 2 3 4]`], `argsort gives positions, and 38 is at position 4.`, `import numpy as np
print(np.argsort(np.array([45, 82, 67, 91, 38])))`],
  [`What does np.unique(colours, return_counts=True) give back?`, `The different values and how many times each appears`, [`Only the first value`, `The sorted array only`, `An error`], `It returns two arrays: names and counts.`],
  [`What does np.hstack([a, b]) do for two 1D arrays?`, `Joins them end to end into one longer array`, [`Stacks them as two rows`, `Adds them`, `Multiplies them`], `hstack puts them side by side.`],
  [`What does np.vstack([a, b]) do?`, `Stacks the arrays as rows, one above the other`, [`Joins them end to end into one row`, `Adds them`, `Sorts them`], `v is for vertical.`],
  [`What does np.concatenate([t1, t2], axis=1) do for two tables?`, `Puts the second table beside the first`, [`Puts the second table below the first`, `Adds the tables`, `Multiplies the tables`], `axis=1 adds more columns.`],
  [`Why does np.concatenate(a, b) fail?`, `The arrays must be given in a list, np.concatenate([a, b])`, [`concatenate does not exist`, `The arrays are too small`, `a and b must be strings`], `The second argument is the axis, not another array.`],
  [`What does a[:, np.newaxis] do to an array of shape (3,)?`, `Makes it a column of shape (3, 1)`, [`Makes it a row of shape (1, 3)`, `Removes it`, `Sorts it`], `newaxis adds a dimension of size 1.`],
  [`Which gives a copy: ravel() or flatten()?`, `flatten() always gives a copy`, [`ravel() always gives a copy`, `Both always give views`, `Neither gives a copy`], `ravel returns a view when it can.`],
  [`What does rng.integers(1, 7, size=5) give?`, `Five whole numbers from 1 to 6`, [`Five whole numbers from 1 to 7`, `Five floats between 1 and 7`, `Seven numbers`], `The high value 7 is not included.`],
  [`What does rng.random(3) give?`, `Three floats from 0.0 up to but not including 1.0`, [`Three whole numbers`, `Three numbers between 1 and 3`, `The number 3`], `random gives floats between 0 and 1.`],
  [`What does a seed do for random numbers?`, `Makes the same numbers come out again`, [`Makes the numbers truly random`, `Makes the numbers bigger`, `Stops the generator`], `The same seed gives the same numbers.`],
  [`What is printed for comparing default_rng(42).random(4) with another default_rng(42).random(4) using np.array_equal?`, `True`, [`False`, `None`, `An error`], `Same seed, same numbers.`, `import numpy as np
print(np.array_equal(np.random.default_rng(42).random(4), np.random.default_rng(42).random(4)))`],
  [`What does rng.choice(names, size=3, replace=False) do?`, `Picks 3 different names`, [`Picks the same name 3 times`, `Picks 3 names and may repeat`, `Sorts the names`], `replace=False stops repeats.`],
  [`What does rng.normal(170, 10, size=1000) make?`, `Bell-curve numbers around 170 with a spread of about 10`, [`Numbers from 170 to 1000`, `Numbers all equal to 170`, `Whole numbers from 10 to 170`], `The first number is the mean and the second is the standard deviation.`],
  [`What does np.bincount(rolls) show?`, `How many times each whole number appears`, [`The sum of the rolls`, `The sorted rolls`, `The biggest roll`], `It counts the occurrences of 0, 1, 2 and so on.`],
  [`What does rng.shuffle(a) return?`, `None, it changes a in place`, [`A shuffled copy`, `The first item`, `The shuffled shape`], `Use rng.permutation(a) for a shuffled copy.`],
  [`What does (a - a.min()) / (a.max() - a.min()) do?`, `Scales the numbers to run from 0 to 1`, [`Sorts the numbers`, `Finds the average`, `Rounds the numbers`], `The smallest becomes 0 and the biggest becomes 1.`],
]
