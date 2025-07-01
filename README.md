# RecoilStore

..........................................................................................................
# Asynchronous Data Queries 
.............................

## 📘 Handling Async Data in Recoil (Notes)

### ❓ Problem

In Recoil, when we define an atom with a default value like:

```js
export const userAtom = atom({
  key: 'userAtom',
  default: {}  // or 0, or empty string
});
```

At first, the default value (e.g. `{}` or `0`) is rendered. Then, after the async API call completes in some effect or component, the real data replaces it.

This causes:

* **flickering or wrong initial display**
* **double render**: default (empty) → real data
* Unwanted **loading glitches**

---

### ✅ Solution: Use `selector` for Async Default

Recoil allows you to define **asynchronous `default` values** for atoms by using a **selector** that fetches the data.

#### 🔧 How it works:

You create a **selector** that fetches data asynchronously using `fetch()` or `axios`.

Then, you pass this **selector as the default** value of the atom. This ensures:

* Atom's value **starts loading** immediately.
* **No need to use effects** inside components.
* **Cleaner, declarative state management**

---

### 🧠 Why use `selector` for async data?

> Because Recoil selectors support returning **Promises**, and atoms can use selectors as `default`.

---

### 🧪 Example

#### `api.js` – Simulated async API

```js
export const fetchUser = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  return await response.json();
};
```

---

#### `atoms.js`

```js
import { atom, selector } from 'recoil';
import { fetchUser } from './api';

export const userSelector = selector({
  key: 'userSelector',
  get: async () => {
    const user = await fetchUser();
    return user;
  },
});

export const userAtom = atom({
  key: 'userAtom',
  default: userSelector, // 👈 async default using selector
});
```

---

#### `App.jsx`

```jsx
import { useRecoilValueLoadable, RecoilRoot } from 'recoil';
import { userAtom } from './atoms';

function MainApp() {
  const userLoadable = useRecoilValueLoadable(userAtom);

  if (userLoadable.state === 'loading') return <p>Loading user...</p>;
  if (userLoadable.state === 'hasError') return <p>Error loading user</p>;

  const user = userLoadable.contents;

  return (
    <div>
      <h2>User Info</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}
```

---

### 📝 Key Points for Notes

* Recoil **selectors** support async `get()` functions that return Promises.
* You can use a **selector as the default** value of an atom to handle async data loading.
* Use `useRecoilValueLoadable()` to handle `loading`, `hasValue`, `hasError` states easily.
* Avoids initial `default` flicker and unnecessary `useEffect()` in components.

## Self Summary 

As we use useEffect to fetch async data using,fetch axios, but when try to do the same here also first the default value from the atom will render just form small milliseconds, and then suddenly the fetched data. So, to overcome this we define this async function inside default value of atom but the default can not have async function so that why we use selector which provide us get method which can be async fucntion

..........................................................................................................