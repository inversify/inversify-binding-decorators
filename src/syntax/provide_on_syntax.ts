/// <reference path="../interfaces/interfaces.d.ts" />

import ProvideWhenSyntax from "./provide_when_syntax";

class ProvideOnSyntax<T> implements IProvideOnSyntax<T> {

    private _bindingOnSyntax: inversify.IBindingOnSyntax<T>;
    private _provideDoneSyntax: IProvideDoneSyntax<T>;

    public constructor(
        bindingOnSyntax: inversify.IBindingOnSyntax<T>,
        provideDoneSyntax: IProvideDoneSyntax<T>
    ) {
        this._bindingOnSyntax = bindingOnSyntax;
        this._provideDoneSyntax = provideDoneSyntax;
    }

    public onActivation(fn: (context: inversify.IContext, injectable: T) => T): IProvideWhenSyntax<T> {
        let bindingWhenSyntax = this._bindingOnSyntax.onActivation(fn);
        return new ProvideWhenSyntax(bindingWhenSyntax, this._provideDoneSyntax);
    }

    public done() {
        return this._provideDoneSyntax.done();
    }

}

export default ProvideOnSyntax;
