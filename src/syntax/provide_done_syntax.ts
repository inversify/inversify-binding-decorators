/// <reference path="../interfaces/interfaces.d.ts" />

import { decorate, injectable } from "inversify";

class ProvideDoneSyntax<T> implements IProvideDoneSyntax<T> {

    private _binding: inversify.IBinding<T>;

    public constructor(binding: inversify.IBinding<T>) {
        this._binding = binding;
    }

    public done() {
        return function(target: any) {
            decorate(injectable(), target);
            this._binding.implementationType = target;
            return target;
        };
    }

}

export default ProvideDoneSyntax;
