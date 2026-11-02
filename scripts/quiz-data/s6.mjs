// Session 6: Loop Practice
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

// runs the code and prints everything it printed on one line, so a multi-line output can be checked as one answer
const flat = (code) => `import io, contextlib
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
${code.split('\n').map((l) => '    ' + l).join('\n')}
print(" ".join(buf.getvalue().split()))`

export default [
  [`In a nested loop, how often does the inner loop run for each round of the outer loop?`, `From start to finish, every time`, [`Only once`, `Only in the first round`, `Never`], `For every round of the outer loop, the inner loop runs completely.`],
  [`How many lines are printed by for i in range(1, 3): for j in range(1, 4): print(i, j) ?`, `6`, [`3`, `5`, `9`], `2 outer rounds times 3 inner rounds is 6.`, `count = 0
for i in range(1, 3):
    for j in range(1, 4):
        count += 1
print(count)`],
  [`In a pattern program, what does the outer loop usually control?`, `The rows`, [`The columns only`, `The colours`, `The file name`], `The outer loop counts the rows, and the inner part prints what is inside each row.`],
  [`What does print("*", end="") do?`, `Prints a star and stays on the same line`, [`Prints a star and starts a new line`, `Prints nothing`, `Prints the word end`], `end="" removes the new line that print normally adds.`],
  [`Why is an empty print() used after the inner loop in a star rectangle?`, `To move to a new line after each row`, [`To print a blank star`, `To stop the program`, `To start a new loop`], `Without it the whole pattern would be on one line.`],
  [`What does this print? for row in range(3): for col in range(5): print("*", end=""); print()`, `***** ***** *****`, [`*****`, `* * * * *`, `*** ***`], `It prints a rectangle of 3 rows with 5 stars each.`, flat(`for row in range(3):
    for col in range(5):
        print("*", end="")
    print()`)],
  [`How many stars are printed in the last row of for i in range(1, 6): print("*" * i) ?`, `5`, [`6`, `1`, `4`], `Row i has i stars, and the last value of i is 5.`, `for i in range(1, 6):
    row = "*" * i
print(len(row))`],
  [`Which loop prints an inverted triangle that starts with 5 stars and ends with 1?`, `for i in range(5, 0, -1): print("*" * i)`, [`for i in range(1, 6): print("*" * i)`, `for i in range(5): print("*" * i)`, `for i in range(0, 5, -1): print("*" * i)`], `Counting down from 5 to 1 makes the rows shrink.`],
  [`What does this print? for i in range(1, 4): print(str(i) * i)`, `1 22 333`, [`1 2 3`, `1 12 123`, `111 222 333`], `Row i repeats the text of i, i times.`, flat(`for i in range(1, 4):
    print(str(i) * i)`)],
  [`What does the number triangle for i in range(1, 4): for j in range(1, i + 1): print(j, end=" "); print() print?`, `1 1 2 1 2 3`, [`1 2 3 1 2 3 1 2 3`, `1 1 1 2 2 2`, `1 2 3`], `Row i prints the numbers from 1 to i.`, flat(`for i in range(1, 4):
    for j in range(1, i + 1):
        print(j, end=" ")
    print()`)],
  [`In a pyramid with n = 4 rows, how many spaces come before the stars in the first row?`, `3`, [`4`, `0`, `1`], `The first row needs n - i spaces: 4 - 1 is 3.`, `n = 4
i = 1
print(n - i)`],
  [`In a pyramid, how many stars are in row i?`, `2 * i - 1`, [`i`, `2 * i`, `i * i`], `The rows have 1, 3, 5, 7 ... stars, which are the odd numbers.`],
  [`How many stars are in row 4 of a pyramid made with "*" * (2 * i - 1) ?`, `7`, [`8`, `4`, `5`], `2 * 4 - 1 is 7.`, `i = 4
print(len("*" * (2 * i - 1)))`],
  [`What is the factorial of 5?`, `120`, [`25`, `15`, `100`], `5 x 4 x 3 x 2 x 1 is 120.`, `fact = 1
for i in range(1, 6):
    fact *= i
print(fact)`],
  [`What is the factorial of 0, by definition?`, `1`, [`0`, `Undefined`, `-1`], `0! = 1 by definition.`],
  [`Why must the variable fact start at 1 and not 0 in a factorial program?`, `Because anything multiplied by 0 stays 0`, [`Because 1 is faster than 0`, `Because loops cannot start at 0`, `Because fact is a keyword`], `The product starts from 1 so the multiplication works.`],
  [`In a program that works out several factorials with a loop inside a loop, where should fact = 1 be written?`, `Inside the outer loop, before the inner loop`, [`Before the outer loop`, `After the outer loop`, `Inside the inner loop after the multiplication`], `It must be reset for every number, or the values keep growing across rounds.`],
  [`What is the factorial of 6?`, `720`, [`120`, `360`, `5040`], `6! = 6 x 120 = 720.`, `fact = 1
for i in range(1, 7):
    fact *= i
print(fact)`],
  [`Which of these is a prime number?`, `29`, [`27`, `21`, `25`], `29 has no divisors other than 1 and itself. 27, 21 and 25 are divisible by 3, 3 and 5.`],
  [`Is 1 a prime number?`, `No`, [`Yes`, `Only in Python`, `It depends on the number system`], `A prime number must be greater than 1.`],
  [`Which number is the only even prime number?`, `2`, [`4`, `0`, `6`], `Every other even number is divisible by 2.`],
  [`In a prime check, why is break used when a divisor is found?`, `One divisor is enough to know the number is not prime`, [`To make the loop longer`, `To print the number`, `To start the loop again`], `There is no need to keep checking after the first divisor.`],
  [`In the prime program, what does the flag is_prime = True and then is_prime = False do?`, `It remembers the result of the search for a divisor`, [`It prints the answer`, `It stops the loop`, `It converts the number to text`], `The flag starts True and flips to False if a divisor is found.`],
  [`Up to which value is it enough to check divisors when testing if n is prime?`, `The square root of n`, [`n divided by 2 only`, `n multiplied by 2`, `n squared`], `A divisor can only be as large as the square root of n, so the loop can stop there.`],
  [`How many prime numbers are there from 1 to 30?`, `10`, [`9`, `11`, `12`], `They are 2, 3, 5, 7, 11, 13, 17, 19, 23 and 29.`, `count = 0
for n in range(2, 31):
    if all(n % i != 0 for i in range(2, n)):
        count += 1
print(count)`],
  [`What are the first 10 terms of the Fibonacci series?`, `0 1 1 2 3 5 8 13 21 34`, [`1 2 3 4 5 6 7 8 9 10`, `0 1 2 3 5 8 13 21 34 55`, `1 1 2 4 8 16 32 64 128 256`], `Each number is the sum of the two before it.`, flat(`a, b = 0, 1
for _ in range(10):
    print(a, end=" ")
    a, b = b, a + b`)],
  [`In the Fibonacci program, what does a, b = b, a + b do?`, `Updates both values at once`, [`Swaps a and b only`, `Adds a and b to a list`, `Stops the loop`], `The next term becomes b and the new b is the sum, so no third variable is needed.`],
  [`In for _ in range(10): what is the underscore?`, `A loop variable that we do not use`, [`A keyword`, `A string`, `An error`], `_ is a common name for a value you do not need.`],
  [`Which loop is the better choice for printing exactly 10 Fibonacci terms?`, `A for loop with range(10)`, [`A while loop with no limit`, `An if statement`, `A comment`], `You know the number of terms in advance.`],
  [`What is the reverse of the number 1221 found with rev = rev * 10 + n % 10 in a while loop?`, `1221`, [`1212`, `2112`, `1122`], `1221 reads the same forwards and backwards, so it is a palindrome number.`, `n = 1221
rev = 0
while n > 0:
    rev = rev * 10 + n % 10
    n //= 10
print(rev)`],
  [`What is the reverse of the number 123?`, `321`, [`123`, `132`, `213`], `The digits are taken from the end one by one.`, `n = 123
rev = 0
while n > 0:
    rev = rev * 10 + n % 10
    n //= 10
print(rev)`],
  [`What is a palindrome number?`, `A number that reads the same forwards and backwards`, [`A number with only even digits`, `A number divisible by itself`, `A number with 3 digits`], `For example 121 and 1221.`],
  [`What is the GCD of 48 and 18 found with the loop while b != 0: a, b = b, a % b ?`, `6`, [`3`, `9`, `12`], `This is the Euclid method. The last non-zero value is 6.`, `a, b = 48, 18
while b != 0:
    a, b = b, a % b
print(a)`],
  [`Which mistake puts the whole pattern on one line?`, `Forgetting print() after the inner loop`, [`Using range(1, 6)`, `Using a colon`, `Using 4 spaces`], `The empty print() at the outer loop level ends each row.`],
  [`Which range gives the numbers from 1 to n including n?`, `range(1, n + 1)`, [`range(1, n)`, `range(n)`, `range(1, n - 1)`], `The stop number is never included.`],
  [`What does this print? for i in range(1, 4): for j in range(i): print(i, end=" "); print()`, `1 2 2 3 3 3`, [`1 2 3`, `1 1 1 2 2 2`, `1 22 333`], `Row i prints the number i, i times.`, flat(`for i in range(1, 4):
    for j in range(i):
        print(i, end=" ")
    print()`)],
]
