import { Model, Types } from 'mongoose';

export interface IShop {
  _id: string;
  owner_id: Types.ObjectId; // Reference to User (Seller)
  shop_name: string;
  description?: string;
  logo_url?: string; // shop logo
  banner_url?: string; // shop photo
  isVerified?: boolean;
  business_type?: string;
  shop_address: {
    locationMap?: string;
    street: string;
    zip: string;
    city: string;
    state: string;
    country: string;
  };
  working_hours?: {
    open: string;
    close: string;
  };
  delivery_available?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ShopModel extends Model<IShop> {
  isNameExist(name: string): Promise<IShop | null>;
}

