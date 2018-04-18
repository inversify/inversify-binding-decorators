import ProvideOnSyntax from "../../src/syntax/provide_on_syntax";
import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";
import { expect } from "chai";
import "reflect-metadata";
import * as sinon from "sinon";
import { METADATA_KEY } from "../../src/constants";
import { interfaces as inversifyInterfaces } from "inversify";

describe("ProvideOnSyntax", () => {

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        Reflect.deleteMetadata(METADATA_KEY.provide, Reflect);
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should be able to declare a binding with an activation handler", () => {

        class Ninja {}
        let onActivationExpectation = sinon.expectation.create("onActivation");

        let mockBindingOnSyntax = { onActivation: onActivationExpectation } as any as inversifyInterfaces.BindingOnSyntax<any>;
        let bindingOnSyntaxFunction =
            (bind: inversifyInterfaces.Bind, target: any) => {
                bind<Ninja>("Ninja");
                return mockBindingOnSyntax;
            };
        let bindingInSyntaxFunction =
            (bind: inversifyInterfaces.Bind, target: any) => bind<Ninja>("Ninja").to(<any>null);
        let provideDoneSyntax = new ProvideDoneSyntax(bindingInSyntaxFunction);
        let provideOnSyntax = new ProvideOnSyntax(bindingOnSyntaxFunction, provideDoneSyntax);
        let mockBind = sinon.expectation.create("bind");

        let provide = provideOnSyntax.onActivation((a: any) => { return a; }).done();
        provide(Ninja);
        provideOnSyntax.onActivation((a: any) => { return a; });
        let metadata = Reflect.getMetadata(METADATA_KEY.provide, Reflect)[0];
        metadata.constraint(mockBind);
        expect(onActivationExpectation.callCount).eq(1);
        expect(mockBind.callCount).eq(1);

    });

});
