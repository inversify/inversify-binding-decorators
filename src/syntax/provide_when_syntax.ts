/// <reference path="../interfaces/interfaces.d.ts" />

import ProvideOnSyntax from "provide_on_syntax";
import ProvideDoneSyntax from "provide_done_syntax";

class ProvideWhenSyntax<T> implements IProvideWhenSyntax<T> {

    private _bindingWhenSyntax: inversify.IBindingWhenSyntax<T>;

    public constructor(bindingWhenSyntax: inversify.IBindingWhenSyntax<T>) {
        this._bindingWhenSyntax = bindingWhenSyntax;
    }
    
    public when(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T> {
        let bindingOnSyntax = this._bindingWhenSyntax.when(constraint);
        return new ProvideOnSyntax<T>(bindingOnSyntax);
    }
    
    public whenTargetNamed(name: string): IProvideOnSyntax<T>;
    public whenTargetTagged(tag: string, value: any): IProvideOnSyntax<T>;
    public whenInjectedInto(parent: (Function|string)): IProvideOnSyntax<T>;
    public whenParentNamed(name: string): IProvideOnSyntax<T>;
    public whenParentTagged(tag: string, value: any): IProvideOnSyntax<T>;
    public whenAnyAncestorIs(ancestor: (Function|string)): IProvideOnSyntax<T>;
    public whenNoAncestorIs(ancestor: (Function|string)): IProvideOnSyntax<T>;
    public whenAnyAncestorNamed(name: string): IProvideOnSyntax<T>;
    public whenAnyAncestorTagged(tag: string, value: any): IProvideOnSyntax<T>;
    public whenNoAncestorNamed(name: string): IProvideOnSyntax<T>;
    public whenNoAncestorTagged(tag: string, value: any): IProvideOnSyntax<T>;
    public whenAnyAncestorMatches(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T>;
    public whenNoAncestorMatches(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T>;
    public done() {
        return (target: any) {
            return {}; 
        };
    }
    
}
