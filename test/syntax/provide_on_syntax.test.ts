import ProvideOnSyntax from "../../src/syntax/provide_on_syntax";
import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";
import { Container } from "inversify";
import { expect } from "chai";
import "reflect-metadata";
import * as sinon from "sinon";
import { interfaces } from "inversify";

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
        let container = new Container();
        let bindingOnSyntax = container.bind<Ninja>("Ninja").to(null);
        let binding: interfaces.Binding<any> = (<any>bindingOnSyntax)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax<any>(binding);
        let provideOnSyntax = new ProvideOnSyntax(bindingOnSyntax, provideDoneSyntax);

        let provide = provideOnSyntax.onActivation((a: any) => { return a; }).done();
        provide(Ninja);

        let onActivationSpy = sandbox.spy(bindingOnSyntax, "onActivation");
        provideOnSyntax.onActivation((a: any) => { return a; });
        expect(onActivationSpy.callCount).eq(1);

    });

});
