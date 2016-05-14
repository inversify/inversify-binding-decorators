/// <reference path="../interfaces/interfaces.d.ts" />

import ProvideOnSyntax from "./provide_on_syntax";

class ProvideWhenSyntax<T> implements IProvideWhenSyntax<T> {

    private _bindingWhenSyntax: inversify.IBindingWhenSyntax<T>;
    private _provideDoneSyntax: IProvideDoneSyntax<T>;

    public constructor(
        bindingWhenSyntax: inversify.IBindingWhenSyntax<T>,
        provideDoneSyntax: IProvideDoneSyntax<T>
    ) {
        this._bindingWhenSyntax = bindingWhenSyntax;
        this._provideDoneSyntax = provideDoneSyntax;
    }

    public when(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.when(constraint);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenTargetNamed(name: string): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenTargetNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenTargetTagged(tag: string, value: any): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenTargetTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenInjectedInto(parent: (Function|string)): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenInjectedInto(parent);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenParentNamed(name: string): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenParentNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenParentTagged(tag: string, value: any): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenParentTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenAnyAncestorIs(ancestor: (Function|string)): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenNoAncestorIs(ancestor: (Function|string)): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenAnyAncestorNamed(name: string): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenAnyAncestorTagged(tag: string, value: any): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenNoAncestorNamed(name: string): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenNoAncestorTagged(tag: string, value: any): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenAnyAncestorMatches(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public whenNoAncestorMatches(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
        return new ProvideOnSyntax<T>(bindingOnSyntax, this._provideDoneSyntax);
    }

    public done() {
        return this._provideDoneSyntax.done();
    }

}

export default ProvideWhenSyntax;
