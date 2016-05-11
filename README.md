# inversify-binding-decorators

[![Join the chat at https://gitter.im/inversify/InversifyJS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/inversify/InversifyJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/inversify/inversify-binding-decorators.svg?branch=master)](https://travis-ci.org/inversify/inversify-binding-decorators)
[![codecov.io](https://codecov.io/github/inversify/inversify-binding-decorators/coverage.svg?branch=master)](https://codecov.io/github/inversify/inversify-binding-decorators?branch=master)
[![npm version](https://badge.fury.io/js/inversify-binding-decorators.svg)](http://badge.fury.io/js/inversify)
[![Dependencies](https://david-dm.org/inversify/inversify-binding-decorators.svg)](https://david-dm.org/inversify/inversify-binding-decorators#info=dependencies)
[![img](https://david-dm.org/inversify/inversify-binding-decorators/dev-status.svg)](https://david-dm.org/inversify/inversify-binding-decorators/#info=devDependencies)
[![img](https://david-dm.org/inversify/inversify-binding-decorators/peer-status.svg)](https://david-dm.org/inversify/inversify-binding-decorators/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/inversify/inversify-binding-decorators/badge.svg)](https://snyk.io/test/github/inversify/inversify-binding-decorators)

[![NPM](https://nodei.co/npm/inversify-binding-decorators.png?downloads=true&downloadRank=true)](https://nodei.co/npm/inversify-binding-decorators/)
[![NPM](https://nodei.co/npm-dl/inversify-binding-decorators.png?months=9&height=3)](https://nodei.co/npm/inversify-binding-decorators/)

An utility that allows developers to declare [InversifyJS](http://inversify.io/) bindings using ES2016 decorators:

![](http://i.imgur.com/UgPxGd4.png)

### Installation
You can install `inversify-binding-decorators` using npm:
```
$ npm install --save inversify inversify-binding-decorators reflect-metadata
```
If you are workiong with TypeScript you will need the following `.d.ts` files:
```
/// <reference path="node_modules/inversify/type_definitions/inversify/inversify.d.ts" />
/// <reference path="node_modules/reflect-metadata/reflect-metadata.d.ts" />
/// <reference path="node_modules/inversify-binding-decorators/type_definitions/inversify-binding-decorators.d.ts" />
```

### The basics
The [InversifyJS](http://inversify.io/) API allows us to delcare bindings using a fluent API: 

```ts
import { injectable, Kernel } from "inversify";
import "reflect-metadata";

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
import "reflect-metadata";

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
When you invoke `@provide` without any arguments:

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
kernel.bind<Ninja>(Ninja).to(Ninja);
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

### Support
If you are experience any kind of issues we will be happy to help. You can report an issue using the
[issues page](https://github.com/inversify/InversifyJS/issues) or the
[chat](https://gitter.im/inversify/InversifyJS). You can also ask questions at
[Stack overflow](http://stackoverflow.com/tags/inversifyjs) using the `inversifyjs` tag.

If you want to share your thoughts with the development team or join us you will be able to do so using the
[official the mailing list](https://groups.google.com/forum/#!forum/inversifyjs). You can check out the
[wiki](https://github.com/inversify/InversifyJS/blob/master/wiki/readme.md) and browse the
[documented source code](http://inversify.io/documentation/index.html) to learn more about InversifyJS internals.

### Acknowledgements

Thanks a lot to all the contributors, all the developers out there using InversifyJS and all those 
that help us to spread the word by sharing content about InversifyJS online. Without your feedback 
and support this project would not be possible.

### License

License under the MIT License (MIT)

Copyright © 2016 [Remo H. Jansen](http://www.remojansen.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without
limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
