/// <reference path="../interfaces/interfaces.d.ts" />

import ProvideOnSyntax from "./provide_on_syntax";
import ProvideDoneSyntax from "./provide_done_syntax";

class ProvideWhenSyntax<T> implements IProvideWhenSyntax<T> {

    private _bindingWhenSyntax: inversify.IBindingWhenSyntax<T>;

    public constructor(bindingWhenSyntax: inversify.IBindingWhenSyntax<T>) {
        this._bindingWhenSyntax = bindingWhenSyntax;
    }

    public when(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.when(constraint);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenTargetNamed(name: string): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenTargetNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenTargetTagged(tag: string, value: any): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenTargetTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenInjectedInto(parent: (Function|string)): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenInjectedInto(parent);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenParentNamed(name: string): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenParentNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenParentTagged(tag: string, value: any): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenParentTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenAnyAncestorIs(ancestor: (Function|string)): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenNoAncestorIs(ancestor: (Function|string)): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenAnyAncestorNamed(name: string): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenAnyAncestorTagged(tag: string, value: any): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenNoAncestorNamed(name: string): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorNamed(name);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenNoAncestorTagged(tag: string, value: any): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenAnyAncestorMatches(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public whenNoAncestorMatches(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }

    public done() {
        let binding: inversify.IBinding<T> = (<any>this._bindingWhenSyntax)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax<T>(binding);
        return provideDoneSyntax.done();
    }

}

export default ProvideWhenSyntax;
