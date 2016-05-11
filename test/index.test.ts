/// <reference path="../src/interfaces/interfaces.d.ts" />

import { Kernel, inject } from "inversify";
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
        expect(ninja.fight()).eql("cut!");
        expect(ninja.sneak()).eql("hit!");

    });

    it("Should be able to declare bindings using classes as identifiers");
    it("Should be able to declare bindings using symbols as identifiers");

    it("Should be able to declare the scope of a binding", () => {

        let kernel = new Kernel();
        let provide = makeFluentProvideDecorator(kernel);

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

        @provide(TYPE.IKatana).inSingletonScope().done()
        class Katana implements IKatana {
            public hit() {
                return "cut! " + new Date();
            }
        }

        @provide(TYPE.IShuriken).done()
        class Shuriken implements IShuriken {
            public throw() {
                return "hit!";
            }
        }

        @provide(TYPE.INinja).done()
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
        expect(ninja.fight().indexOf("cut!")).eql("");
        expect(ninja.sneak()).eql("hit!");

        let ninja2 = kernel.get<INinja>(TYPE.INinja);
        expect(ninja.fight()).eql(ninja2.fight());

    });

    it("Should be able to declare contextual constraints");

});
