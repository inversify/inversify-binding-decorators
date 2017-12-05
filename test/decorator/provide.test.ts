import _provide from "../../src/decorator/provide";
import { Container } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("provide", () => {

    let container = new Container();

    it("Should return a configurable decorator", () => {

        let provide = _provide(container);
        expect(typeof provide).eqls("function");

    });

    it("Should generate a binding when configured and applied to a class", () => {

        class Ninja {}
        let provide = _provide(container);
        let provideClassDecorator = provide("Ninja");
        expect(typeof provideClassDecorator).eqls("function");

        provideClassDecorator(Ninja);

        let binding = (<any>container)._bindingDictionary.get("Ninja")[0];
        expect(binding.serviceIdentifier).eql("Ninja");
        expect(binding.implementationType).eql(Ninja);

    });

    it("Should throw if @provide is applied more than once without force flag", () => {

        const myContainer = new Container();
        const provide = _provide(myContainer);

        function shouldThrow() {
            @provide("Ninja")
            @provide("SilentNinja")
            class Ninja {}
            return Ninja;
        }

        expect(shouldThrow).to.throw(
            "Cannot apply @provide decorator multiple times but is has been used " +
            "multiple times in Ninja " +
            "Please use @provide(ID, true) if you are trying to declare multiple bindings!"
        );

    });

    it("Should work if @provide is applied more than once with force flag", () => {

        const myContainer = new Container();
        const provide = _provide(myContainer);

        function shouldThrow() {
            @provide("Ninja", true)
            @provide("SilentWarrior", true)
            class Ninja {}
            return Ninja;
        }

        expect(shouldThrow).not.to.throw();

    });

});
