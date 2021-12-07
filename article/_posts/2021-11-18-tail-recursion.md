---
layout: layout_article
title: 什么是尾递归？
tags: 计算机科学
---

尾递归是一种在函数的最后执行递归调用语句的特殊形式的递归。尾递归和一般的递归不同在对内存的占用，普通递归创建stack累积而后计算收缩，尾递归只会占用恒量的内存（和迭代一样）。
<!-- more -->

# 以斐波那契数列计算为例

普通递归：

```c
int fibonacci(int n)
{
    if (n <= 1) return n;
    else return fibonacci(n - 1) + fibonacci(n - 2);
}

fibonacci(n);
```

非尾递归在递归函数调用后此函数还有后续（调用`fibonacci(n - 1)`的结果还需和调用`fibonacci(n - 2)`的结果进行计算），所以必须保存本身的环境以供处理返回值。

尾递归：

```c
int fibonacci_tailrec(int a, int b, int n)
{
    if (n == 0)
    {
        return a;
    }
    else
    {
        return fibonacci_tailrec(b, a + b, n - 1);
    }
}

fibonacci_tailrec(0, 1, n);
```

尾递归把依赖上一次环境转变为不依赖上一层环境，而是把所用到的环境通过参数传递给下一层。这种递归代码在执行过程中是可以不需要回溯的，这样的结果是编译器可以对其进行优化。由于尾递归调用发生在函数末尾，它自己的栈帧中已经没有需要被使用的东西了，也就可以让下次递归调用直接覆盖使用当前的栈帧。生成的机器码和循环差不多。

# 计算机语言与尾递归

Python、Java没有做尾递归优化是为了抛出异常时有完整的Stack Trace。

对于 C++ 等语言来说，在函数最后`return f(x);`并不一定是尾递归。在返回之前很可能涉及到对象的析构函数，使得`f(x)`不是最后执行的那个。

JavaScript按照ES6的规范，只会在严格模式下触发优化。因为在正常模式下，函数内部有两个变量（`arguments`和`func.caller`)，可以跟踪函数的调用栈。尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

# 参考

[什么是尾递归？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/20761771)

[尾调用优化 - 阮一峰的网络日志 (ruanyifeng.com)](http://www.ruanyifeng.com/blog/2015/04/tail-call.html)