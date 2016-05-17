/// <reference path="../../src/interfaces/interfaces.d.ts" />

import ProvideOnSyntax from "../../src/syntax/provide_on_syntax";
import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";
import { Kernel } from "inversify";
import { expect } from "chai";
import "reflect-metadata";
import * as sinon from "sinon";

describe("ProvideOnSyntax", () => {

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should be able to declare a binding with an activation handler", () => {

        class Ninja {}
        let kernel = new Kernel();
        let bindingOnSyntax = kernel.bind<Ninja>("Ninja").to(null);
        let binding: inversify.IBinding<any> = (<any>bindingOnSyntax)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax<any>(binding);
        let provideOnSyntax = new ProvideOnSyntax(bindingOnSyntax, provideDoneSyntax);

        let provide = provideOnSyntax.onActivation((a: any) => { return a; }).done();
        provide(Ninja);

        let onActivationSpy = sandbox.spy(bindingOnSyntax, "onActivation");
        provideOnSyntax.onActivation((a: any) => { return a; });
        expect(onActivationSpy.callCount).eq(1);

    });

});
