export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postal_code: string;
  created_at: string;
}

export interface Consumption {
  id: string;
  tenant_id: string;
  consumption: number;
  month: string;
  created_at: string;
}

export interface Billing {
  id: string;
  tenant_id: string;
  amount: number;
  status: 'pending' | 'paid';
  due_date: string;
  created_at: string;
}