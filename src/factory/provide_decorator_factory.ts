import provide from "../decorator/provide";

function makeProvideDecorator(kernel: inversify.interfaces.Kernel) {
    return provide(kernel);
}

export default makeProvideDecorator;
