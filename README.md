# inversify-binding-decorators

[![Join the chat at https://gitter.im/inversify/InversifyJS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/inversify/InversifyJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/inversify/inversify-binding-decorators.svg?branch=master)](https://travis-ci.org/inversify/inversify-binding-decorators)
[![Test Coverage](https://codeclimate.com/github/inversify/inversify-binding-decorators/badges/coverage.svg)](https://codeclimate.com/github/inversify/inversify-binding-decorators/coverage)
[![npm version](https://badge.fury.io/js/inversify-binding-decorators.svg)](http://badge.fury.io/js/inversify-binding-decorators)
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
$ npm install inversify inversify-binding-decorators reflect-metadata --save
```

The `inversify-binding-decorators` type definitions are included in the npm module and require TypeScript 2.0.
Please refer to the [InversifyJS documentation](https://github.com/inversify/InversifyJS#installation) to learn more about the installation process.

### The basics
The [InversifyJS](http://inversify.io/) API allows us to delcare bindings using a fluent API: 

```ts
import { injectable, Container } from "inversify";
import "reflect-metadata";

@injectable()
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}

@injectable()
class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}

var container = new Container();
container.bind<Katana>("Katana").to(Katana);
container.bind<Shuriken>("Shuriken").to(Shuriken);
```

This small utility allows you to declare bindings using decorators:

```ts
import { injectable, Container } from "inversify";
import { makeProvideDecorator } from "inversify-binding-decorators";
import "reflect-metadata";

var container = new Container();
let provide = makeProvideDecorator(container);

@provide(Katana)
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}

@provide(Shuriken)
class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}


```

### Using @provide multiple times

If you try to apply `@provide` multiple times:

```ts
@provide("Ninja")
@provide("SilentNinja")
class Ninja {
    // ...
}
```

The library will throw an exception:

> Cannot apply @injectable decorator multiple times. Please use @provide(ID, true) if you are trying to declare multiple bindings!

We throw an exception to ensure that you are are not trying to apply `@provide` multiple times by mistake.

You can overcome this by passing the `force` argument to `@provide`:

```ts
@provide("Ninja", true)
@provide("SilentNinja", true)
class Ninja {
    // ...
}
```


### Using classes, string literals & symbols as identifiers
When you invoke `@provide` using classes:

```ts
@provide(Katana)
class Katana {
    public hit() {
        return "cut!";
    }
}

@provide(Ninja)
class Ninja {
    private _katana: Weapon;
    public constructor(
        katana: Weapon
    ) {
        this._katana = katana;
    }
    public fight() { return this._katana.hit(); };
}
```

A new binding is created under the hood:

```ts
container.bind<Katana>(Katana).to(Katana);
container.bind<Ninja>(Ninja).to(Ninja);
```

These bindings use classes as identidiers but you can also use string literals as identifiers:

```ts
let TYPE = {
    IKatana: "Katana",
    INinja: "Ninja"
};

@provide(TYPE.Katana)
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}

@provide(TYPE.Ninja)
class Ninja implements Ninja {

    private _katana: Weapon;

    public constructor(
        @inject(TYPE.Katana) katana: Weapon
    ) {
        this._katana = katana;
    }

    public fight() { return this._katana.hit(); };

}
```

You can also use symbols as identifiers:

```ts
let TYPE = {
    Katana: Symbol("Katana"),
    Ninja: Symbol("Ninja")
};

@provide(TYPE.Katana)
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}

@provide(TYPE.Ninja)
class Ninja implements Ninja {

    private _katana: Weapon;

    public constructor(
        @inject(TYPE.Katana) katana: Weapon
    ) {
        this._katana = katana;
    }

    public fight() { return this._katana.hit(); };

}
```

### Fluent binding decorator
The basic `@provide` decorator doesn't allow you to declare contextual constraints, 
scope and other advanced binding features. However, `inversify-binding-decorators` 
includes a second decorator that allows you to achieve access the full potential 
of the fluent binding syntax:

The decorator returned by `makeProvideDecorator` is not fluent and is very limited 
when compared to `makeFluentProvideDecorator`:

```ts
import { injectable, Container } from "inversify";
import { makeFluentProvideDecorator } from "inversify-binding-decorators";

var container = new Container();
let provide = makeFluentProvideDecorator(container);

let TYPE = {
    Weapon : "Weapon",
    Ninja: "Ninja"
};

@provide(TYPE.Weapon).whenTargetTagged("throwable", true).done();
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}

@provide(TYPE.Weapon).whenTargetTagged("throwable", false).done();
class Shuriken implements Weapon {
    public hit() {
        return "hit!";
    }
}

@provide(TYPE.Ninja)
class Ninja implements Ninja {

    private _katana: Weapon;
    private _shuriken: Weapon;

    public constructor(
        @inject(TYPE.Weapon) @tagged("throwable", false) katana: Weapon,
        @inject(TYPE.Weapon) @tagged("throwable", true) shuriken: ThrowableWeapon
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

@provideThrowable(TYPE.Weapon, true)
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}

@provideThrowable(TYPE.Weapon, false)
class Shuriken implements Weapon {
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

@provideSingleton(TYPE.Weapon)
class Shuriken implements Weapon {
    public hit() {
        return "hit!";
    }
}
```

### Using @provideFluent multiple times

If you try to apply `@provideFluent` multiple times:

```ts
let container = new Container();
let provideFluent = fluentProvide(container);

const provideSingleton = (identifier: any) => {
    return provideFluent(identifier)
    .inSingletonScope()
    .done();
};

function shouldThrow() {
    @provideSingleton("Ninja")
    @provideSingleton("SilentNinja")
    class Ninja {}
    return Ninja;
}
```

The library will throw an exception:

> Cannot apply @provideFluent decorator multiple times but is has been used multiple times in Ninja Please use @done(true) if you are trying to declare multiple bindings!

We throw an exception to ensure that you are are not trying to apply `@fluentProvide` multiple times by mistake.

You can overcome this by passing the `force` argument to `done()`:

```ts
let container = new Container();
let provideFluent = fluentProvide(container);

const provideSingleton = (identifier: any) => {
    return provideFluent(identifier)
    .inSingletonScope()
    .done(true); // IMPORTANT!
};

function shouldThrow() {
    @provideSingleton("Ninja")
    @provideSingleton("SilentNinja")
    class Ninja {}
    return Ninja;
}
```


## The auto provide utility
This library includes a small utility apply to add the default `@provide` decorator to all
the public properties of a module:

Consider the following example:

```ts
import * as entites from "../entities";

let container = new Container();
autoProvide(container, entites);
let warrior = container.get(entites.Warrior);
expect(warrior.fight()).eql("Using Katana...");
```

The contents of the entities.ts file are the following:

```ts
export { default as Warrior } from "./warrior";
export { default as Katana } from "./katana";
```

The contents of the katana.ts file are the following:

```ts
class Katana {
    public use() {
        return "Using Katana...";
    }
}

export default Katana;
```

The contents of the warrior.ts file are the following:

```ts
import Katana from "./katana";
import { inject } from "inversify";

class Warrior {
    private _weapon: Weapon;
    public constructor(
        // we need to declare binding because auto-provide uses
        // @injectbale decorator at runtime not compilation time
        // in the future maybe this limitation will desapear
        // thanks to design-time decorators or some other TS feature
        @inject(Katana) weapon: Weapon
    ) {
        this._weapon = weapon;
    }
    public fight() {
        return this._weapon.use();
    }
}

export default Warrior;
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

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. 

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
