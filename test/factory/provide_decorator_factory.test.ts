import makeProvideDecorator from "../../src/factory/provide_decorator_factory";
import provide from "../../src/decorator/provide";
import { Container } from "inversify";
import { expect } from "chai";
import "reflect-metadata";

describe("makeFluentProvideDecorator", () => {

    let container = new Container();

    it("Should return a fluentProvide decorator", () => {

        let provide2 = makeProvideDecorator(container);
        expect((<any>provide2).name).eql((<any>provide(container)).name);

    });

});
