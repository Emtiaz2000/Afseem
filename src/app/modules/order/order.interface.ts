import { Types } from 'mongoose';

export interface IOrderItem {
  product_id: Types.ObjectId; 
  product_name?: string;
  quantity: number;           
  price?: number;    
}

export interface IOrder {
  buyer_id: Types.ObjectId;      
  shop_id: Types.ObjectId;       
  items: IOrderItem[];           
  total_amount: number;          
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'; 
  payment_status: 'unpaid' | 'paid' | 'refunded'; 
  delivery_address: {
    locationMap?: string;
    street: string;
    zip: string;
    city: string;
    state: string;
    country: string;
  };
  whatsapp_no: string;
  createdAt?: Date;
  updatedAt?: Date;
}
