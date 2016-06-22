import interfaces from "../interfaces/interfaces";
import ProvideWhenSyntax from "./provide_when_syntax";

class ProvideOnSyntax<T> implements interfaces.ProvideOnSyntax<T> {

    private _bindingOnSyntax: inversify.interfaces.BindingOnSyntax<T>;
    private _provideDoneSyntax: interfaces.ProvideDoneSyntax<T>;

    public constructor(
        bindingOnSyntax: inversify.interfaces.BindingOnSyntax<T>,
        provideDoneSyntax: interfaces.ProvideDoneSyntax<T>
    ) {
        this._bindingOnSyntax = bindingOnSyntax;
        this._provideDoneSyntax = provideDoneSyntax;
    }

    public onActivation(fn: (context: inversify.interfaces.Context, injectable: T) => T): interfaces.ProvideWhenSyntax<T> {
        let bindingWhenSyntax = this._bindingOnSyntax.onActivation(fn);
        return new ProvideWhenSyntax(bindingWhenSyntax, this._provideDoneSyntax);
    }

    public done() {
        return this._provideDoneSyntax.done();
    }

}

export default ProvideOnSyntax;
