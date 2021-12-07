---

---

根据Vue Mastery的课程学习Vue 3响应式原理。从一段简单的JavaScript代码一步一步实现Vue 3的响应式。

# 从一段计算总数的JavaScript代码开始

```javascript
let price = 5;
let quantity = 2;
let total = price * quantity;
console.log(`total is ${total}`); // total is 10
price = 20;
console.log(`total is ${total}`); // total is 10
```

对于一般的JavaScript代码，修改了price的值后，很显然total的值不会更新，因为不是响应式。本文需要做的是一步一步实现Vue 3中建立响应式的方法。

# 初步实现需手动调用的“响应式”

## 解决思路

1. 将更新变量值的代码保存。

   ```javascript
   let total = price * quantity;
   ```

2. 需要时再运行此段代码。

## 改写代码

总体代码结构：

```javascript
let price = 5;
let quantity = 2;
let total = 0;

let effect = () => { total = price * quantity; } // 想要保存的代码

track(); // 调用此方法来保存effect中的代码
effect(); // 首次调用此方法来计算total的值

// do something...
trigger(); // 调用此方法来运行所有保存的代码
```

首先需要一个`dep`集合存储代码，来表示依赖关系。并实现`track`函数和`trigger`函数。

```javascript
let dep = new Set(); // 存放代码（effects）的集合（即依赖）

function track() {
    dep.add(effect); // 将effect储存
}

function trigger() {
    dep.forEach(effect => effect()); // 运行所有报错的代码
}
```

修改`quantity`的值后调用`trigger`函数，`total`的值便会更新。

```javascript
console.log(`total is ${total}`); // total is 10
quantity = 3;
console.log(`total is ${total}`); // total is 10
trigger();
console.log(`total is ${total}`); // total is 15
```

通常我们使用的对象由很多个属性，需要让每个属性都拥有自己的`dep`。因此需要为每个对象一个`depsMap`，key为对象的属性名，value为对应其属性的`dep`。

```javascript
// let product = { price: 5, quantity: 2 };
const depsMap = new Map();
function track(key) {
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    dep.add(effect);
}

function trigger(key) {
    let dep = depsMap.get(key);
    if (dep) {
        dep.forEach(effect => { effect(); });
    }
}
```

```javascript
let product = { price: 5, quantity: 2 };
let total = 0;
let effect = () => {
    total = product.prioce * product.quantity;
}

track('quantity');
effect();

console.log(`total is ${total}`); // total is 10
product.quantity = 3;
console.log(`total is ${total}`); // total is 10
trigger();
console.log(`total is ${total}`); // total is 15
```

现在以及解决了一个对象有不同属性的跟着依赖的方法。如果有多个响应式对象呢？则再需要一个Map来存储每个响应式对象的`depsMap`，称作`targetMap`，在Vue 3中类型为WeakMap。

```javascript
const targetMap = new WeakMap();

function track(target, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    dep.add(effect);
}

function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) { return; }
    let dep = depsMap.get(key);
    if (dep) {
        dep.forEach(effect => { effect(); })
    }
}
```

```javascript
let product = { price: 5, quantity: 2 };
let total = 0;
let effect = () => {
    total = product.prioce * product.quantity;
}

track(product, 'quantity');
effect();

console.log(`total is ${total}`); // total is 10
product.quantity = 3;
console.log(`total is ${total}`); // total is 10
trigger(product);
console.log(`total is ${total}`); // total is 15
```

最终的数据结构及职责

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1580763789885_5.opt.jpg?alt=media&token=110bf30c-3b78-482f-bac2-30ca8403bfe0](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1580763789885_5.opt.jpg?alt=media&token=110bf30c-3b78-482f-bac2-30ca8403bfe0)

# 实现响应式对象

上一部分代码仍然在手动调用`track()`与`trigger()`来保存与触发`effect`。而我们需要让它们能够自动的被调用。

## 解决思路

1. `effect`中如果访问了某个属性（GET），则调用`track`去保存`effect`。
2. 如果某个属性改变了（SET），则调用`trigger`运行保存了的`effect`

## Vue 2中的实现

Vue 2中使用了ES5的`Object.defineProperty()`去拦截GET和SET。

## Vue 3中的实现

Vue 3中使用了ES6的`Reflect`和`Proxy`。

```javascript
function reactive(target) {
    const handler = {
    	get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver);
            track(target, key);
            return result;
    	},
    	set(target, key, receiver) {
            let oldValue = target[key];
            let result = Reflect.set(target, key, value, receiver);
            if (oldValue !== value) {
                trigger(target, key);
            }
            return result;
    	}
	};
    return new Proxy(target, handler);
}
```

改写后的逻辑代码如下，`total`的值会随着`quantity`的更新而更新。

```javascript
let product = reactive({ price: 5, quantity: 2 });
let total = 0;
let effect = () => {
    total = product.price * product.quantity;
    // Proxy会调用track(product, 'price')和track(product, 'quantity');
}
effect();
console.log(`total is ${total}`); // total is 10
product.quantity = 3; // Proxy会调用trigger(product, 'quantity');
console.log(`total is ${total}`); // total is 15
```

然而由于Proxy对GET的拦截，可能会导致一些不必要的`track`的调用。如：

```javascript
console.log("quantity = " + product.quantity);
```

实际上只应该在`effect`中对某属性GET才调用`track`。为此需要引入`activeEffect`变量。

```javascript
let activeEffect = null; // 表示正在运行中的effect

// 声明一个名为effect的函数
function effect(eff) {
    activeEffect = eff;
    activeEffect();
    activeEffect = null;
}

// 修改effect的调用方式
effect(() => { total = product.price * product.quantity; });

// 修改track函数
function track(target, key) {
    if (activeEffect) { // 仅当acticeEffect时才调用track
        let depsMap = targetMap.get(target);
    	if (!depsMap) {
    	    targetMap.set(target, (depsMap = new Map()));
    	}
    	let dep = depsMap.get(key);
    	if (!dep) {
    	    depsMap.set(key, (dep = new Set()));
    	}
    	dep.add(activeEffect);
    }
}
```

# 实现响应式变量

之前部分的代码实现了将对象变成响应式对象，但是下面代码的响应式却会存在一些问题：

```javascript
let product = reactive({ price: 5, quantity: 2 });
let salePrice = 0;
let total = 0;

effect(() => { total = salePrice * product.quantity; });
effect(() => { salePrice = product.price * 0.9; });
```

当修改`product.price`的值后，`salePrice`的值会更新，但是`total`的值却不会更新。因为`salePrice`不是一个响应式变量。我们需要一个方法将普通的变量也转换成响应式变量。`ref`接受一个值，并返回一个响应式对象，其只有一个`value`属性。

一个简单的实现如下，只需创建一个只有`value`属性的响应式对象。

```javascript
function ref(initialValue) {
    return reactive({ value: initialValue });
}
```

Vue 3的实现则使用了对象访问器，思路如下：

```javascript
function ref(raw) {
    const r = {
        get value() {
            track(r, 'value');
            return raw;
        },
        set value(newVal) {
            /**
             * 此处只实现核心思想，实际Vue实现上还需其他判断
             * 条件，避免出现set出现死递归等错误。例如可以使
             * 用简单的 if (raw != newVal) 来判断
             */
            raw = newVal;
            trigger(r, 'value');
        }
    }
	return r;
}
```

# `computed`计算属性

前面代码的计算逻辑可以使用`computed`计算属性来简化代码，如下：

```javascript
let product = reactive({ price: 5, quantity: 2 });

let salePrice = computed(() => {
    return product.price * 0.9;
})

let total = computed(() => {
    return salePrice.value * product.quantity;
})
```

接下来需要对`computed`计算属性进行实现。

## 实现思路

1. 创建一个响应式引用，成为result。
2. 在effect中运行getter，然后将其赋值给result.value。
3. 最后返回result。

## 实现

```javascript
function computed(getter) {
    let result = ref();
    effect(() => { result.value = getter(); });
    return result;
}
```



# 参考资料

[Vue 3 Reactivity - Vue 3 Reactivity | Vue Mastery](https://www.vuemastery.com/courses/vue-3-reactivity/vue3-reactivity)

[【课程】Vue 3响应式原理 (Vue 3 Reactivity)【中英字幕】- Vue Mastery\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1SZ4y1x7a9)