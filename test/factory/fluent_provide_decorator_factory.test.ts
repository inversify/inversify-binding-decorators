import makeFluentProvideDecorator from "../../src/factory/fluent_provide_decorator_factory";
import fluentProvide from "../../src/decorator/fluent_provide";
import { Container } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("makeFluentProvideDecorator", () => {

    let container = new Container();

    it("Should return a fluentProvide decorator", () => {

        let fluentProvide2 = makeFluentProvideDecorator(container);
        expect((<any>fluentProvide2).name).eql((<any>fluentProvide(container)).name);

    });

});
