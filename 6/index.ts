//Разминка
// Определите интерфейс для пользователя
interface User {
  id: number;
  name: string;
  email: string;
  // Добавьте свойство email типа string
}

// Определите интерфейс для активности пользователя
interface Activity {
  userId: number;
  activity: string;
  timestamp: Date;
  // Добавьте свойство timestamp типа Date
}

// Реализуйте функцию fetchData используя Generic. Функция должна возвращать Promise.
async function fetchData<T>(url: string): Promise<T> {
  // Реализуйте получение данных с использованием fetch и возвращение их в формате json
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

// Используйте Utility Types для создания Partial и Readonly версий User и Activity
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
type PartialActivity = Partial<Activity>;
type ReadonlyActivity = Readonly<Activity>;

//Типизируйте функцию. userId - число
function getUserActivities(userId: string): Promise<unknown> {
  return fetchData(`/api/activities/${userId}`);
}

// Используйте ReturnType для создания типа возвращаемого значения функции getUserActivities
type ActivitiesReturnType = ReturnType<typeof getUserActivities>;

// Используйте extends в условных типах для создания типа Permissions
type AdminPermissions = { canBanUser: boolean };
type BasicPermissions = { canEditProfile: boolean };

// Заполните тип. Должен выявляться на основне некоторого дженерика и опредять, какой из пермишенов выдавать: Admin или Basic.
type CustomPermissions<T extends AdminPermissions | BasicPermissions> =
  T extends AdminPermissions
    ? AdminPermissions
    : T extends BasicPermissions
    ? BasicPermissions
    : never;

///ЧАСТЬ 2.

// Определите Type Alias для Union типа String или Number
type StringOrNumber = string | number;

// Реализуйте функцию logMessage, которая принимает StringOrNumber и не возвращает значение (void)
function logMessage(message: StringOrNumber): void {
  console.log(message);
}

// Реализуйте функцию throwError, которая никогда не возвращает управление (never)
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

// Реализуйте Type Guard для проверки, является ли значение строкой
function isString(value: StringOrNumber): value is string {
  if (typeof value === "string") {
    return true;
  }
  return false;
}

// Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
function assertIsNumber(value: any): asserts value is number {
  if (typeof value !== "number") {
    throw new Error();
  }
}

// Завершите функцию processValue, используя isString и assertIsNumber
function processValue(value: StringOrNumber): void {
  if (isString(value)) {
    console.log("Получена строка");
    return; // любая логика со строкой
  }

  try {
    assertIsNumber(value);
    console.log("Получено число");
    // любая логика с числом
  } catch {
    throw new Error();
  }
}

// Type Alias и Union
// type StringOrNumber = string | number;

//                      Повторяется обьявление выше

//сделайте  Type Guard для определения, является ли значение строкой
// function isString(value) {
// }

//                      Повторяется обьявление и реализация выше

// создайте asserts function на число.
// function assertIsNumber(value: any): asserts {

// }

//                      Повторяется обьявление и реализация выше

// Использование Type Guard и Asserts
// function processValue(value: StringOrNumber) {
//     if (isString(value)) {
//       console.log(`String value: ${value.toUpperCase()}`);
//     } else {
//       assertIsNumber(value);
//       console.log(`Number value: ${value.toFixed(2)}`);
//     }
//   }

//                      Закоментировал, Повторяется обьявление и реализация выше

// Задание 2: Расширенное использование Generics
// Цель: Создать универсальную функцию обработки данных, которая может работать с различными типами данных.

// Определите Generic интерфейс Response с одним параметром типа T. Второй параметр status: number
interface CustomResponse<T> {
  payload: T;
  status: number;
}

// Реализуйте и типизируйте функцию, которая возвращает объект Response для переданных данных
function createResponse<T>(data: T, status: number): CustomResponse<T> {
  // Реализуйте создание и возврат объекта Response
  return {
    payload: data,
    status,
  };
}

// Используйте функцию createResponse для создания ответа с массивом чисел
const numericResponse = createResponse([1, 3, 4], 1);

// Используйте функцию createResponse для создания ответа с объектом пользователя (User)
const userResponse = createResponse<User>(
  {
    id: 1,
    name: "Bob",
    email: "Bob@mail.ru",
    age: 1
  },
  1
);
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 3: Расширенное использование Generics
// Цель: Разработать несколько функций для обработки и различения типов данных.
type Vehicle = {
  make: string;
  company: string;
};
// Определите тип данных для описания автомобиля
type BaseCar = {
  model: string;
  year: number;
} & Vehicle;

// Определите тип данных для описания велосипеда
type Bike = {
  type: "road" | "mountain";
} & Vehicle;

// Создайте Type Guard для проверки, является ли объект автомобилем
function isCar(vehicle: unknown): vehicle is BaseCar {
  //эх сюда бы zod
  const carSchema = {
    make: "string",
    company: "string",
    model: "string",
    year: "number",
  };

  const hasProps = () => {
    if (typeof vehicle !== "object" || vehicle === null) {
      return false;
    }
    for (const [key, value] of Object.entries(carSchema)) {
      if (!Object.hasOwn(vehicle, key) || typeof vehicle[key] !== value) {
        return false;
      }
    }
    return true;
  };

  const criteries: Record<string, boolean> = {
    isObject: typeof vehicle === "object",
    hasProps: hasProps(),
  };

  if (Object.values(criteries).includes(false)) {
    return false;
  }

  return true;
  //прикольная была задача
}

// Используйте Type Guard в функции, которая печатает информацию о транспорте. Небольшая подсказка о том, какие параметры в себя может принимать isCar дана ниже.
function printVehicleInfo(vehicle: BaseCar | Bike) {
  //
  if (isCar(vehicle)) {
    console.log(`Car: ${vehicle.make} ${vehicle.model} ${vehicle.year}`);
  } else {
    console.log(`Bike: ${vehicle.make} ${vehicle.type}`);
  }
}
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 4: Использование Utility Types для работы с интерфейсами
// Цель: Модифицировать интерфейсы для специфических нужд без изменения оригинальных интерфейсов.

// Определите интерфейс Employee
interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}

// Используйте Utility Type для создания типа, который делает все свойства Employee опциональными
type PartialEmployee = Partial<Employee>;

// Используйте Utility Type для создания типа, который делает все свойства Employee доступными только для чтения
type ReadonlyEmployee = Readonly<Employee>;

// Создайте функцию, которая принимает PartialEmployee и выводит информацию о сотруднике
function printEmployeeInfo(employee: PartialEmployee): string {
  // Реализуйте логику функции, обрабатывая случай отсутствующих свойств
  const { id, name, department, email } = employee;
  return `
    ${id ? `id: ${id},\n` : ""}
    ${name ? `Имя: ${name},\n` : ""}
    ${department ? `Отделение: ${department},\n` : ""}
    ${email ? `Почта: ${email},\n` : ""}
    ${Object.keys(employee).length > 0 ? `.` : "Отсутствует инфорамция."}
  `;
}

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
//Задание 5: Работа с Indexed Access Types и Mapped Types
//Цель: Создать утилиты для работы с объектами и их ключами.

// Определите интерфейс для пользователя
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Используйте Indexed Access Types для получения типа поля name из User
type UserNameType = User["name"];

// Создайте Mapped Type, который преобразует все поля интерфейса User в boolean. Можно воспользовать конструкцией Key in keyof
type UserFieldsToBoolean = {
  [P in keyof User]: boolean;
};

// Реализуйте функцию, которая принимает ключи интерфейса User и возвращает их типы
function getUserFieldType<T extends keyof User>(key: T): string {
  // Верните тип ключа
  return typeof key; //User[T]
}

// Используйте эту функцию для получения типа поля 'age' и 'name'
const ageType = getUserFieldType("age");
const nameType = getUserFieldType("name");

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 6: Расширение и ограничение Generics
// Цель: Создать универсальные функции с ограничениями типов.

// Создайте базовый интерфейс для сущностей с идентификатором
interface Identifiable {
  id: number;
}

// Типизируйте функцию, которая принимает массив объектов с ограничением на Generics, где каждый объект должен соответствовать интерфейсу Identifiable. Не забывайте, что find может вернуть undefined
function findById<T extends Identifiable>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

// Используйте эту функцию для поиска пользователя по id в массиве пользователей
const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
];
const user = findById(users, 1);
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 7: Работа с обобщённой функцией поиска в массиве
// Цель: Создать функцию, которая может искать элементы в массиве по разным критериям, включая составные типы и условия с использованием нескольких параметров в Generics.
interface CustomUserTwo {
  id: number;
  name: string;
  age: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Book {
  isbn: string;
  title: string;
  author: string;
}
// Разберитесь с типизацией функции и поймите как она работает.
// Как можно улучшить функцию findInArray, чтобы она обрабатывала случаи, когда ключ или значение отсутствуют?
// Можно ли использовать эту функцию для поиска по нескольким ключам одновременно? Если да, как бы вы это реализовали?

// function findInArray<T, K extends keyof T>(items: T[], key: K, value: T[K]): T | undefined {
//     return items.find(item => item[key] === value);
//   }

//Решение
// Я учел возможность отсутствия keys или values а так же возможность передачи множества ключей или значений

// Лучше создать тип для передаваемых опций, так проще исключать отдельные опции и расширять функционал
interface FindInArrayOptions<T, K extends keyof T> {
  items: T[];
  keys?: K[]; //принимаем теперь только массивом чтобы не плодить в функции проверки типов
  values?: T[K][]; //принимаем теперь только массивом чтобы не плодить в функции проверки типов
}

function findInArray<T extends object, K extends keyof T>({
  items,
  keys,
  values,
}: FindInArrayOptions<T, K>): T | T[] | null {
  if (items.length === 0) {
    return null; //Лучше возварщать null при отсутсвии значения
  }

  if (!keys && !values) {
    return null;
  }

  //(ниже) мне кажется такой подход более приемлен, но если есть более удобный способ буду рад о нем услышать)

  const handlers = {
    keyAndValue: () => {
      //здесь рассмотрен вариант в котором я хочу получить все возможные варианты с ключами и значениями
      //исключая варианты где есть только искомый ключ или только искомое значение
      if (keys && values) {
        const res: T[] = [];

        for (const item of items) {
          const itemKeys = Object.keys(item) as (keyof T)[];
          const intersection = keys.filter((value) => itemKeys.includes(value));

          if (intersection.length > 0) {
            for (const currentKey of intersection) {
              if (values.includes(item[currentKey])) {
                res.push(item);
              }
            }
          }
        }

        return res;
      }
      return null;
    },
    onlyKeys: () => {
      if (keys) {
        const res: T[] = [];

        for (const item of items) {
          const itemKeys = Object.keys(item) as (keyof T)[];
          const intersection = keys.filter((value) => itemKeys.includes(value));

          if (intersection.length > 0) {
            res.push(item);
          }
        }

        return res;
      }
      return null;
    },
    onlyValue: () => {
      if (values) {
        const res: T[] = [];

        for (const item of items) {
          const itemValues = Object.values(item) as T[K][];
          const intersectionValues = values.filter((value) =>
            itemValues.includes(value)
          );

          if (intersectionValues.length > 0) {
            res.push(item);
          }
        }

        return res;
      }
      return null;
    },
  };

  for (const handle of Object.values(handlers)) {
    const res = handle();
    if (res) {
      return res;
    }
  }
  return null;
}

// Данные для тестирования функции
const customUsers: CustomUserTwo[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 },
];

const books: Book[] = [
  { isbn: "12345", title: "The TypeScript Handbook", author: "Someone" },
  { isbn: "67890", title: "Learning TypeScript", author: "Another One" },
];

// 1. Найдите пользователя по имени "Alice".
const foundUser = findInArray({
  items: customUsers,
  keys: ["name"],
  values: ["Alice"],
});

// Вывод:
// [{
//     "id": 1,
//     "name": "Alice",
//     "age": 25
//   }]

// 2. Найдите продукт с ценой 500.
const foundProduct = findInArray({
  items: products,
  keys: ["price"],
  values: [500],
});

// Вывод:
// [{
//     "id": 2,
//     "name": "Smartphone",
//     "price": 500
//   }]

// 3. Найдите книгу по автору "Another One".
const foundBook = findInArray({
  items: books,
  keys: ["author"],
  values: ["Another One"],
});

// Вывод:
// [{
//     "isbn": "67890",
//     "title": "Learning TypeScript",
//     "author": "Another One"
//   }]

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 8: Реализация обобщённой функции для сопоставления и преобразования элементов массива
// Цель: Создать функцию mapAndFilter, которая будет принимать массив объектов, функцию для их преобразования и функцию для фильтрации результатов. Функция должна использовать два параметра Generic: один для типа элементов входного массива, а другой для типа элементов выходного массива.

// Описание задачи: Функция mapAndFilter должна выполнить следующие функции:
// Применить функцию преобразования ко всем элементам входного массива.
// Фильтровать преобразованные элементы с помощью предоставленной функции фильтрации.
// Возвращать новый массив с результатами, которые прошли фильтрацию.
interface Person {
  name: string;
  age: number;
}

interface Adult {
  fullName: string;
  age: number;
}

// Напишите функцию mapAndFilter здесь. Используйте два параметра Generic: T для типа входных данных и U для типа выходных данных.
function mapAndFilter<T, U>(
  items: T[],
  transform: (arg: T, ...other: any[]) => U,
  filter: (arg: U, ...other: any[]) => boolean
): U[] {
  // Ваш код здесь
  const res = items.map(transform).filter(filter);
  return res;
}

// Пример данных
const people: Person[] = [
  { name: "Alice", age: 24 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 32 },
];

// Пример использования функции mapAndFilter
const adults: Adult[] = mapAndFilter(
  people,
  (person) => ({ fullName: person.name, age: person.age }),
  (adult) => adult.age >= 18
);

// Выведите результаты для проверки
console.log(adults);

//Вопросы после реализации:
// Как изменится функция, если необходимо добавить возможность изменения критерия сортировки?

// Ответ:
// Просто добавил бы необязательный параметр в зависимисти от которого накидывал бы после всех манипуляций фильтр

// Могут ли типы T и U быть полностью разными или должны иметь общие характеристики? Объясните ваш ответ.

// Ответ:
//  Да они могут быть совершенно разными, я могу трансформировать массив как угодно,
//  я изначатьно подходил к вопросу типизации с этой мыслью.

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 9:
// Реализовать DeepReadonly<T>
// Задача:
// Создать тип, который делает все поля объекта (включая вложенные) доступными только для чтения (readonly).

// Что нужно сделать:

// Обработать объекты рекурсивно.

// Учесть массивы и другие структуры данных.

// Не трогать примитивы (string, number, boolean).
// Подсказки:
// Используйте условные типы (extends, infer) для сложных проверок.
// Для рекурсии ограничивайте глубину (иначе TypeScript может зависнуть):
// Мы делали нечто похожее в рамках задачи по Partial типу. Подумайте теперь как сделать свой readonly, еще и глубокий.

type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T
  : T extends Array<infer R>
  ? ReadonlyArray<R>
  : T extends object
  ? { readonly [E in keyof T]: DeepReadonly<T[E]> }
  : T;

type NewCustomUser = {
  name: string;
  address: {
    city: string;
    street: string;
  };
  hobbies: string[];
};

type DeepReadonlyUser = DeepReadonly<NewCustomUser>;
/* Результат:
  {
    readonly name: string;
    readonly address: {
      readonly city: string;
      readonly street: string;
    };
    readonly hobbies: readonly string[];
  }
  */

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
//Задание 10:

// Написать тип для преобразования методов класса в Promise-версии
// Задача:
// Создать тип Promisify<T>, который преобразует все методы класса так, чтобы они возвращали Promise.

// Что нужно сделать:

// Определить, какие свойства класса являются методами.

// Заменить возвращаемый тип каждого метода на Promise<...>.

// Не трогать поля (не методы).

// Пример:

class UserService {
  getUser(id: number): User {
    return {
      id: 1,
      name: "string",
      email: "string",
      age: 1,
    };
  }
  saveUser(user: User): void {}
  version: string = "1.0";
}

type Promisify<T extends object> = {
  [P in keyof T]: T[P] extends (...args: any[]) => infer R
    ? (...args: Parameters<T[P]>) => Promise<R>
    : T[P];
};

type AsyncUserService = Promisify<UserService>;
/* Результат:
{
  getUser(id: number): Promise<User>;
  saveUser(user: User): Promise<void>;
  version: string;
}
*/

//---------------------------------------------------------------------------------
//Задание 11:

// Условие задачи
// Реализуйте тип Awaited<T>, который:
// Раскрывает тип значения, обёрнутого в Promise (аналогично встроенному Awaited в TypeScript 4.5+).
// Обрабатывает вложенные Promise (например, Promise<Promise<string>> → string).

// Не раскрывает другие типы (например, Array<Promise<string>> остаётся Array<Promise<string>>).
// Подсказки: почитайте про infer, extends и conditional types

type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T;

// Пример использования:
type Example1 = MyAwaited<Promise<string>>; // string
type Example2 = MyAwaited<Promise<Promise<number>>>; // number
type Example3 = MyAwaited<boolean>; // boolean (не Promise)
type Example4 = MyAwaited<Array<Promise<string>>>; // Array<Promise<string>> (без изменений)

// Дополнительные задания
// Усложнённая версия: Реализуйте Awaited, который также раскрывает Promise внутри массивов:

type AwaitedDeep<T> = T extends Promise<infer R>
  ? MyAwaited<R>
  : T extends Array<Promise<infer E>>
  ? Array<MyAwaited<E>>
  : T;

type Example = AwaitedDeep<Array<Promise<string>>>; // Array<string>
// Подсказка: Используйте { [K in keyof T]: Awaited<T[K]> }.
// Обработка null/undefined: Добавьте проверку, чтобы Awaited<Promise<null>> возвращал null, а не never.

type one = MyAwaited<Promise<null>>; //null
type two = AwaitedDeep<Promise<null>>; //null

//Задание 12:
// Создать тип для валидации формы с динамическими полями
// Задача:
// Создать тип Validator<T>, который описывает правила валидации для каждого поля формы:

// Поле может быть обязательным (required).

// Могут быть кастомные проверки (например, minLength, isEmail).

// Что нужно сделать:

// Для каждого поля объекта создать набор правил валидации.

// Поддержать обязательные и необязательные поля.

// Учесть вложенные объекты (если нужно).

// Пример:
type UserForm = {
  name: string;
  age?: number;
  address: {
    city: string;
  };
};


type Validator<T> = {
  [K in keyof T]: T[K] extends object
    ? Validator<T[K]>
    : {} extends Pick<T, K>
    ? //{ required?: false }
      T[K] extends number | undefined
      ? //{isPositive?: boolean}
        { required?: false; isPositive?: boolean }
      : T[K] extends string | undefined
      ? // {minLength?: number}
        { required?: false; minLength?: number }
      : { required?: false }
    : //{ required: true }
    T[K] extends number
    ? //{isPositive?: boolean}
      { required?: true; isPositive?: boolean }
    : T[K] extends string
    ? // {minLength?: number}
      { required?: true; minLength?: number }
    : { required?: true };
};

type UserValidator = Validator<UserForm>;
/* Результат:
{
  name: { required: true; minLength?: number };
  age?: { required: false; isPositive?: boolean };
  address: {
    city: { required: true };
  };
}
*/

// Подсказки:
// Используйте Partial<T> для необязательных полей.

// Для рекурсивной обработки вложенных объектов: T[K] extends object ? Validator<T[K]> : ....

// Базовый интерфейс правил:
interface ValidationRules {
  required?: boolean;
  minLength?: number;
  isEmail?: boolean;
  // ... другие правила
}
