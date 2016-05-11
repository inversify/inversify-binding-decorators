/// <reference path="../interfaces/interfaces.d.ts" />

import ProvideWhenOnSyntax from "./provide_when_on_syntax";
import ProvideWhenSyntax from "./provide_when_syntax";
import ProvideOnSyntax from "./provide_on_syntax";
import ProvideDoneSyntax from "./provide_done_syntax";

class ProvideInSyntax<T> implements IProvideInSyntax<T> {

    private _bindingInSyntax: inversify.IBindingInSyntax<T>;

    public constructor(bindingInSyntax: inversify.IBindingInSyntax<T>) {
        this._bindingInSyntax = bindingInSyntax;
    }

    public inSingletonScope(): IProvideWhenOnSyntax<T> {
        let bindingWhenOnSyntax = this._bindingInSyntax.inSingletonScope();
        let provideWhenSyntax = new ProvideWhenSyntax<T>(bindingWhenOnSyntax);
        let provideOnSyntax = new ProvideOnSyntax<T>(bindingWhenOnSyntax);
        return new ProvideWhenOnSyntax(provideWhenSyntax, provideOnSyntax);
    }

    public done() {
        let binding: inversify.IBinding<T> = (<any>this._bindingInSyntax)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax<T>(binding);
        return provideDoneSyntax.done();
    }

}

export default ProvideInSyntax;
