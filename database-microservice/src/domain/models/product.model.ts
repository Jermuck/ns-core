
export interface IProductModel {
    readonly itemNumber?            : string;
    readonly country?               : string;
    readonly brand?                 : string;
    readonly productLine?           : string;
    readonly name?                  : string;
    readonly type?                  : string;
    readonly color?                 : string;
    readonly description?           : string;
    readonly ingredients?           : string;
    readonly size?                  : number;
    readonly measure?               : string;
    readonly price?                 : number;
    readonly retailPrice?           : number;
    readonly sale?                  : string;
    readonly availableQuantity?     : number;
    readonly additionalInformation? : string;
    readonly photos?                : string[];
    readonly supplier?              : string;
    readonly model?                 : string;
    readonly oldPrice?              : number;
    readonly currency?              : string;
    readonly mpPrice?               : number;
    readonly tax?                   : string;
}
