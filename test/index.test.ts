import { Container, inject, tagged } from "inversify";
import { makeProvideDecorator, makeFluentProvideDecorator } from "../src/index";
import { expect } from "chai";
import "reflect-metadata";

describe("inversify-binding-decorators", () => {

    it("Should be able to declare bindings using string literals as identifiers", () => {

        let container = new Container();
        let provide = makeProvideDecorator(container);

        interface Warrior {
            fight(): string;
            sneak(): string;
        }

        interface Weapon {
            hit(): string;
        }

        interface ThrowableWeapon {
            throw(): string;
        }

        let TYPE = {
            ThrowableWeapon: "ThrowableWeapon",
            Warrior: "Warrior",
            Weapon: "Weapon"
        };

        @provide(TYPE.Weapon)
        class Katana implements Weapon {
            public hit() {
                return "cut!";
            }
        }

        @provide(TYPE.ThrowableWeapon)
        class Shuriken implements ThrowableWeapon {
            public throw() {
                return "hit!";
            }
        }

        @provide(TYPE.Warrior)
        class Ninja implements Warrior {

            private _katana: Weapon;
            private _shuriken: ThrowableWeapon;

            public constructor(
                @inject(TYPE.Weapon) katana: Weapon,
                @inject(TYPE.ThrowableWeapon) shuriken: ThrowableWeapon
            ) {
                this._katana = katana;
                this._shuriken = shuriken;
            }

            public fight() { return this._katana.hit(); };
            public sneak() { return this._shuriken.throw(); };

        }

        let ninja = container.get<Warrior>(TYPE.Warrior);
        expect(ninja.fight()).eql("cut!");
        expect(ninja.sneak()).eql("hit!");

    });

    it("Should be able to declare bindings using classes as identifiers", () => {

        let container = new Container();
        let provide = makeProvideDecorator(container);

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

        let ninja = container.get<Ninja>(Ninja);
        expect(ninja.fight()).eql("cut!");
        expect(ninja.sneak()).eql("hit!");

    });

    it("Should be able to declare bindings using symbols as identifiers", () => {

        let container = new Container();
        let provide = makeProvideDecorator(container);

        interface Warrior {
            fight(): string;
            sneak(): string;
        }

        interface Weapon {
            hit(): string;
        }

        interface ThrowableWeapon {
            throw(): string;
        }

        let TYPE = {
            ThrowableWeapon: Symbol("ThrowableWeapon"),
            Warrior: Symbol("Warrior"),
            Weapon: Symbol("Weapon"),
        };

        @provide(TYPE.Weapon)
        class Katana implements Weapon {
            public hit() {
                return "cut!";
            }
        }

        @provide(TYPE.ThrowableWeapon)
        class Shuriken implements ThrowableWeapon {
            public throw() {
                return "hit!";
            }
        }

        @provide(TYPE.Warrior)
        class Ninja implements Warrior {

            private _katana: Weapon;
            private _shuriken: ThrowableWeapon;

            public constructor(
                @inject(TYPE.Weapon) katana: Weapon,
                @inject(TYPE.ThrowableWeapon) shuriken: ThrowableWeapon
            ) {
                this._katana = katana;
                this._shuriken = shuriken;
            }

            public fight() { return this._katana.hit(); };
            public sneak() { return this._shuriken.throw(); };

        }

        let ninja = container.get<Warrior>(TYPE.Warrior);
        expect(ninja.fight()).eql("cut!");
        expect(ninja.sneak()).eql("hit!");

    });

    it("Should be able to declare the scope of a binding", () => {

        let container = new Container();
        let provide = makeFluentProvideDecorator(container);

        let provideSingleton = function(identifier: string) {
            return provide(identifier).inSingletonScope().done();
        };

        let provideTransient = function(identifier: string) {
            return provide(identifier).inTransientScope().done();
        };

        interface Warrior {
            fight(): string;
            sneak(): string;
        }

        interface Weapon {
            hit(): string;
        }

        interface ThrowableWeapon {
            throw(): string;
        }

        let TYPE = {
            ThrowableWeapon: "ThrowableWeapon",
            Warrior: "Warrior",
            Weapon: "Weapon"
        };

        @provideSingleton(TYPE.Weapon)
        class Katana implements Weapon {
            private _mark: any;
            public constructor() {
                this._mark = Math.random();
            }
            public hit() {
                return "cut! " + this._mark;
            }
        }

        @provideTransient(TYPE.ThrowableWeapon)
        class Shuriken implements ThrowableWeapon {
            private _mark: any;
            public constructor() {
                this._mark = Math.random();
            }
            public throw() {
                return "hit! " + this._mark;
            }
        }

        @provideTransient(TYPE.Warrior)
        class Ninja implements Warrior {

            private _katana: Weapon;
            private _shuriken: ThrowableWeapon;

            public constructor(
                @inject(TYPE.Weapon) katana: Weapon,
                @inject(TYPE.ThrowableWeapon) shuriken: ThrowableWeapon
            ) {
                this._katana = katana;
                this._shuriken = shuriken;
            }

            public fight() { return this._katana.hit(); };
            public sneak() { return this._shuriken.throw(); };

        }

        let ninja = container.get<Warrior>(TYPE.Warrior);
        expect(ninja.fight().indexOf("cut!")).eql(0);
        expect(ninja.sneak().indexOf("hit!")).eql(0);

        let ninja2 = container.get<Warrior>(TYPE.Warrior);
        expect(ninja.fight()).eql(ninja2.fight());
        expect(ninja.sneak()).not.to.eql(ninja2.sneak());

    });

    it("Should be able to declare contextual constraints", () => {

        let container = new Container();
        let provide = makeFluentProvideDecorator(container);

        let provideThrowable = function(serviceIdentifier: string, isThrowable: boolean) {
            return provide(serviceIdentifier).whenTargetTagged("throwable", isThrowable).done();
        };

        interface Warrior {
            fight(): string;
            sneak(): string;
        }

        interface Weapon {
            hit(): string;
        }

        let TYPE = {
            Warrior: "Warrior",
            Weapon: "Weapon"
        };

        @provideThrowable(TYPE.Weapon, false)
        class Katana implements Weapon {
            public hit() {
                return "Hit by Katana!";
            }
        }

        @provideThrowable(TYPE.Weapon, true)
        class Shuriken implements Weapon {
            public hit() {
                return "Hit by Shuriken!";
            }
        }

        @provide(TYPE.Warrior).done()
        class Ninja implements Warrior {

            private _primary: Weapon;
            private _secondary: Weapon;

            public constructor(
                @inject(TYPE.Weapon) @tagged("throwable", false) primary: Weapon,
                @inject(TYPE.Weapon) @tagged("throwable", true) secondary: Weapon
            ) {
                this._primary = primary;
                this._secondary = secondary;
            }

            public fight() { return this._primary.hit(); };
            public sneak() { return this._secondary.hit(); };

        }

        let ninja = container.get<Warrior>(TYPE.Warrior);
        expect(ninja.fight()).eql("Hit by Katana!");
        expect(ninja.sneak()).eql("Hit by Shuriken!");

    });

});
