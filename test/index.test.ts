/// <reference path="../src/interfaces/interfaces.d.ts" />

import { Kernel, inject, tagged } from "inversify";
import { makeProvideDecorator, makeFluentProvideDecorator } from "../src/index";
import { expect } from "chai";
import "reflect-metadata";

describe("inversify-binding-decorators", () => {

    it("Should be able to declare bindings using string literals as identifiers", () => {

        let kernel = new Kernel();
        let provide = makeProvideDecorator(kernel);

        interface INinja {
            fight(): string;
            sneak(): string;
        }

        interface IKatana {
            hit(): string;
        }

        interface IShuriken {
            throw(): string;
        }

        let TYPE = {
            IKatana: "IKatana",
            INinja: "INinja",
            IShuriken: "IShuriken"
        };

        @provide(TYPE.IKatana)
        class Katana implements IKatana {
            public hit() {
                return "cut!";
            }
        }

        @provide(TYPE.IShuriken)
        class Shuriken implements IShuriken {
            public throw() {
                return "hit!";
            }
        }

        @provide(TYPE.INinja)
        class Ninja implements INinja {

            private _katana: IKatana;
            private _shuriken: IShuriken;

            public constructor(
                @inject(TYPE.IKatana) katana: IKatana,
                @inject(TYPE.IShuriken) shuriken: IShuriken
            ) {
                this._katana = katana;
                this._shuriken = shuriken;
            }

            public fight() { return this._katana.hit(); };
            public sneak() { return this._shuriken.throw(); };

        }

        let ninja = kernel.get<INinja>(TYPE.INinja);
        expect(ninja.fight()).eql("cut!");
        expect(ninja.sneak()).eql("hit!");

    });

    it("Should be able to declare bindings using classes as identifiers", () => {

        let kernel = new Kernel();
        let provide = makeProvideDecorator(kernel);

        @provide(Katana)
        class Katana {
            public hit() {
                return "cut!";
            }
        }

        @provide(Shuriken)
        class Shuriken {
            public throw() {
                return "hit!";
            }
        }

        @provide(Ninja)
        class Ninja {

            private _katana: Katana;
            private _shuriken: Shuriken;

            public constructor(
                katana: Katana,
                shuriken: Shuriken
            ) {
                this._katana = katana;
                this._shuriken = shuriken;
            }

            public fight() { return this._katana.hit(); };
            public sneak() { return this._shuriken.throw(); };

        }

        let ninja = kernel.get<Ninja>(Ninja);
        expect(ninja.fight()).eql("cut!");
        expect(ninja.sneak()).eql("hit!");

    });

    it("Should be able to declare bindings using symbols as identifiers", () => {

        let kernel = new Kernel();
        let provide = makeProvideDecorator(kernel);

        interface INinja {
            fight(): string;
            sneak(): string;
        }

        interface IKatana {
            hit(): string;
        }

        interface IShuriken {
            throw(): string;
        }

        let TYPE = {
            IKatana: Symbol("IKatana"),
            INinja: Symbol("INinja"),
            IShuriken: Symbol("IShuriken")
        };

        @provide(TYPE.IKatana)
        class Katana implements IKatana {
            public hit() {
                return "cut!";
            }
        }

        @provide(TYPE.IShuriken)
        class Shuriken implements IShuriken {
            public throw() {
                return "hit!";
            }
        }

        @provide(TYPE.INinja)
        class Ninja implements INinja {

            private _katana: IKatana;
            private _shuriken: IShuriken;

            public constructor(
                @inject(TYPE.IKatana) katana: IKatana,
                @inject(TYPE.IShuriken) shuriken: IShuriken
            ) {
                this._katana = katana;
                this._shuriken = shuriken;
            }

            public fight() { return this._katana.hit(); };
            public sneak() { return this._shuriken.throw(); };

        }

        let ninja = kernel.get<INinja>(TYPE.INinja);
        expect(ninja.fight()).eql("cut!");
        expect(ninja.sneak()).eql("hit!");

    });

    it("Should be able to declare the scope of a binding", () => {

        let kernel = new Kernel();
        let provide = makeFluentProvideDecorator(kernel);

        let provideSingleton = function(identifier: string) {
            return provide(identifier).inSingletonScope().done();
        };

        let provideTransient = function(identifier: string) {
            return provide(identifier).done();
        };

        interface INinja {
            fight(): string;
            sneak(): string;
        }

        interface IKatana {
            hit(): string;
        }

        interface IShuriken {
            throw(): string;
        }

        let TYPE = {
            IKatana: "IKatana",
            INinja: "INinja",
            IShuriken: "IShuriken"
        };

        @provideSingleton(TYPE.IKatana)
        class Katana implements IKatana {
            private _mark: any;
            public constructor() {
                this._mark = Math.random();
            }
            public hit() {
                return "cut! " + this._mark;
            }
        }

        @provideTransient(TYPE.IShuriken)
        class Shuriken implements IShuriken {
            private _mark: any;
            public constructor() {
                this._mark = Math.random();
            }
            public throw() {
                return "hit! " + this._mark;
            }
        }

        @provideTransient(TYPE.INinja)
        class Ninja implements INinja {

            private _katana: IKatana;
            private _shuriken: IShuriken;

            public constructor(
                @inject("IKatana") katana: IKatana,
                @inject("IShuriken") shuriken: IShuriken
            ) {
                this._katana = katana;
                this._shuriken = shuriken;
            }

            public fight() { return this._katana.hit(); };
            public sneak() { return this._shuriken.throw(); };

        }

        let ninja = kernel.get<INinja>(TYPE.INinja);
        expect(ninja.fight().indexOf("cut!")).eql(0);
        expect(ninja.sneak().indexOf("hit!")).eql(0);

        let ninja2 = kernel.get<INinja>(TYPE.INinja);
        expect(ninja.fight()).eql(ninja2.fight());
        expect(ninja.sneak()).not.to.eql(ninja2.sneak());

    });

    it("Should be able to declare contextual constraints", () => {

        let kernel = new Kernel();
        let provide = makeFluentProvideDecorator(kernel);

        let provideThrowable = function(serviceIdentifier: string, isThrowable: boolean) {
            return provide(serviceIdentifier).whenTargetTagged("throwable", isThrowable).done();
        };

        interface INinja {
            fight(): string;
            sneak(): string;
        }

        interface IWeapon {
            hit(): string;
        }

        let TYPE = {
            INinja: "INinja",
            IWeapon: "IWeapon"
        };

        @provideThrowable(TYPE.IWeapon, false)
        class Katana implements IWeapon {
            public hit() {
                return "Hit by Katana!";
            }
        }

        @provideThrowable(TYPE.IWeapon, true)
        class Shuriken implements IWeapon {
            public hit() {
                return "Hit by Shuriken!";
            }
        }

        @provide(TYPE.INinja).done()
        class Ninja implements INinja {

            private _primary: IWeapon;
            private _secondary: IWeapon;

            public constructor(
                @inject(TYPE.IWeapon) @tagged("throwable", false) primary: IWeapon,
                @inject(TYPE.IWeapon) @tagged("throwable", true) secondary: IWeapon
            ) {
                this._primary = primary;
                this._secondary = secondary;
            }

            public fight() { return this._primary.hit(); };
            public sneak() { return this._secondary.hit(); };

        }

        let ninja = kernel.get<INinja>(TYPE.INinja);
        expect(ninja.fight()).eql("Hit by Katana!");
        expect(ninja.sneak()).eql("Hit by Shuriken!");

    });

});
