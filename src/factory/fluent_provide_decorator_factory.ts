import fluentProvide from "../decorator/fluent_provide";
import interfaces from "../interfaces/interfaces";
import { interfaces as inversifyInterfaces } from "inversify";

function makeFluentProvideDecorator(container: inversifyInterfaces.Container) {
    let result: (serviceIdentifier: inversifyInterfaces.ServiceIdentifier<any>) => interfaces.ProvideInWhenOnSyntax<any> = null;
    result = fluentProvide(container);
    return result;
}

export default makeFluentProvideDecorator;
