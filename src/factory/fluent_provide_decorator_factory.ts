import fluentProvide from "../decorator/fluent_provide";
import interfaces from "../interfaces/interfaces";
import { interfaces as inversifyInterfaces } from "inversify";

function makeFluentProvideDecorator(kernel: inversifyInterfaces.Kernel) {
    let result: (serviceIdentifier: inversifyInterfaces.ServiceIdentifier<any>) => interfaces.ProvideInWhenOnSyntax<any> = null;
    result = fluentProvide(kernel);
    return result;
}

export default makeFluentProvideDecorator;
