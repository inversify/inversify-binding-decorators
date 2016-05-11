/// <reference path="../../src/interfaces/interfaces.d.ts" />

import ProvideInWhenOnSyntax from "../../src/syntax/provide_in_when_on_syntax";
import ProvideInSyntax from "../../src/syntax/provide_in_syntax";
import ProvideWhenSyntax from "../../src/syntax/provide_when_syntax";
import ProvideOnSyntax from "../../src/syntax/provide_on_syntax";
import { Kernel } from "inversify";
import { expect } from "chai";
import * as sinon from "sinon";
import "reflect-metadata";

describe("ProvideInWhenOnSyntax", () => {

    let sandbox: Sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    class Ninja {}
    let kernel = new Kernel();
    let bindingInSyntax = kernel.bind<Ninja>("Ninja").to(null);
    let provideInSyntax = new ProvideInSyntax(bindingInSyntax);
    let provideWhenSyntax = new ProvideWhenSyntax(bindingInSyntax);
    let provideOnSyntax = new ProvideOnSyntax(bindingInSyntax);
    let provideInWhenOnSyntax = new ProvideInWhenOnSyntax(provideInSyntax, provideWhenSyntax, provideOnSyntax);

    it("Should set its on properties correctly", () => {

        expect((<any>provideInWhenOnSyntax)._provideInSyntax).eql(provideInSyntax);
        expect((<any>provideInWhenOnSyntax)._provideWhenSyntax).eql(provideWhenSyntax);
        expect((<any>provideInWhenOnSyntax)._provideOnSyntax).eql(provideOnSyntax);

    });

    it("Should be able to access ProvideInSyntax", () => {

        let inSingletonScopeSpy = sandbox.spy(provideInSyntax, "inSingletonScope");
        let doneSpy = sandbox.spy(provideInSyntax, "done");

        provideInWhenOnSyntax.inSingletonScope();
        provideInWhenOnSyntax.done();

        expect(inSingletonScopeSpy.callCount).eq(1);
        expect(doneSpy.callCount).eq(1);

    });

    it("Should be able to access ProvideWhenSyntax", () => {

        // TODO

    });

    it("Should be able to access ProvideOnSyntax", () => {

        // TODO

    });

});
