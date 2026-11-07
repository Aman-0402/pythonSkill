while True:
    text = input("Enter your age: ")
    try:
        age = int(text)
    except ValueError:
        print("Please type a whole number.")
        continue
    if age < 0:
        print("Age cannot be negative.")
        continue
    break

print("Your age is", age)
