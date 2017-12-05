import interfaces from "../interfaces/interfaces";
import ProvideOnSyntax from "./provide_on_syntax";
import { interfaces as inversifyInterfaces } from "inversify";

class ProvideWhenSyntax<T> implements interfaces.ProvideWhenSyntax<T> {

    private _bindingWhenSyntax: inversifyInterfaces.BindingWhenSyntax<T>;
    private _provideDoneSyntax: interfaces.ProvideDoneSyntax;

    public constructor(
        bindingWhenSyntax: inversifyInterfaces.BindingWhenSyntax<T>,
        provideDoneSyntax: interfaces.ProvideDoneSyntax
    ) {
        this._bindingWhenSyntax = bindingWhenSyntax;
        this._provideDoneSyntax = provideDoneSyntax;
    }

    public when(constraint: (request: inversifyInterfaces.Request) => boolean): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.when(constraint);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenTargetNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenTargetNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenTargetTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenTargetTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenInjectedInto(parent: (Function|string)): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenInjectedInto(parent);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenParentNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenParentNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenParentTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenParentTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenAnyAncestorIs(ancestor: (Function|string)): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenNoAncestorIs(ancestor: (Function|string)): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenAnyAncestorNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenAnyAncestorTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenNoAncestorNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenNoAncestorTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenAnyAncestorMatches(constraint: (request: inversifyInterfaces.Request) => boolean): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenNoAncestorMatches(constraint: (request: inversifyInterfaces.Request) => boolean): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public done(force?: boolean) {
        return this._provideDoneSyntax.done(force);
    }

}

export default ProvideWhenSyntax;
