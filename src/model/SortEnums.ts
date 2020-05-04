export enum CustomerSortField {
    ID = 'Id',
    NAME = 'Name',
    SURNAME = 'Surname',
    EMAIL = 'Email',
    TELEPHONE = 'Telephone',
    CITY_ID = 'CityId',
}

export enum BillSortField {
    ID = 'Id',
    DATE = 'Date',
    BILL_NUMBER = 'BillNumber',
    CUSTOMER_ID = 'CustomerId',
    SELLER_ID = 'SellerId',
    CREDIT_CARD_ID = 'CreditCardId',
    COMMENT = 'Comment',
}

export enum BillItemsSortField {
    BILL_ID = 'BillId',
    PRODUCT_ID = 'ProductId',
    QUANTITY = 'Quantity',
}
