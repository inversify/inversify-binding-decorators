import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";
import { Kernel } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("ProvideDoneSyntax", () => {

    it("Should be able to apply a fluent decorator", () => {

        class Ninja {}
        let kernel = new Kernel();
        let bindingInSyntax = kernel.bind<Ninja>("Ninja").to(null);
        let binding: inversify.interfaces.Binding<any> = (<any>bindingInSyntax)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax<any>(binding);

        let decorator = provideDoneSyntax.done();
        expect(typeof decorator).eql("function");

        decorator(Ninja);
        expect(binding.implementationType).eql(Ninja);

    });

});
