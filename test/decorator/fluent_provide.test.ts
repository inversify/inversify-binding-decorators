import fluentProvide from "../../src/decorator/fluent_provide";
import { Kernel } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("fluentProvide", () => {

    let kernel = new Kernel();

    it("Should return a configurable decorator", () => {

        let provide = fluentProvide(kernel);
        expect(typeof provide).eqls("function");

    });

    it("Should return an instance of ProvideInWhenOnSyntax once it is configured", () => {

        let provide = fluentProvide(kernel);
        let provideInWhenOnSyntax = provide("SomeTypeID");
        expect((<any>provideInWhenOnSyntax)._provideInSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideWhenSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideOnSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideInSyntax).not.to.be.eqls(undefined);
        expect((<any>provideInWhenOnSyntax)._provideWhenSyntax).not.to.be.eqls(undefined);
        expect((<any>provideInWhenOnSyntax)._provideOnSyntax).not.to.be.eqls(undefined);

    });

});
