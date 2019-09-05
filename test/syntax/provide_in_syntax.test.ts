import ProvideInSyntax from "../../src/syntax/provide_in_syntax";
import { interfaces as inversifyInterfaces } from "inversify";
import { expect } from "chai";
import "reflect-metadata";
import * as sinon from "sinon";
import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";
import { METADATA_KEY } from "../../src/constants";

describe("ProvideInSyntax", () => {

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        Reflect.deleteMetadata(METADATA_KEY.provide, Reflect);
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    ["inSingletonScope", "inRequestScope", "inTransientScope"].forEach(scope => {
        it(`Should be able to declare a binding with ${scope} scope`, () => {

            class Ninja { }
            let inScopeExpectation = sinon.expectation.create(scope);
            let mockBindingInSyntax = { [scope]: inScopeExpectation } as any as inversifyInterfaces.BindingInSyntax<any>;
            let mockBind = sinon.expectation.create("bind");
            let bindingInSyntaxFunction =
                (bind: inversifyInterfaces.Bind, target: any) => {
                    bind<Ninja>("Ninja");
                    return mockBindingInSyntax;
                };
            let binding: inversifyInterfaces.Binding<any> = (<any>bindingInSyntaxFunction)._binding;
            let provideDoneSyntax = new ProvideDoneSyntax(binding as any);

            let provideInSyntax: {[scope: string]: any} = new ProvideInSyntax(bindingInSyntaxFunction, provideDoneSyntax);

            provideInSyntax[scope]().done()(Ninja);
            let metadata = Reflect.getMetadata(METADATA_KEY.provide, Reflect)[0];
            metadata.constraint(mockBind);
            expect(inScopeExpectation.calledOnce).to.eql(true, `${scope} was not called exactly once`);
            expect(mockBind.calledWith("Ninja")).to.be.eql(true, "mock bind was not called");

        });
    });
});
