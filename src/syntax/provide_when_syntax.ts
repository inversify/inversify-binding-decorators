import interfaces from "../interfaces/interfaces";
import ProvideOnSyntax from "./provide_on_syntax";
import ProvideDoneSyntax from "./provide_done_syntax";
import { interfaces as inversifyInterfaces } from "inversify";

class ProvideWhenSyntax<T> implements interfaces.ProvideWhenSyntax<T> {

    private _bindingWhenSyntax: (bind: inversifyInterfaces.Bind, target: any) => inversifyInterfaces.BindingWhenSyntax<T>;
    private _provideDoneSyntax: interfaces.ProvideDoneSyntax;

    public constructor(
        bindingWhenSyntax: (bind: inversifyInterfaces.Bind, target: any) => inversifyInterfaces.BindingWhenSyntax<T>,
        provideDoneSyntax: interfaces.ProvideDoneSyntax
    ) {
        this._bindingWhenSyntax = bindingWhenSyntax;
        this._provideDoneSyntax = provideDoneSyntax;
    }

    public when(constraint: (request: inversifyInterfaces.Request) => boolean): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) => {
            return this._bindingWhenSyntax(bind, target).when(constraint);
        };
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenTargetNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenTargetNamed(name);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenTargetTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenTargetTagged(tag, value);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenInjectedInto(parent: (Function | string)): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenInjectedInto(parent);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenParentNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenParentNamed(name);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenParentTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenParentTagged(tag, value);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenAnyAncestorIs(ancestor: (Function | string)): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenAnyAncestorIs(ancestor);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenNoAncestorIs(ancestor: (Function | string)): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenNoAncestorIs(ancestor);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenAnyAncestorNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenAnyAncestorNamed(name);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenAnyAncestorTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenAnyAncestorTagged(tag, value);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenNoAncestorNamed(name: string): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenNoAncestorNamed(name);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenNoAncestorTagged(tag: string, value: any): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenNoAncestorTagged(tag, value);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenAnyAncestorMatches(constraint: (request: inversifyInterfaces.Request) => boolean): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenAnyAncestorMatches(constraint);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public whenNoAncestorMatches(constraint: (request: inversifyInterfaces.Request) => boolean): interfaces.ProvideOnSyntax<T> {
        let bindingOnSyntax = (bind: inversifyInterfaces.Bind, target: any) =>
            this._bindingWhenSyntax(bind, target).whenNoAncestorMatches(constraint);
        let whenDoneSyntax = new ProvideDoneSyntax(bindingOnSyntax);

        return new ProvideOnSyntax<T>(bindingOnSyntax, whenDoneSyntax);
    }

    public done(force?: boolean) {
        return this._provideDoneSyntax.done(force);
    }

}

export default ProvideWhenSyntax;
