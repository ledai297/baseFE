export class ProductStatics {
    public static NON_TAX = {
        value: 'kct',
        label: 'Không chịu thuế'
    };
    public static ZERO = {
        value: '0',
        label: '0'
    };
    public static FIVE = {
        value: '5',
        label: '5'
    };
    public static TEN = {
        value: '10',
        label: '10'
    };

    public static PRODUCT_TAXES: Array<any> = [
        ProductStatics.NON_TAX,
        ProductStatics.ZERO,
        ProductStatics.FIVE,
        ProductStatics.TEN,
    ]
}