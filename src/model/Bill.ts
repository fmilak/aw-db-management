import CreditCard from './CreditCard';
import Seller from './Seller';

class Bill {
    Id = 0;
    Date: Date = new Date();
    BillNumber = '';
    CustomerId = 0;
    SellerId = 0;
    CreditCardId = 0;
    Comment = '';
    CreditCard: CreditCard = new CreditCard();
    Seller: Seller = new Seller();
}

export default Bill;
