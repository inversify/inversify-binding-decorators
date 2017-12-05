import interfaces from "../interfaces/interfaces";
import { decorate, injectable } from "inversify";
import { interfaces as inversifyInterfaces, METADATA_KEY } from "inversify";

class ProvideDoneSyntax<T> implements interfaces.ProvideDoneSyntax {

    private _binding: inversifyInterfaces.Binding<T>;

    public constructor(binding: inversifyInterfaces.Binding<T>) {
        this._binding = binding;
    }

    public done(force?: boolean) {
        const that = this;
        return function (target: any) {

            const isAlreadyDecorated = Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target);
            const redecorateWithInject = force === true;

            if (redecorateWithInject === true && isAlreadyDecorated === false) {
                decorate(injectable(), target);
            } else if (redecorateWithInject === true && isAlreadyDecorated === true) {
                // Do nothing
            } else {
                try {
                    decorate(injectable(), target);
                } catch (e) {
                    throw new Error(
                        "Cannot apply @provideFluent decorator multiple times but is has been used " +
                        `multiple times in ${target.name} ` +
                        "Please use @done(true) if you are trying to declare multiple bindings!"
                    );
                }
            }

            that._binding.implementationType = target;
            return target;
        };
    }

}

export default ProvideDoneSyntax;
