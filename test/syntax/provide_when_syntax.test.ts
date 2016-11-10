import ProvideWhenSyntax from "../../src/syntax/provide_when_syntax";
import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";
import { Container } from "inversify";
import { expect } from "chai";
import "reflect-metadata";
import * as sinon from "sinon";
import { interfaces } from "inversify";

describe("ProvideWhenSyntax", () => {

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should be able to declare a binding with contextual constraints", () => {

        class Ninja {}
        class Game {}
        let container = new Container();
        let bindingWhenSyntax = container.bind<Ninja>("Ninja").to(null);
        let binding: interfaces.Binding<any> = (<any>bindingWhenSyntax)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax<any>(binding);
        let provideWhenSyntax = new ProvideWhenSyntax(bindingWhenSyntax, provideDoneSyntax);

        let whenSpy = sandbox.spy(bindingWhenSyntax, "when");
        provideWhenSyntax.when((request: interfaces.Request) => { return true; });
        expect(whenSpy.callCount).eql(1);

        let doneSpy = sandbox.spy(provideDoneSyntax, "done");
        provideWhenSyntax.done();
        expect(doneSpy.callCount).eq(1);

        let whenTargetNamedSpy = sandbox.spy(bindingWhenSyntax, "whenTargetNamed");
        provideWhenSyntax.whenTargetNamed("throwable");
        expect(whenTargetNamedSpy.callCount).eq(1);

        let whenTargetTaggedSpy = sandbox.spy(bindingWhenSyntax, "whenTargetTagged");
        provideWhenSyntax.whenTargetTagged("throwable", true);
        expect(whenTargetTaggedSpy.callCount).eq(1);

        let whenInjectedIntoSpy = sandbox.spy(bindingWhenSyntax, "whenInjectedInto");
        provideWhenSyntax.whenInjectedInto(Game);
        expect(whenInjectedIntoSpy.callCount).eq(1);

        let whenParentNamedSpy = sandbox.spy(bindingWhenSyntax, "whenParentNamed");
        provideWhenSyntax.whenParentNamed("throwable");
        expect(whenParentNamedSpy.callCount).eq(1);

        let whenParentTaggedSpy = sandbox.spy(bindingWhenSyntax, "whenParentTagged");
        provideWhenSyntax.whenParentTagged("throwable", true);
        expect(whenParentTaggedSpy.callCount).eq(1);

        let whenAnyAncestorIsSpy = sandbox.spy(bindingWhenSyntax, "whenAnyAncestorIs");
        provideWhenSyntax.whenAnyAncestorIs(Game);
        expect(whenAnyAncestorIsSpy.callCount).eq(1);

        let whenNoAncestorIsSpy = sandbox.spy(bindingWhenSyntax, "whenNoAncestorIs");
        provideWhenSyntax.whenNoAncestorIs(Game);
        expect(whenNoAncestorIsSpy.callCount).eq(1);

        let whenAnyAncestorNamedSpy = sandbox.spy(bindingWhenSyntax, "whenAnyAncestorNamed");
        provideWhenSyntax.whenAnyAncestorNamed("throwable");
        expect(whenAnyAncestorNamedSpy.callCount).eq(1);

        let whenAnyAncestorTaggedSpy = sandbox.spy(bindingWhenSyntax, "whenAnyAncestorTagged");
        provideWhenSyntax.whenAnyAncestorTagged("throwable", false);
        expect(whenAnyAncestorTaggedSpy.callCount).eq(1);

        let whenNoAncestorNamedSpy = sandbox.spy(bindingWhenSyntax, "whenNoAncestorNamed");
        provideWhenSyntax.whenNoAncestorNamed("throwable");
        expect(whenNoAncestorNamedSpy.callCount).eq(1);

        let whenNoAncestorTaggedSpy = sandbox.spy(bindingWhenSyntax, "whenNoAncestorTagged");
        provideWhenSyntax.whenNoAncestorTagged("throwable", false);
        expect(whenNoAncestorTaggedSpy.callCount).eq(1);

        let whenAnyAncestorMatchesSpy = sandbox.spy(bindingWhenSyntax, "whenAnyAncestorMatches");
        provideWhenSyntax.whenAnyAncestorMatches((request: interfaces.Request) => { return true; });
        expect(whenAnyAncestorMatchesSpy.callCount).eq(1);

        let whenNoAncestorMatchesSpy = sandbox.spy(bindingWhenSyntax, "whenNoAncestorMatches");
        provideWhenSyntax.whenNoAncestorMatches((request: interfaces.Request) => { return true; });
        expect(whenNoAncestorMatchesSpy.callCount).eq(1);

    });

});
