# TypeScript Practice — NestJS Contribution Roadmap

A structured practice roadmap to learn TypeScript from basics to advanced level,
with the goal of contributing to the NestJS framework.

---

## 📁 Project Structure

typescript-practice/
├── stage-1-basics/
│ ├── calculator/
│ ├── todo-list/
│ └── grade-tracker/
├── stage-2-intermediate/
│ ├── generics/
│ ├── utility-types/
│ └── enums-and-type-guards/
├── stage-3-advanced/
│ ├── decorators/
│ ├── reflect-metadata/
│ └── mini-dependency-injection/
└── README.md

---

## 🚀 How To Use This Repo

1. Work through each stage in order — do not skip ahead
2. Commit after finishing each question, not all at once
3. Write meaningful commit messages like `add todo delete function` not just `update`
4. Add a README.md inside each project folder

---

## ⚙️ Setup

# Install TypeScript globally

npm install -g typescript

# Check version

tsc --version

# Initialize TypeScript in a project folder

npx tsc --init

---

## 📘 STAGE 1 — Basics

### calculator/

1. Create a function that adds two numbers with proper types
2. Create functions for subtract, multiply, divide
3. Handle division by zero with a proper error message
4. Create a type that only allows "add" | "subtract" | "multiply" | "divide"
5. Create one function that takes the operation type and two numbers and returns result

### todo-list/

1. Create a Todo interface with id, title, completed, createdAt
2. Create a function to add a new todo
3. Create a function to mark a todo as completed
4. Create a function to delete a todo by id
5. Create a function to get all completed todos
6. Create a function to get all pending todos

### grade-tracker/

1. Create a Student class with name, age, grades array
2. Add a method to add a grade
3. Add a method to calculate average grade
4. Add a method that returns "Pass" or "Fail" based on average
5. Add a readonly id property that is set once on creation
6. Create an array of students and find the top student

---

## 📗 STAGE 2 — Intermediate

### generics/

1. Create a generic function that returns the first item of any array
2. Create a generic function that returns the last item of any array
3. Create a generic Stack class with push, pop, peek methods
4. Create a generic function that merges two objects together
5. Create a generic function that filters an array based on a condition

### utility-types/

1. Create a User interface with name, email, age, password
2. Use Partial<User> to create an updateUser function
3. Use Pick<User> to create a public profile (no password)
4. Use Omit<User> to create a type without password
5. Use Required<User> to make all fields required
6. Build your OWN version of Partial from scratch using mapped types
7. Build your OWN version of Pick from scratch

### enums-and-type-guards/

1. Create an enum for user roles: Admin, Editor, Viewer
2. Create a function that checks what a user can do based on their role
3. Create a type guard that checks if a value is a string
4. Create a type guard that checks if an object is a Todo
5. Create a discriminated union for shapes: Circle, Rectangle, Triangle
6. Create a function that calculates area using the discriminated union

---

## 📕 STAGE 3 — Advanced

### decorators/

1. Create a @Log decorator that logs the method name when called
2. Improve @Log to also log the arguments passed
3. Create a @Readonly decorator that makes a property readonly
4. Create a @Deprecated decorator that shows a warning when method is used
5. Create a @Timer decorator that logs how long a method takes to run

### reflect-metadata/

1. Install reflect-metadata and set it up
2. Use Reflect.defineMetadata to store data on a class
3. Use Reflect.getMetadata to read it back
4. Create a @Role("admin") decorator that stores role metadata
5. Create a function that reads the role metadata from a class

### mini-dependency-injection/

1. Create an @Injectable() decorator that marks a class
2. Create a simple Container class that registers and stores services
3. Add a resolve() method that creates an instance of a service
4. Make it so if ServiceA depends on ServiceB, Container handles it
5. Test it: UserService that depends on DatabaseService

---

## ❓ Theory Questions

Stage 1:

- What is the difference between type and interface?
- What does readonly do?
- How do optional parameters work?

Stage 2:

- What is a generic and why is it useful?
- What does Partial<User> actually do under the hood?
- What is a type guard?
- What is a discriminated union?

Stage 3:

- What is a decorator in TypeScript?
- What is Reflect.metadata and why does NestJS use it?
- How does NestJS know which dependencies to inject?

---

## ⏱️ Estimated Timeline

| Stage                  | Time      |
| ---------------------- | --------- |
| Stage 1 — Basics       | 1-2 weeks |
| Stage 2 — Intermediate | 1-2 weeks |
| Stage 3 — Advanced     | 2-3 weeks |
| Total                  | 4-6 weeks |

---

## 🎯 End Goal

After completing all stages you will be ready to:

- Read and understand the NestJS source code
- Fix bugs and improve documentation in NestJS
- Submit your first Pull Request to open source
- Understand how decorators and dependency injection work internally

---

## 📚 Resources

- TypeScript Docs: https://www.typescriptlang.org/docs
- NestJS Docs: https://docs.nestjs.com
- NestJS GitHub: https://github.com/nestjs/nest
- Total TypeScript: https://www.totaltypescript.com
- NestJS Discord: https://discord.gg/nestjs

---

> 💡 Tip: If you get stuck, read the TypeScript docs first, then search GitHub
> for how NestJS uses that concept in their source code.
