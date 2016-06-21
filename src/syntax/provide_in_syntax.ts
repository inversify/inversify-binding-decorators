import interfaces from "../interfaces/interfaces";
import ProvideWhenOnSyntax from "./provide_when_on_syntax";
import ProvideWhenSyntax from "./provide_when_syntax";
import ProvideOnSyntax from "./provide_on_syntax";
import ProvideDoneSyntax from "./provide_done_syntax";

class ProvideInSyntax<T> implements interfaces.ProvideInSyntax<T> {

    private _bindingInSyntax: inversify.interfaces.BindingInSyntax<T>;
    private _provideDoneSyntax: interfaces.ProvideDoneSyntax<T>;

    public constructor(
        bindingInSyntax: inversify.interfaces.BindingInSyntax<T>,
        provideDoneSyntax: interfaces.ProvideDoneSyntax<T>
    ) {
        this._bindingInSyntax = bindingInSyntax;
        this._provideDoneSyntax = provideDoneSyntax;
    }

    public inSingletonScope(): interfaces.ProvideWhenOnSyntax<T> {
        let bindingWhenOnSyntax = this._bindingInSyntax.inSingletonScope();
        let provideWhenSyntax = new ProvideWhenSyntax<T>(bindingWhenOnSyntax, this._provideDoneSyntax);
        let provideOnSyntax = new ProvideOnSyntax<T>(bindingWhenOnSyntax, this._provideDoneSyntax);
        return new ProvideWhenOnSyntax(provideWhenSyntax, provideOnSyntax);
    }

    public done() {
        let binding: inversify.interfaces.Binding<T> = (<any>this._bindingInSyntax)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax<T>(binding);
        return provideDoneSyntax.done();
    }

}

export default ProvideInSyntax;
