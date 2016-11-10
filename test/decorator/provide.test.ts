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

});
