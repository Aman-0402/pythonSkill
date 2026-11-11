// Session 15: Exception Handling
// [question, right answer, [wrong answers], explanation, optional Python that prints the right answer]

export default [
  [`What is an exception?`, `An error that happens while the program is running`, [`A comment in the code`, `A kind of loop`, `A way to import a module`], `If nothing handles it, the program stops.`],
  [`What error does print(10 / 0) cause?`, `ZeroDivisionError`, [`ValueError`, `TypeError`, `NameError`], `You cannot divide by zero.`],
  [`Does the line after a crashing line still run if nothing handles the error?`, `No, the program stops`, [`Yes, always`, `Only if it is a print`, `Only the first time`], `An unhandled exception ends the program.`],
  [`When does a SyntaxError appear?`, `Before the program runs, because Python cannot read the code`, [`Only when the program divides by zero`, `Only when a file is missing`, `Only at the end`], `The code itself is broken.`],
  [`Can a try block in the same file catch a SyntaxError?`, `No`, [`Yes, always`, `Only with finally`, `Only with raise`], `A SyntaxError happens before the program runs.`],
  [`Which keyword holds the risky code?`, `try`, [`except`, `finally`, `raise`], `try holds the code that might fail.`],
  [`Which keyword holds the plan for an error?`, `except`, [`try`, `else`, `assert`], `except runs when the matching error happens.`],
  [`What is printed?

try:
    print("A")
    print(5 / 0)
    print("B")
except ZeroDivisionError:
    print("C")`, `A then C`, [`A then B then C`, `A then B`, `C only`], `B is skipped because the error happens before it.`],
  [`If no error happens in the try block, what happens to the except block?`, `It is skipped`, [`It runs anyway`, `It runs twice`, `It gives an error`], `except only runs after a matching error.`],
  [`What does as e give in except ValueError as e?`, `A name for the error object, so you can print its message`, [`The line number`, `The file name`, `A copy of the program`], `Printing e shows Python's own message.`],
  [`What is printed?

try:
    int("abc")
except ValueError as e:
    print(type(e).__name__)`, `ValueError`, [`int`, `str`, `Error`], `It is the name of the error type.`, `try:
    int("abc")
except ValueError as e:
    print(type(e).__name__)`],
  [`What error does int("abc") cause?`, `ValueError`, [`TypeError`, `NameError`, `KeyError`], `The type is right (text) but the value is not a number.`],
  [`What error does "5" + 3 cause?`, `TypeError`, [`ValueError`, `SyntaxError`, `NameError`], `You cannot add text and a number.`],
  [`What error does print(total) cause when total was never made?`, `NameError`, [`TypeError`, `KeyError`, `ValueError`], `The name does not exist.`],
  [`What error does [1, 2][5] cause?`, `IndexError`, [`KeyError`, `ValueError`, `TypeError`], `The position is out of range.`],
  [`What error does {"a": 1}["b"] cause?`, `KeyError`, [`IndexError`, `NameError`, `ValueError`], `The key is not in the dictionary.`],
  [`What error does "hi".push(1) cause?`, `AttributeError`, [`TypeError`, `NameError`, `KeyError`], `A string has no method called push.`],
  [`What error does open("nope.txt") cause when the file is missing?`, `FileNotFoundError`, [`NameError`, `ValueError`, `ModuleNotFoundError`], `Reading a missing file fails.`],
  [`What error does import mathh cause?`, `ModuleNotFoundError`, [`NameError`, `ImportantError`, `FileNotFoundError`], `No module has that name.`],
  [`Which error means the spaces at the start of a line are wrong?`, `IndentationError`, [`SpaceError`, `TabError only`, `NameError`], `Python uses indentation to know the blocks.`],
  [`In except (ValueError, TypeError):, what do the brackets do?`, `Handle both errors with one plan`, [`Handle only the first error`, `Make an error`, `Skip the try block`], `A tuple of error names matches any of them.`],
  [`How does Python pick among several except blocks?`, `It runs the first one that matches, checking in order`, [`It runs all of them`, `It runs the last one`, `It picks at random`], `Put the specific error before the general one.`],
  [`What is printed?

try:
    int("x")
except Exception:
    print("general")
except ValueError:
    print("specific")`, `general`, [`specific`, `general then specific`, `Nothing`], `Exception matches first, so ValueError can never run.`, `try:
    int("x")
except Exception:
    print("general")
except ValueError:
    print("specific")`],
  [`When does the else block of a try statement run?`, `Only when there was no error`, [`Only when there was an error`, `Always`, `Never`], `else holds the code for when all went well.`],
  [`When does the finally block run?`, `Always, whether there was an error or not`, [`Only when there is an error`, `Only when there is no error`, `Never`], `It is for clean-up.`],
  [`What is printed?

try:
    print(10 / 2)
except ZeroDivisionError:
    print("error")
else:
    print("ok")
finally:
    print("done")`, `5.0 then ok then done`, [`5.0 then done`, `error then done`, `ok then done`], `No error, so else runs, and finally always runs.`],
  [`What is printed?

try:
    print(10 / 0)
except ZeroDivisionError:
    print("error")
else:
    print("ok")
finally:
    print("done")`, `error then done`, [`error then ok then done`, `ok then done`, `done only`], `else is skipped after an error, and finally still runs.`],
  [`What does a function print when try returns a value and finally has a print?`, `The finally print runs before the value comes back`, [`The finally print is skipped`, `Only the return value is shown`, `An error appears`], `finally runs even when try has a return.`],
  [`What is the main job of finally?`, `Clean-up such as closing a file`, [`Catching errors`, `Making loops`, `Importing modules`], `It runs no matter what.`],
  [`What does the raise keyword do?`, `Makes an exception on purpose`, [`Catches an exception`, `Ends the program silently`, `Repeats the try block`], `Use it when your code finds something wrong.`],
  [`Which error fits raise when a function gets age -3?`, `ValueError`, [`NameError`, `SyntaxError`, `IndexError`], `The type is right but the value is not acceptable.`],
  [`Which part catches the error: the function that raises it or the code that calls it?`, `The code that calls it decides and catches`, [`The function that raises it`, `Python catches it by itself`, `Nobody can catch it`], `The function raises, the caller handles.`],
  [`What does a custom exception class inherit from?`, `Exception`, [`int`, `str`, `print`], `class MyError(Exception): pass makes a new error type.`],
  [`What is wrong with a bare except: that has no error name?`, `It catches every error, even your own typing mistakes`, [`It is a syntax error`, `It only catches ValueError`, `It runs faster`], `You never learn what really went wrong.`],
  [`What is better than a bare except?`, `except Exception as e, then print or log e`, [`except: pass`, `Removing try`, `A longer try block`], `At least you see the error message.`],
  [`Why is except: pass a bad habit?`, `It hides bugs without any message`, [`It makes the file bigger`, `It stops the program`, `It is not allowed`], `The error is thrown away without a word.`],
  [`How big should a try block be?`, `Small, only the line that can fail`, [`As big as the whole program`, `Always 10 lines`, `It does not matter`], `A small block shows exactly what failed.`],
  [`Which line of a traceback should you read first?`, `The last line`, [`The first line`, `The middle line`, `Any line`], `It names the error and gives the reason.`],
  [`What do the File ... line N lines of a traceback show?`, `The chain of calls that led to the error`, [`The list of imported modules`, `The variables`, `The output so far`], `The last step is where it crashed.`],
  [`What does print(type(x)) help you find?`, `Which type a value really has, which solves many TypeError problems`, [`The size of x`, `The name of the file`, `The line number`], `Text and numbers are easy to mix up.`],
  [`What is print debugging?`, `Printing values to see what the program is doing`, [`Deleting all print lines`, `Using only the debugger`, `Printing the whole file`], `Remove the debug prints when you are done.`],
  [`What is an off by one error?`, `Counting one step too many or too few, such as forgetting that range(5) stops at 4`, [`Using one line too many`, `Writing one extra space`, `Missing one import`], `Check your start and end values.`],
  [`What does assert square(5) == 25 do when it is true?`, `Nothing, the program carries on`, [`Prints True`, `Stops the program`, `Raises an error`], `assert only complains when the condition is false.`],
  [`What error does a failing assert raise?`, `AssertionError`, [`ValueError`, `TypeError`, `TestError`], `You can add a message after a comma.`],
  [`When should you use try and except instead of assert?`, `For problems that can happen in real use, like bad input or a missing file`, [`To test your own code`, `Never`, `Only inside loops`], `assert is for checking your own code.`],
  [`What is printed?

def to_number(text):
    try:
        return float(text)
    except ValueError:
        return None
print(to_number("hello"))`, `None`, [`0`, `An error`, `hello`], `The except block returns None instead of crashing.`, `def to_number(text):
    try:
        return float(text)
    except ValueError:
        return None
print(to_number("hello"))`],
  [`What is printed?

total = 0
for line in ["80", "abc", "95"]:
    try:
        total += int(line)
    except ValueError:
        pass
print(total)`, `175`, [`0`, `An error`, `80`], `The abc line is skipped and the loop carries on.`, `total = 0
for line in ["80", "abc", "95"]:
    try:
        total += int(line)
    except ValueError:
        pass
print(total)`],
  [`What does the loop with try, continue and break do for safe number input?`, `Keeps asking until the input is valid`, [`Asks exactly once`, `Asks three times`, `Never asks`], `break leaves the loop only when the input is good.`],
  [`Why use try for a missing file instead of checking first?`, `It handles the missing file and other problems too`, [`It is shorter in every case`, `Checking never works`, `try makes the file`], `try covers errors you did not think of.`],
]
