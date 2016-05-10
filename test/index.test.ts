/// <reference path="../src/interfaces/interfaces.d.ts" />

import { Kernel, inject, traverseAncerstors, taggedConstraint, namedConstraint, typeConstraint } from "inversify";
import makeProvideDecorator from "../src/index";
import { expect } from "chai";

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
            IShuriken: "IShuriken",
            INinja: "INinja"
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
        expect(ninja.fight).eql("cut!");
        expect(ninja.sneak).eql("hit!");

    });

    it("Should be able to declare bindings using classes as identifiers");
    it("Should be able to declare bindings using symbols as identifiers");
    it("Should be able to declare the scope of a binding");
    it("Should be able to declare contextual constraints");

});
