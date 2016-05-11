/// <reference path="../interfaces/interfaces.d.ts" />

import fluentProvide from "../decorator/fluent_provide";

function makeFluentProvideDecorator(kernel: inversify.IKernel) {
    return fluentProvide(kernel);
}

export default makeFluentProvideDecorator;
