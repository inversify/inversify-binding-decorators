import _provide from "../../src/decorator/provide";
import { Kernel } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("provide", () => {

    let kernel = new Kernel();

    it("Should return a configurable decorator", () => {

        let provide = _provide(kernel);
        expect(typeof provide).eqls("function");

    });

    it("Should generate a binding when configured and applied to a class", () => {

        class Ninja {}
        let provide = _provide(kernel);
        let provideClassDecorator = provide("Ninja");
        expect(typeof provideClassDecorator).eqls("function");

        provideClassDecorator(Ninja);

        let binding = (<any>kernel)._bindingDictionary.get("Ninja")[0];
        expect(binding.serviceIdentifier).eql("Ninja");
        expect(binding.implementationType).eql(Ninja);

    });

});
