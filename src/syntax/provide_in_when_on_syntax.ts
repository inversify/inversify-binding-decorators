/// <reference path="../interfaces/interfaces.d.ts" />

class ProvideInWhenOnSyntax<T> implements IProvideInSyntax<T>, IProvideWhenSyntax<T>, IProvideOnSyntax<T>  {

    private _bindingInWhenOnSyntax: inversify.BindingInWhenOnSyntax<T>;

    public constructor(bindingInWhenOnSyntax: inversify.BindingInWhenOnSyntax<T>) {
        this._bindingInWhenOnSyntax = bindingInWhenOnSyntax;
    }
    
    

}

export default ProvideInWhenOnSyntax;