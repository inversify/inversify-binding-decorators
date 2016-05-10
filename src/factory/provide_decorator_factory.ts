/// <reference path="../interfaces/interfaces.d.ts" />

import provide from "../decorator/provide";

function makeProvideDecorator(kernel: inversify.IKernel) : (target: any) => any {
    return provide(kernel);
}

export default makeProvideDecorator;
