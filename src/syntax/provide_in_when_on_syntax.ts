/// <reference path="../interfaces/interfaces.d.ts" />

class ProvideInWhenOnSyntax<T> implements IProvideInSyntax<T>, IProvideWhenSyntax<T>, IProvideOnSyntax<T>  {

    private _provideInSyntax: IProvideInSyntax<T>;
    private _provideWhenSyntax: IProvideWhenSyntax<T>;
    private _provideOnSyntax: IProvideOnSyntax<T>;

    public constructor(
        provideInSyntax: IProvideInSyntax<T>,
        provideWhenSyntax: IProvideWhenSyntax<T>,
        provideOnSyntax: IProvideOnSyntax<T>
    ) {
        this._provideInSyntax = provideInSyntax;
        this._provideWhenSyntax = provideWhenSyntax;
        this._provideOnSyntax = provideOnSyntax;
    }

    public when(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.when(constraint);
    }

    public whenTargetNamed(name: string): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenTargetNamed(name);
    }

    public whenTargetTagged(tag: string, value: any): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenTargetTagged(tag, value);
    }

    public whenInjectedInto(parent: (Function|string)): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenInjectedInto(parent);
    }

    public whenParentNamed(name: string): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenParentNamed(name);
    }

    public whenParentTagged(tag: string, value: any): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenParentTagged(tag, value);
    }

    public whenAnyAncestorIs(ancestor: (Function|string)): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenAnyAncestorIs(ancestor);
    }

    public whenNoAncestorIs(ancestor: (Function|string)): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenNoAncestorIs(ancestor);
    }

    public whenAnyAncestorNamed(name: string): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenAnyAncestorNamed(name);
    }

    public whenAnyAncestorTagged(tag: string, value: any): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenAnyAncestorTagged(tag, value);
    }

    public whenNoAncestorNamed(name: string): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenNoAncestorNamed(name);
    }

    public whenNoAncestorTagged(tag: string, value: any): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenNoAncestorTagged(tag, value);
    }

    public whenAnyAncestorMatches(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenAnyAncestorMatches(constraint);
    }

    public whenNoAncestorMatches(constraint: (request: inversify.IRequest) => boolean): IProvideOnSyntax<T> {
        return this._provideWhenSyntax.whenNoAncestorMatches(constraint);
    }

    public onActivation(fn: (context: inversify.IContext, injectable: T) => T): IProvideWhenSyntax<T> {
        return this._provideOnSyntax.onActivation(fn);
    }

    public inSingletonScope(): IProvideWhenOnSyntax<T> {
        return this._provideInSyntax.inSingletonScope();
    }

    public done() {
        return this._provideInSyntax.done();
    }

}

export default ProvideInWhenOnSyntax;
