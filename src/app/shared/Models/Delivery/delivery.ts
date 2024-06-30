export interface Delivery {
  id?: string;
  name: string;
  email: string;
  phone: string;
  branchId: number;
  government: string;
  address: string;
  discountType: string;
  companyPercent: number;
  status: boolean;
  branchName: string;
  deliveryId:string;
  password?: string;
}
export interface IDelivery {
  $id:string;
  $values : Delivery[];
}
