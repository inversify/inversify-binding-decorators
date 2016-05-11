/// <reference path="../../src/interfaces/interfaces.d.ts" />

import ProvideInSyntax from "../../src/syntax/provide_in_syntax";
import { Kernel } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("ProvideInSyntax", () => {

    it("Should be able to declare a binding with singleton scope", () => {

        class Ninja {}
        let kernel = new Kernel();
        let bindingInSyntax = kernel.bind<Ninja>("Ninja").to(null);
        let provideInSyntax = new ProvideInSyntax(bindingInSyntax);

        let provide = provideInSyntax.inSingletonScope().done();
        provide(Ninja);

        let binding = (<any>kernel)._bindingDictionary.get("Ninja")[0];
        expect(binding.serviceIdentifier).eql("Ninja");
        expect(binding.implementationType).eql(Ninja);
        // https://github.com/inversify/InversifyJS/blob/master/src/bindings/binding_scope.ts#L5
        expect(binding.scope).eql(1);

    });

});
