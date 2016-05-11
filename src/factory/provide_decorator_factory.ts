/// <reference path="../interfaces/interfaces.d.ts" />

import provide from "../decorator/provide";

function makeProvideDecorator(kernel: inversify.IKernel) {
    return provide(kernel);
}

export default makeProvideDecorator;
