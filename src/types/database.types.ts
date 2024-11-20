export interface Tenant {
  id: number;
  name: string;
  email: string;
  unit: string;
  phone: string;
  created_at: string;
}

export interface Consumption {
  id: number;
  tenant_id: number;
  consumption: number;
  month: string;
  created_at: string;
}

export interface Billing {
  id: number;
  tenant_id: number;
  amount: number;
  status: 'pending' | 'paid';
  due_date: string;
  created_at: string;
}