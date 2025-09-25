import interfaces from "../interfaces/interfaces";
import ProvideWhenOnSyntax from "./provide_when_on_syntax";
import ProvideWhenSyntax from "./provide_when_syntax";
import ProvideOnSyntax from "./provide_on_syntax";
import ProvideDoneSyntax from "./provide_done_syntax";
import { interfaces as inversifyInterfaces } from "inversify";

class ProvideInSyntax<T> implements interfaces.ProvideInSyntax<T> {

    private _bindingInSyntax: (bind: inversifyInterfaces.Bind, target: any) => inversifyInterfaces.BindingInSyntax<T>;
    private _provideDoneSyntax: interfaces.ProvideDoneSyntax;

    public constructor(
        bindingInSyntax: (bind: inversifyInterfaces.Bind, target: any) => inversifyInterfaces.BindingInSyntax<T>,
        provideDoneSyntax: interfaces.ProvideDoneSyntax
    ) {
        this._bindingInSyntax = bindingInSyntax;
        this._provideDoneSyntax = provideDoneSyntax;
    }

    public inSingletonScope(): interfaces.ProvideWhenOnSyntax<T> {
        let bindingWhenOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingInSyntax(bind, target).inSingletonScope();
        let inDoneSyntax = new ProvideDoneSyntax(bindingWhenOnSyntax);
        let provideWhenSyntax = new ProvideWhenSyntax<T>(bindingWhenOnSyntax, inDoneSyntax);
        let provideOnSyntax = new ProvideOnSyntax<T>(bindingWhenOnSyntax, inDoneSyntax);
        return new ProvideWhenOnSyntax(provideWhenSyntax, provideOnSyntax);
    }

    public inTransientScope(): interfaces.ProvideWhenOnSyntax<T> {
        let bindingWhenOnSyntax = (bind: inversifyInterfaces.Bind, target: any) => this._bindingInSyntax(bind, target).inTransientScope();
        let inDoneSyntax = new ProvideDoneSyntax(bindingWhenOnSyntax);

        let provideWhenSyntax = new ProvideWhenSyntax<T>(bindingWhenOnSyntax, inDoneSyntax);
        let provideOnSyntax = new ProvideOnSyntax<T>(bindingWhenOnSyntax, inDoneSyntax);
        return new ProvideWhenOnSyntax(provideWhenSyntax, provideOnSyntax);
    }

    public inRequestScope(): interfaces.ProvideWhenOnSyntax<T> {
        let bindingWhenOnSyntax = (bind: inversifyInterfaces.Bind, target: any) => this._bindingInSyntax(bind, target).inRequestScope();
        let inDoneSyntax = new ProvideDoneSyntax(bindingWhenOnSyntax);

        let provideWhenSyntax = new ProvideWhenSyntax<T>(bindingWhenOnSyntax, inDoneSyntax);
        let provideOnSyntax = new ProvideOnSyntax<T>(bindingWhenOnSyntax, inDoneSyntax);
        return new ProvideWhenOnSyntax(provideWhenSyntax, provideOnSyntax);
    }

    public done(force?: boolean) {
        return this._provideDoneSyntax.done(force);
    }

}

export default ProvideInSyntax;
