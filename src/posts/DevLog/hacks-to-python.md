---
title: Hacks to Python
icon: material-symbols:article
date: 2022-11-15
category:
  - DevLog
tag:
  - Python
sticky: false
star: false
# footer: 自定义页脚
# copyright: 无版权
---

<!-- TODO: translate this page -->

Some useful but mainly useless tricks to use in Python

![Pipeline in Python?!](/assets/images/Pipeline-in-Python.png)

<!-- more -->

## Pipeline operator

### Models

Miss your dear and dear pipeline operator in ...

::: code-tabs#lang

@tab shell

```sh
cat file.txt | grep "hello" | wc -l
```

@tab R

```r
iris %>% filter(Species == "setosa") %>% select(Sepal.Length, Sepal.Width)
```

:::

Well, you can have it in Python too!

### Implementation

::: details Python

```py
from functools import update_wrapper
from typing import Any, Callable, Optional


class Pipeline:
    def __init__(self, func: Optional[Callable] = None) -> None:
        if func is not None:
            update_wrapper(self, func)
            self.funcs: list[Callable] = [func]
        else:
            self.funcs: list[Callable] = []

    def __call__(self, *args: Any, **kwds: Any) -> Any:
        """
        self(*) => self.funcs[0](self.funcs[1](self.funcs[2](...)))
        """
        if len(self.funcs) == 0:
            return None
        res = self.funcs[-1](*args, **kwds)
        for func in reversed(self.funcs[:-1]):
            try:
                res = func(res)
            except Exception as e:
                print(f"Error encountered when executing {func} with parameter {res}:")
                raise e
        return res

    def __add__(self, func: Callable | "Pipeline") -> "Pipeline":
        """
        (f + g)(*) => f(g(*))
        """
        res = Pipeline()
        res.funcs += self.funcs
        if isinstance(func, Pipeline):
            res.funcs += func.funcs
        elif callable(func):
            res.funcs.append(func)
        else:
            raise TypeError(f"Unsupported type {type(func)}")
        return res

    def __radd__(self, func: Callable | "Pipeline") -> "Pipeline":
        res = Pipeline()
        if isinstance(func, Pipeline):
            res.funcs += func.funcs
        elif callable(func):
            res.funcs.append(func)
        else:
            raise TypeError(f"Unsupported type {type(func)}")
        res.funcs += self.funcs
        return res

    def __or__(self, func: Callable | "Pipeline"):
        """
        * | f | g => g(f(*))
        """
        return func + self

    def __ror__(self, func: Callable | "Pipeline" | Any):
        if isinstance(func, Callable) or isinstance(func, Pipeline):
            return self + func
        else:
            return self(func)


@Pipeline
def foo(a: int) -> list[int]:
    return list(range(a))


@Pipeline
def bar(b: list[int]) -> int:
    return max(b)


# Pipeline in Python???!!!
if __name__ == "__main__":
    func = bar + foo
    print(func(10))       # 9
    print(10 | foo | bar) # 9
```

:::

### How it works

The solution is simple:

- Define a wrapper function that keeps the original functions inside (`self.funcs` is a list of callables)
- Generate a new function upon operating at least one such function (e.g. pipeline operator `|` which is seen as `or` operation in Python, or _adding_ two functions together like `f+g <=> f(g(.))`)
- When calling such function, it will sequentially execute all the nested functions
- Add some finishing touches, and you are good to go!

## Multi-statement lambda expression

### Models

Multi-statement lambda expressions are commonly supported in other languages, such as:

::: code-tabs#lang

@tab C++

```cpp
auto func = [](auto a, auto b)
{
    a++;
    b++;
    return a + b;
};
```

@tab C\#

```cs
var func = (int a, int b) =>
{
    a++;
    b++;
    return a + b;
};
```

@tab TS/JS

```ts
const func = (a, b) => {
  a++;
  b++;
  return a + b;
};
```

@tab Rust

```rust
let func = |mut a, mut b| {
    a += 1;
    b += 1;
    a + b
};
```

:::

But wait! What about Python?

```py
func = lambda a, b: a + b
```

Seems like Python only supports single-statement lambda expression... or is that so?

Well, you can have it too!

### Implementation

::: details Python

```py
func = lambda a, b: (
    a := a + 1,
    b := b + 1,
    a + b,
)[-1]
```

:::

### How it works

Well, in python, the evaluation of a tuple is done sequentially, so you can use a tuple to mimic the behavior of a multi-statement lambda expression, where the return value could be specified by the index of element.

Note that in order to assign values in a tuple, you will need to use the walrus operator `:=` introduced in Python 3.8. It will assign the value to the variable on the left, and return the value on the right, similar to the default behavior of `=` in C/C++ and many other languages.
