# inversify-binding-decorators

[![Join the chat at https://gitter.im/inversify/InversifyJS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/inversify/InversifyJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/inversify/inversify-binding-decorators.svg?branch=master)](https://travis-ci.org/inversify/inversify-binding-decorators)
[![codecov.io](https://codecov.io/github/inversify/inversify-binding-decorators/coverage.svg?branch=master)](https://codecov.io/github/inversify/inversify-binding-decorators?branch=master)
[![npm version](https://badge.fury.io/js/inversify.svg)](http://badge.fury.io/js/inversify)
[![Package Quality](http://npm.packagequality.com/shield/inversify.svg)](http://packagequality.com/#?package=inversify)
[![Dependencies](https://david-dm.org/inversify/inversify-binding-decorators.svg)](https://david-dm.org/inversify/inversify-binding-decorators#info=dependencies)
[![img](https://david-dm.org/inversify/inversify-binding-decorators/dev-status.svg)](https://david-dm.org/inversify/inversify-binding-decorators/#info=devDependencies)
[![img](https://david-dm.org/inversify/inversify-binding-decorators/peer-status.svg)](https://david-dm.org/inversify/inversify-binding-decorators/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/inversify/inversify-binding-decorators/badge.svg)](https://snyk.io/test/github/inversify/inversify-binding-decorators)

[![NPM](https://nodei.co/npm/inversify.png?downloads=true&downloadRank=true)](https://nodei.co/npm/inversify-binding-decorators/)
[![NPM](https://nodei.co/npm-dl/inversify.png?months=9&height=3)](https://nodei.co/npm/inversify-binding-decorators/)

An utility that allows developers to declare [InversifyJS](http://inversify.io/) bindings using ES2016 decorators,

**WIP! Sorry, it is too early to use this library. Please return soon, we are working hard to go live as soon as possible.**

### The basics
The [InversifyJS](http://inversify.io/) API allows us to delcare bindings using a fluent API: 

```ts
import { injectable, Kernel } from "inversify";

@injectable()
class Katana implements IKatana {
    public hit() {
        return "cut!";
    }
}

@injectable()
class Shuriken implements IShuriken {
    public throw() {
        return "hit!";
    }
}

var kernel = new Kernel();
kernel.bind<IKatana>("IKatana").to(Katana);
kernel.bind<IShuriken>("IShuriken").to(Shuriken);
```

This small utility allows you to declare bindings using decorators:

```ts
import { injectable, Kernel } from "inversify";
import makeProvideDecorator from "inversify-binding-decorators";

var kernel = new Kernel();
let provide = makeProvideDecorator(kernel);

@provide()
class Katana implements IKatana {
    public hit() {
        return "cut!";
    }
}

@provide()
class Shuriken implements IShuriken {
    public throw() {
        return "hit!";
    }
}


```

### Using classes, string literals & symbols as identifiers
When you invoke @provide without any arguments:
```ts
@provide()
class Katana {
    public hit() {
        return "cut!";
    }
}

@provide()
class Ninja {
    private _katana: Katana;
    public constructor(
        katana: Katana
    ) {
        this._katana = katana;
    }
    public fight() { return this._katana.hit(); };
}
```
A new binding is created under the hood:
```ts
kernel.bind<Katana>(Katana).to(Katana);
kernel.bind<Ninja >(Ninja ).to(Ninja );
```
These bindings use classes as identidiers but you can also use string literals as identifiers:
```ts
let TYPE = {
    IKatana: "IKatana",
    INinja: "INinja"
};

@provide(TYPE.IKatana)
class Katana implements IKatana {
    public hit() {
        return "cut!";
    }
}

@provide(TYPE.INinja)
class Ninja implements INinja {

    private _katana: IKatana;

    public constructor(
        @inject(TYPE.IKatana) katana: IKatana
    ) {
        this._katana = katana;
    }

    public fight() { return this._katana.hit(); };

}
```
You can also use symbols as identifiers:
```ts
let TYPE = {
    IKatana: Symbol("IKatana"),
    INinja: Symbol("INinja")
};

@provide(TYPE.IKatana)
class Katana implements IKatana {
    public hit() {
        return "cut!";
    }
}

@provide(TYPE.INinja)
class Ninja implements INinja {

    private _katana: IKatana;

    public constructor(
        @inject(TYPE.IKatana) katana: IKatana
    ) {
        this._katana = katana;
    }

    public fight() { return this._katana.hit(); };

}
```
### Fluent binding decorator
The basic `@provide` decorator doesn't allow you to declare contextual constraints, scope and other advanced binding features. However, `inversify-binding-decorators` includes a second decorator that allows you to achieve access the full potential of the fluent binding syntax:

The decorator returned by `makeProvideDecorator` is not fluent and is very limited when compared to `makeFluentProvideDecorator`:

```ts
import { injectable, Kernel } from "inversify";
import makeFluentProvideDecoratorfrom "inversify-binding-decorators";

var kernel = new Kernel();
let provide = makeFluentProvideDecorator(kernel);

let TYPE = {
    IWeapon : "IWeapon",
    INinja: "INinja"
};

@provide(TYPE.IWeapon).whenTargetTagged("throwable", true).done();
class Katana implements IWeapon {
    public hit() {
        return "cut!";
    }
}

@provide(TYPE.IWeapon).whenTargetTagged("throwable", false).done();
class Shuriken implements IWeapon {
    public hit() {
        return "hit!";
    }
}

@provide(TYPE.INinja)
class Ninja implements INinja {

    private _katana: IWeapon;
    private _shuriken: IWeapon;

    public constructor(
        @inject(TYPE.IWeapon) @tagged("throwable", false) katana: IKatana,
        @inject(TYPE.IWeapon) @tagged("throwable", true) shuriken: IShuriken
    ) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    public fight() { return this._katana.hit(); };
    public sneak() { return this._shuriken.throw(); };

}
```
One of the best things about the fluent decorator is that you can create aliases to fit your needs:

```ts
let provideThrowable = function(identifier, isThrowable) {
	return provide(identifier)
		      .whenTargetTagged("throwable", isThrowable)
		      .done();
};

@provideThrowable(TYPE.IWeapon, true)
class Katana implements IWeapon {
    public hit() {
        return "cut!";
    }
}

@provideThrowable(TYPE.IWeapon, false)
class Shuriken implements IWeapon {
    public hit() {
        return "hit!";
    }
}
```
Another example:
```ts
let provideSingleton = function(identifier) {
	return provide(identifier)
		      .inSingletonScope()
		      .done();
};

@provideSingleton(TYPE.IWeapon)
class Shuriken implements IWeapon {
    public hit() {
        return "hit!";
    }
}
```