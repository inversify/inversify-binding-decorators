/// <reference path="../../src/interfaces/interfaces.d.ts" />

import ProvideInWhenOnSyntax from "../../src/syntax/provide_in_when_on_syntax";
import ProvideInSyntax from "../../src/syntax/provide_in_syntax";
import ProvideWhenSyntax from "../../src/syntax/provide_when_syntax";
import ProvideOnSyntax from "../../src/syntax/provide_on_syntax";
import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";
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
    class Game {}
    let kernel = new Kernel();
    let bindingInSyntax = kernel.bind<Ninja>("Ninja").to(null);
    let binding: inversify.IBinding<any> = (<any>bindingInSyntax)._binding;
    let provideDoneSyntax = new ProvideDoneSyntax<any>(binding);
    let provideInSyntax = new ProvideInSyntax(bindingInSyntax, provideDoneSyntax);
    let provideWhenSyntax = new ProvideWhenSyntax(bindingInSyntax, provideDoneSyntax);
    let provideOnSyntax = new ProvideOnSyntax(bindingInSyntax, provideDoneSyntax);
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

        let whenSpy = sandbox.spy(provideWhenSyntax, "when");
        provideInWhenOnSyntax.when((request: inversify.IRequest) => { return true; });
        expect(whenSpy.callCount).eq(1);

        let whenTargetNamedSpy = sandbox.spy(provideWhenSyntax, "whenTargetNamed");
        provideInWhenOnSyntax.whenTargetNamed("throwable");
        expect(whenTargetNamedSpy.callCount).eq(1);

        let whenTargetTaggedSpy = sandbox.spy(provideWhenSyntax, "whenTargetTagged");
        provideInWhenOnSyntax.whenTargetTagged("throwable", true);
        expect(whenTargetTaggedSpy.callCount).eq(1);

        let whenInjectedIntoSpy = sandbox.spy(provideWhenSyntax, "whenInjectedInto");
        provideInWhenOnSyntax.whenInjectedInto(Game);
        expect(whenInjectedIntoSpy.callCount).eq(1);

        let whenParentNamedSpy = sandbox.spy(provideWhenSyntax, "whenParentNamed");
        provideInWhenOnSyntax.whenParentNamed("throwable");
        expect(whenParentNamedSpy.callCount).eq(1);

        let whenParentTaggedSpy = sandbox.spy(provideWhenSyntax, "whenParentTagged");
        provideInWhenOnSyntax.whenParentTagged("throwable", true);
        expect(whenParentTaggedSpy.callCount).eq(1);

        let whenAnyAncestorIsSpy = sandbox.spy(provideWhenSyntax, "whenAnyAncestorIs");
        provideInWhenOnSyntax.whenAnyAncestorIs(Game);
        expect(whenAnyAncestorIsSpy.callCount).eq(1);

        let whenNoAncestorIsSpy = sandbox.spy(provideWhenSyntax, "whenNoAncestorIs");
        provideInWhenOnSyntax.whenNoAncestorIs(Game);
        expect(whenNoAncestorIsSpy.callCount).eq(1);

        let whenAnyAncestorNamedSpy = sandbox.spy(provideWhenSyntax, "whenAnyAncestorNamed");
        provideInWhenOnSyntax.whenAnyAncestorNamed("throwable");
        expect(whenAnyAncestorNamedSpy.callCount).eq(1);

        let whenAnyAncestorTaggedSpy = sandbox.spy(provideWhenSyntax, "whenAnyAncestorTagged");
        provideInWhenOnSyntax.whenAnyAncestorTagged("throwable", false);
        expect(whenAnyAncestorTaggedSpy.callCount).eq(1);

        let whenNoAncestorNamedSpy = sandbox.spy(provideWhenSyntax, "whenNoAncestorNamed");
        provideInWhenOnSyntax.whenNoAncestorNamed("throwable");
        expect(whenNoAncestorNamedSpy.callCount).eq(1);

        let whenNoAncestorTaggedSpy = sandbox.spy(provideWhenSyntax, "whenNoAncestorTagged");
        provideInWhenOnSyntax.whenNoAncestorTagged("throwable", false);
        expect(whenNoAncestorTaggedSpy.callCount).eq(1);

        let whenAnyAncestorMatchesSpy = sandbox.spy(provideWhenSyntax, "whenAnyAncestorMatches");
        provideInWhenOnSyntax.whenAnyAncestorMatches((request: inversify.IRequest) => { return true; });
        expect(whenAnyAncestorMatchesSpy.callCount).eq(1);

        let whenNoAncestorMatchesSpy = sandbox.spy(provideWhenSyntax, "whenNoAncestorMatches");
        provideInWhenOnSyntax.whenNoAncestorMatches((request: inversify.IRequest) => { return true; });
        expect(whenNoAncestorMatchesSpy.callCount).eq(1);

    });

    it("Should be able to access ProvideOnSyntax", () => {

        let onActivationSpy = sandbox.spy(provideOnSyntax, "onActivation");
        provideInWhenOnSyntax.onActivation((a: any) => { return a; });
        expect(onActivationSpy.callCount).eq(1);

    });

});
