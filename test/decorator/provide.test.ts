import provide from "../../src/decorator/provide";
import { METADATA_KEY } from "../../src/constants";
import interfaces from "../../src/interfaces/interfaces";
import { expect } from "chai";
import * as sinon from "sinon";
import "reflect-metadata";

describe("provide", () => {

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it("Should return target type", () => {

        class Ninja { }
        const provided = provide(Ninja);
        expect(typeof provided).eqls("function");

    });

    it("Should generate a binding when configured and applied to a class", () => {

        class Ninja { }
        provide("Ninja")(Ninja);
        const bindingSpy = sandbox.spy();
        const bindSpy = sandbox.spy(() => { return { to: bindingSpy }; });

        let bindingMetadata: interfaces.ProvideSyntax = Reflect.getMetadata(METADATA_KEY.provide, Reflect)[0];
        bindingMetadata.constraint(bindSpy, Ninja);
        expect(bindingMetadata.implementationType).eql(Ninja);
        expect(bindSpy.calledWith("Ninja")).eql(true);
        expect(bindingSpy.calledWith(Ninja));

    });

    it("Should throw if @provide is applied more than once without force flag", () => {
        function shouldThrow() {
            @provide("Ninja")
            @provide("SilentNinja")
            class Ninja { }
            return Ninja;
        }

        expect(shouldThrow).to.throw(
            "Cannot apply @provide decorator multiple times but is has been used " +
            "multiple times in Ninja " +
            "Please use @provide(ID, true) if you are trying to declare multiple bindings!"
        );

    });

    it("Should work if @provide is applied more than once with force flag", () => {

        function shouldThrow() {
            @provide("Ninja", true)
            @provide("SilentWarrior", true)
            class Ninja { }
            return Ninja;
        }

        expect(shouldThrow).not.to.throw();

    });

});
