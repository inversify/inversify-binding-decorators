/// <reference path="../../src/interfaces/interfaces.d.ts" />

import ProvideWhenOnSyntax from "../../src/syntax/provide_when_on_syntax";
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
    let provideWhenSyntax = new ProvideWhenSyntax(bindingInSyntax);
    let provideOnSyntax = new ProvideOnSyntax(bindingInSyntax);
    let provideWhenOnSyntax = new ProvideWhenOnSyntax( provideWhenSyntax, provideOnSyntax);

    it("Should set its on properties correctly", () => {

        expect((<any>provideWhenOnSyntax)._provideWhenSyntax).eql(provideWhenSyntax);
        expect((<any>provideWhenOnSyntax)._provideOnSyntax).eql(provideOnSyntax);

    });

    it("Should be able to access ProvideWhenSyntax", () => {

        let whenTargetNamedSpy = sandbox.spy(provideWhenSyntax, "whenTargetNamed");
        let doneSpy = sandbox.spy(provideWhenSyntax, "done");

        provideWhenOnSyntax.whenTargetNamed("throwable");
        provideWhenOnSyntax.done();

        expect(whenTargetNamedSpy.callCount).eq(1);
        expect(doneSpy.callCount).eq(1);

    });

    it("Should be able to access ProvideOnSyntax", () => {

        let onActivationSpy = sandbox.spy(provideOnSyntax, "onActivation");
        let doneSpy = sandbox.spy(provideWhenSyntax, "done");
        provideWhenOnSyntax.onActivation((a: any) => { return a; });
        expect(doneSpy.callCount).eq(1);

    });

});
