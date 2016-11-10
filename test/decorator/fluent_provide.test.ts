import fluentProvide from "../../src/decorator/fluent_provide";
import { Container } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("fluentProvide", () => {

    let container = new Container();

    it("Should return a configurable decorator", () => {

        let provide = fluentProvide(container);
        expect(typeof provide).eqls("function");

    });

    it("Should return an instance of ProvideInWhenOnSyntax once it is configured", () => {

        let provide = fluentProvide(container);
        let provideInWhenOnSyntax = provide("SomeTypeID");
        expect((<any>provideInWhenOnSyntax)._provideInSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideWhenSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideOnSyntax).not.to.be.eqls(null);
        expect((<any>provideInWhenOnSyntax)._provideInSyntax).not.to.be.eqls(undefined);
        expect((<any>provideInWhenOnSyntax)._provideWhenSyntax).not.to.be.eqls(undefined);
        expect((<any>provideInWhenOnSyntax)._provideOnSyntax).not.to.be.eqls(undefined);

    });

});
