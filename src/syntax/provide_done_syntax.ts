import interfaces from "../interfaces/interfaces";
import { decorate, injectable } from "inversify";

class ProvideDoneSyntax<T> implements interfaces.ProvideDoneSyntax<T> {

    private _binding: inversify.interfaces.Binding<T>;

    public constructor(binding: inversify.interfaces.Binding<T>) {
        this._binding = binding;
    }

    public done() {
        return (target: any) => {
            decorate(injectable(), target);
            this._binding.implementationType = target;
            return target;
        };
    }

}

export default ProvideDoneSyntax;
