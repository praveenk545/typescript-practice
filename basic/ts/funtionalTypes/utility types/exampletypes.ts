// ---- Base Interface ----
interface User {
  name: string;
  email: string;
  age: number;
  password: string;
}

// ---- 1. Partial<User> — updateUser function ----
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const user: User = {
  name: "John",
  email: "john@mail.com",
  age: 30,
  password: "secret",
};
const updated = updateUser(user, { age: 31, email: "newemail@mail.com" });
console.log(updated);
// { name: 'John', email: 'newemail@mail.com', age: 31, password: 'secret' }

// ---- 2. Pick<User> — public profile (no password) ----
type PublicProfile = Pick<User, "name" | "email" | "age">;

const publicProfile: PublicProfile = {
  name: "John",
  email: "john@mail.com",
  age: 30,
};
console.log(publicProfile);
// { name: 'John', email: 'john@mail.com', age: 30 }

// ---- 3. Omit<User> — type without password ----
type UserWithoutPassword = Omit<User, "password">;

const safeUser: UserWithoutPassword = {
  name: "John",
  email: "john@mail.com",
  age: 30,
};
console.log(safeUser);
// { name: 'John', email: 'john@mail.com', age: 30 }

// ---- 4. Required<User> — all fields required ----
// Makes every field required (removes optional ? modifier)
type StrictUser = Required<User>;

const strictUser: StrictUser = {
  name: "John",
  email: "john@mail.com",
  age: 30,
  password: "secret",
};
console.log(strictUser);

// ---- 5. Custom Partial (MyPartial) ----
// keyof T        — gets all keys of T as a union  ('name' | 'email' | 'age' | 'password')
// [K in keyof T] — loops over each key
// T[K]           — gets the type of each key's value
// ?              — makes each field optional
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = MyPartial<User>;

const partialUser: PartialUser = { name: "John" }; // all fields optional
console.log(partialUser);
// { name: 'John' }

// ---- 6. Custom Pick (MyPick) ----
// K extends keyof T  — ensures K can only be keys that exist in T
// [K in Keys]        — loops over only the selected keys
type MyPick<T, Keys extends keyof T> = {
  [K in Keys]: T[K];
};

type MyPublicProfile = MyPick<User, "name" | "email" | "age">;

const myPublicProfile: MyPublicProfile = {
  name: "John",
  email: "john@mail.com",
  age: 30,
};
console.log(myPublicProfile);
// { name: 'John', email: 'john@mail.com', age: 30 }
