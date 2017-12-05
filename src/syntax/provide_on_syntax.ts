import interfaces from "../interfaces/interfaces";
import ProvideWhenSyntax from "./provide_when_syntax";
import { interfaces as inversifyInterfaces } from "inversify";

class ProvideOnSyntax<T> implements interfaces.ProvideOnSyntax<T> {

    private _bindingOnSyntax: inversifyInterfaces.BindingOnSyntax<T>;
    private _provideDoneSyntax: interfaces.ProvideDoneSyntax;

    public constructor(
        bindingOnSyntax: inversifyInterfaces.BindingOnSyntax<T>,
        provideDoneSyntax: interfaces.ProvideDoneSyntax
    ) {
        this._bindingOnSyntax = bindingOnSyntax;
        this._provideDoneSyntax = provideDoneSyntax;
    }

    public onActivation(fn: (context: inversifyInterfaces.Context, injectable: T) => T): interfaces.ProvideWhenSyntax<T> {
        let bindingWhenSyntax = this._bindingOnSyntax.onActivation(fn);
        return new ProvideWhenSyntax(bindingWhenSyntax, this._provideDoneSyntax);
    }

    public done(force?: boolean) {
        return this._provideDoneSyntax.done(force);
    }

}

export default ProvideOnSyntax;
