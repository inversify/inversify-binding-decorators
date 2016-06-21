import fluentProvide from "../decorator/fluent_provide";

function makeFluentProvideDecorator(kernel: inversify.interfaces.Kernel) {
    return fluentProvide(kernel);
}

export default makeFluentProvideDecorator;
