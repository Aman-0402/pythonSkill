FILE = "todo.txt"

def load():
    tasks = []
    try:
        with open(FILE) as f:
            for line in f:
                tasks.append(line.strip())
    except FileNotFoundError:
        pass
    return tasks

def save(tasks):
    with open(FILE, "w") as f:
        for task in tasks:
            f.write(task + "\n")

tasks = load()
print("You have", len(tasks), "tasks")

new = input("New task (or press Enter to skip): ")
if new:
    tasks.append(new)
    save(tasks)

for i, task in enumerate(tasks, start=1):
    print(i, task)
