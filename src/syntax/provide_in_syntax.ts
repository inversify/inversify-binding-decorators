/// <reference path="../interfaces/interfaces.d.ts" />

class ProvideInSyntax<T> implements IProvideInSyntax<T> {

    private _bindingInSyntax: inversify.IBindingInSyntax<T>;

    public constructor(bindingInSyntax: inversify.IBindingInSyntax<T>) {
        this._bindingInSyntax = bindingInSyntax;
    }
    
    

}
