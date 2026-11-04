// Session 16: NumPy Basics
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is NumPy?`, `A package for working with numbers in bulk using arrays`, [`A text editor`, `A built-in Python loop`, `A website for Python news`], `Its main tool is the array.`],
  [`How do we normally import NumPy?`, `import numpy as np`, [`import np as numpy`, `from numpy import np`, `include numpy`], `np is the common short name.`],
  [`Which command installs NumPy on your computer?`, `pip install numpy`, [`import numpy`, `python numpy`, `np install`], `pip is run in the terminal.`],
  [`Why are NumPy arrays faster than lists for big data?`, `The loops run in fast compiled code`, [`They store fewer numbers`, `They skip the maths`, `They run on the internet`], `One array operation replaces a slow Python loop.`],
  [`What does np.array([1, 2, 3]) * 2 give?`, `[2 4 6]`, [`[1, 2, 3, 1, 2, 3]`, `[1 2 3 2]`, `12`], `The array doubles every item.`, `import numpy as np
print(np.array([1, 2, 3]) * 2)`],
  [`What does [1, 2, 3] * 2 give for a plain list?`, `[1, 2, 3, 1, 2, 3]`, [`[2, 4, 6]`, `[1, 2, 3, 2]`, `An error`], `A list is repeated, not multiplied.`, `print([1, 2, 3] * 2)`],
  [`What do we call maths done on every item with no loop?`, `Vectorised (element-wise) maths`, [`Recursion`, `Slicing`, `Shuffling`], `It is one of the main reasons to use NumPy.`],
  [`What must be true about all items in a NumPy array?`, `They share one data type`, [`They must be text`, `They must be positive`, `They must be different`], `That is what makes arrays fast and compact.`],
  [`What does print(np.array([1, 2, 3]) + np.array([10, 20, 30])) show?`, `[11 22 33]`, [`[1 2 3 10 20 30]`, `[10 40 90]`, `66`], `Arrays of the same shape are added item by item.`, `import numpy as np
print(np.array([1, 2, 3]) + np.array([10, 20, 30]))`],
  [`What does np.zeros(5) make?`, `[0. 0. 0. 0. 0.]`, [`[0 0 0 0 0]`, `[0. 0. 0. 0.]`, `[1. 1. 1. 1. 1.]`], `zeros makes floats by default.`, `import numpy as np
print(np.zeros(5))`],
  [`What shape does np.ones((2, 3)) have?`, `(2, 3)`, [`(3, 2)`, `(6,)`, `(2,)`], `2 rows and 3 columns.`, `import numpy as np
print(np.ones((2, 3)).shape)`],
  [`What does np.arange(0, 10, 2) give?`, `[0 2 4 6 8]`, [`[0 2 4 6 8 10]`, `[2 4 6 8 10]`, `[0 1 2 3 4]`], `The stop value 10 is not included.`, `import numpy as np
print(np.arange(0, 10, 2))`],
  [`What does np.linspace(0, 1, 5) give?`, `[0.   0.25 0.5  0.75 1.  ]`, [`[0 1 2 3 4]`, `[0.2 0.4 0.6 0.8 1. ]`, `[0. 1.]`], `linspace gives 5 evenly spaced numbers including both ends.`, `import numpy as np
print(np.linspace(0, 1, 5))`],
  [`What does a.ndim give for a table with rows and columns?`, `2`, [`1`, `3`, `the number of rows`], `A table has 2 dimensions.`, `import numpy as np
print(np.array([[1, 2], [3, 4]]).ndim)`],
  [`What is the shape of np.array([[1, 2, 3], [4, 5, 6]])?`, `(2, 3)`, [`(3, 2)`, `(6,)`, `(2,)`], `2 rows and 3 columns.`, `import numpy as np
print(np.array([[1, 2, 3], [4, 5, 6]]).shape)`],
  [`What is the size of an array with shape (4, 5)?`, `20`, [`9`, `4`, `5`], `size is the total number of items, 4 times 5.`, `import numpy as np
print(np.zeros((4, 5)).size)`],
  [`What is the shape of np.array([1, 2, 3])?`, `(3,)`, [`(3)`, `(1, 3)`, `(3, 1)`], `A tuple with one item needs a comma.`, `import numpy as np
print(np.array([1, 2, 3]).shape)`],
  [`What is the shape of np.array([[1], [2], [3]])?`, `(3, 1)`, [`(1, 3)`, `(3,)`, `(3, 3)`], `3 rows and 1 column.`, `import numpy as np
print(np.array([[1], [2], [3]]).shape)`],
  [`What is the dtype of np.array([1.5, 2.5, 3.5])?`, `float64`, [`int64`, `float8`, `str`], `Decimals are float64 by default.`, `import numpy as np
print(np.array([1.5, 2.5, 3.5]).dtype)`],
  [`What is the dtype of np.array([True, False])?`, `bool`, [`int8`, `str`, `float64`], `True and False make a bool array.`, `import numpy as np
print(np.array([True, False]).dtype)`],
  [`What does np.array([1, 2.5, 3]) show?`, `[1.  2.5 3. ]`, [`[1 2.5 3]`, `[1, 2.5, 3]`, `['1' '2.5' '3']`], `Ints and floats become floats.`, `import numpy as np
print(np.array([1, 2.5, 3]))`],
  [`What do you get when you mix numbers and text in one array?`, `All items become text`, [`All items become 0`, `An error`, `Numbers stay numbers`], `NumPy picks one type that fits everything.`],
  [`What does np.array([1.9, 2.5, 3.1]).astype(int) give?`, `[1 2 3]`, [`[2 2 3]`, `[2 3 3]`, `[1.9 2.5 3.1]`], `astype to int cuts off the decimals and does not round.`, `import numpy as np
print(np.array([1.9, 2.5, 3.1]).astype(int))`],
  [`What does np.arange(1, 13).reshape(3, 4) make?`, `A table with 3 rows and 4 columns`, [`A table with 4 rows and 3 columns`, `An error`, `A list of 12 lists`], `reshape keeps the same numbers.`],
  [`Which reshape fails for an array with 12 items?`, `reshape(5, 3)`, [`reshape(3, 4)`, `reshape(2, 6)`, `reshape(12, 1)`], `5 times 3 is 15, not 12.`],
  [`What does -1 mean in a.reshape(3, -1)?`, `Work this size out for me`, [`Make the array negative`, `Reverse the array`, `Remove the last item`], `NumPy works out the missing size.`],
  [`What does a.T do?`, `Swaps the rows and columns`, [`Sorts the array`, `Adds a total`, `Deletes the first row`], `T is the transpose.`],
  [`What is a[-1] for a = np.array([10, 20, 30, 40, 50])?`, `50`, [`10`, `40`, `An error`], `Negative positions count from the end.`, `import numpy as np
print(np.array([10, 20, 30, 40, 50])[-1])`],
  [`What is a[1, 2] for a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])?`, `6`, [`4`, `8`, `2`], `Row 1, column 2.`, `import numpy as np
a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(a[1, 2])`],
  [`What is a[2] for a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])?`, `[7 8 9]`, [`[3 6 9]`, `9`, `[1 2 3]`], `One index gives a whole row.`, `import numpy as np
a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(a[2])`],
  [`What does a[2:5] give for a = np.arange(10, 100, 10)?`, `[30 40 50]`, [`[30 40 50 60]`, `[20 30 40]`, `[20 30 40 50 60]`], `Positions 2, 3 and 4, with the stop not included.`, `import numpy as np
a = np.arange(10, 100, 10)
print(a[2:5])`],
  [`What does a[::-1] do?`, `Reverses the array`, [`Sorts it`, `Removes the last item`, `Makes it empty`], `A step of -1 goes backwards.`],
  [`What does a[::2] give for np.arange(10, 100, 10)?`, `[10 30 50 70 90]`, [`[20 40 60 80]`, `[10 20]`, `[10 30 50 70]`], `Every second item.`, `import numpy as np
print(np.arange(10, 100, 10)[::2])`],
  [`What is a after part = a[1:4] and part[0] = 99 with a = np.array([1, 2, 3, 4, 5])?`, `[ 1 99  3  4  5]`, [`[1 2 3 4 5]`, `[99  2  3  4  5]`, `[99  3  4]`], `A slice is a view, so the original changes too.`, `import numpy as np
a = np.array([1, 2, 3, 4, 5])
part = a[1:4]
part[0] = 99
print(a)`],
  [`What does a[:, 0] give for a 2D array?`, `The first column`, [`The first row`, `The first item`, `The whole array`], `All rows, column 0.`],
  [`What does a[1, :] give for a 2D array?`, `The second row`, [`The second column`, `The first row`, `One item`], `Row 1, all columns.`],
  [`What does a[0:2, 1:3] give for np.arange(1, 17).reshape(4, 4)?`, `[[2 3] [6 7]]`, [`[[1 2] [5 6]]`, `[[2 3 4] [6 7 8]]`, `[[2 3]]`], `Rows 0 and 1, columns 1 and 2.`],
  [`What does marks[marks > 80] do for a NumPy array?`, `Keeps only the items bigger than 80`, [`Sets every item to 80`, `Sorts the array`, `Counts the items`], `The True and False mask works as a filter.`],
  [`Which operators join array conditions?`, `& for and, | for or, with each condition in brackets`, [`and, or, without brackets`, `&& and ||`, `+ and -`], `The words and and or do not work on whole arrays.`],
  [`What does (marks > 70).sum() count?`, `How many items are bigger than 70`, [`The total of all marks`, `The biggest mark`, `The number of rows`], `True counts as 1.`],
  [`What does a[[0, 2, 4]] do?`, `Picks the items at positions 0, 2 and 4`, [`Picks items 0 to 4`, `Makes three copies of a`, `Gives an error`], `A list of positions is called fancy indexing.`],
  [`What does a.sum(axis=0) do for a 2D array?`, `Adds down each column`, [`Adds across each row`, `Adds everything into one number`, `Gives an error`], `axis=0 works down the columns, one answer per column.`],
  [`What does a.sum(axis=1) give for [[1, 2, 3], [4, 5, 6]]?`, `[ 6 15]`, [`[5 7 9]`, `21`, `[ 3 15]`], `axis=1 adds across each row.`, `import numpy as np
print(np.array([[1, 2, 3], [4, 5, 6]]).sum(axis=1))`],
  [`What does a.argmax() give?`, `The position of the biggest item`, [`The biggest item`, `The sum`, `The number of items`], `argmax gives the index, not the value.`],
  [`What error does np.array([1, 2, 3]) + np.array([1, 2, 3, 4]) cause?`, `ValueError, the shapes do not match`, [`NameError`, `SyntaxError`, `No error`], `Shapes (3,) and (4,) cannot be combined.`],
]
