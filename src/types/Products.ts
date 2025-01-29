
export interface Product {
    image: string;
    _id: string;
    productName: string;
    _type: 'product';
    images?: {
      asset: {
        _ref: string;
        _type: 'image';
      };
    };
    price: number;
    description?: string;
    slug: {
      _type: 'slug';
      current: string;
    };
       
    quantity : number  ;

  }