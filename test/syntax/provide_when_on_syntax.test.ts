/// <reference path="../../src/interfaces/interfaces.d.ts" />

import ProvideWhenOnSyntax from "../../src/syntax/provide_when_on_syntax";
import ProvideWhenSyntax from "../../src/syntax/provide_when_syntax";
import ProvideOnSyntax from "../../src/syntax/provide_on_syntax";
import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";
import { Kernel } from "inversify";
import { expect } from "chai";
import * as sinon from "sinon";
import "reflect-metadata";

describe("ProvideWhenOnSyntax", () => {

    let sandbox: sinon.SinonSandbox;

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
    let provideWhenSyntax = new ProvideWhenSyntax(bindingInSyntax, provideDoneSyntax);
    let provideOnSyntax = new ProvideOnSyntax(bindingInSyntax, provideDoneSyntax);
    let provideWhenOnSyntax = new ProvideWhenOnSyntax( provideWhenSyntax, provideOnSyntax);

    it("Should set its on properties correctly", () => {

        expect((<any>provideWhenOnSyntax)._provideWhenSyntax).eql(provideWhenSyntax);
        expect((<any>provideWhenOnSyntax)._provideOnSyntax).eql(provideOnSyntax);

    });

    it("Should be able to access ProvideWhenSyntax", () => {

        let doneSpy = sandbox.spy(provideWhenSyntax, "done");
        provideWhenOnSyntax.done();
        expect(doneSpy.callCount).eq(1);

        let whenSpy = sandbox.spy(provideWhenSyntax, "when");
        provideWhenOnSyntax.when((request: inversify.IRequest) => { return true; });
        expect(whenSpy.callCount).eq(1);

        let whenTargetNamedSpy = sandbox.spy(provideWhenSyntax, "whenTargetNamed");
        provideWhenOnSyntax.whenTargetNamed("throwable");
        expect(whenTargetNamedSpy.callCount).eq(1);

        let whenTargetTaggedSpy = sandbox.spy(provideWhenSyntax, "whenTargetTagged");
        provideWhenOnSyntax.whenTargetTagged("throwable", true);
        expect(whenTargetTaggedSpy.callCount).eq(1);

        let whenInjectedIntoSpy = sandbox.spy(provideWhenSyntax, "whenInjectedInto");
        provideWhenOnSyntax.whenInjectedInto(Game);
        expect(whenInjectedIntoSpy.callCount).eq(1);

        let whenParentNamedSpy = sandbox.spy(provideWhenSyntax, "whenParentNamed");
        provideWhenOnSyntax.whenParentNamed("throwable");
        expect(whenParentNamedSpy.callCount).eq(1);

        let whenParentTaggedSpy = sandbox.spy(provideWhenSyntax, "whenParentTagged");
        provideWhenOnSyntax.whenParentTagged("throwable", true);
        expect(whenParentTaggedSpy.callCount).eq(1);

        let whenAnyAncestorIsSpy = sandbox.spy(provideWhenSyntax, "whenAnyAncestorIs");
        provideWhenOnSyntax.whenAnyAncestorIs(Game);
        expect(whenAnyAncestorIsSpy.callCount).eq(1);

        let whenNoAncestorIsSpy = sandbox.spy(provideWhenSyntax, "whenNoAncestorIs");
        provideWhenOnSyntax.whenNoAncestorIs(Game);
        expect(whenNoAncestorIsSpy.callCount).eq(1);

        let whenAnyAncestorNamedSpy = sandbox.spy(provideWhenSyntax, "whenAnyAncestorNamed");
        provideWhenOnSyntax.whenAnyAncestorNamed("throwable");
        expect(whenAnyAncestorNamedSpy.callCount).eq(1);

        let whenAnyAncestorTaggedSpy = sandbox.spy(provideWhenSyntax, "whenAnyAncestorTagged");
        provideWhenOnSyntax.whenAnyAncestorTagged("throwable", false);
        expect(whenAnyAncestorTaggedSpy.callCount).eq(1);

        let whenNoAncestorNamedSpy = sandbox.spy(provideWhenSyntax, "whenNoAncestorNamed");
        provideWhenOnSyntax.whenNoAncestorNamed("throwable");
        expect(whenNoAncestorNamedSpy.callCount).eq(1);

        let whenNoAncestorTaggedSpy = sandbox.spy(provideWhenSyntax, "whenNoAncestorTagged");
        provideWhenOnSyntax.whenNoAncestorTagged("throwable", false);
        expect(whenNoAncestorTaggedSpy.callCount).eq(1);

        let whenAnyAncestorMatchesSpy = sandbox.spy(provideWhenSyntax, "whenAnyAncestorMatches");
        provideWhenOnSyntax.whenAnyAncestorMatches((request: inversify.IRequest) => { return true; });
        expect(whenAnyAncestorMatchesSpy.callCount).eq(1);

        let whenNoAncestorMatchesSpy = sandbox.spy(provideWhenSyntax, "whenNoAncestorMatches");
        provideWhenOnSyntax.whenNoAncestorMatches((request: inversify.IRequest) => { return true; });
        expect(whenNoAncestorMatchesSpy.callCount).eq(1);

    });

    it("Should be able to access ProvideOnSyntax", () => {

        let onActivationSpy = sandbox.spy(provideOnSyntax, "onActivation");
        provideWhenOnSyntax.onActivation((a: any) => { return a; });
        expect(onActivationSpy.callCount).eq(1);

    });

});
