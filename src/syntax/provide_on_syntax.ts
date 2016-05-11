/// <reference path="../interfaces/interfaces.d.ts" />

import ProvideWhenSyntax from "./provide_when_syntax";
import ProvideDoneSyntax from "./provide_done_syntax";

class ProvideOnSyntax<T> implements IProvideOnSyntax<T> {

    private _bindingOnSyntax: inversify.IBindingOnSyntax<T>;

    public constructor(bindingOnSyntax: inversify.IBindingOnSyntax<T>) {
        this._bindingOnSyntax = bindingOnSyntax;
    }

    public onActivation(fn: (context: inversify.IContext, injectable: T) => T): IProvideWhenSyntax<T> {
        let bindingWhenSyntax = this._bindingOnSyntax.onActivation(fn);
        return new ProvideWhenSyntax(bindingWhenSyntax);
    }

    public done() {
        let binding: inversify.IBinding<T> = (<any>this._bindingOnSyntax)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax<T>(binding);
        return provideDoneSyntax.done();
    }

}

export default ProvideOnSyntax;
