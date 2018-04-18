import { METADATA_KEY } from "../../src/constants";
import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";
import interfaces from "../../src/interfaces/interfaces";
import { interfaces as inversifyInterfaces } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("ProvideDoneSyntax", () => {

    it("Should be able to apply a fluent decorator", () => {

        class Ninja { }
        let bindingInSyntax = (bind: inversifyInterfaces.Bind, target: any) => bind<Ninja>("Ninja").to(target);
        let binding: interfaces.BindConstraint = (bind: inversifyInterfaces.Bind, target: any) =>
            (<any>bindingInSyntax(bind, target))._binding;
        let provideDoneSyntax = new ProvideDoneSyntax(binding);

        let decorator = provideDoneSyntax.done();
        expect(typeof decorator).eql("function");

        decorator(Ninja);
        expect(Reflect.getMetadata(METADATA_KEY.provide, Reflect)[0].implementationType).eql(Ninja);

    });

});
