import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tenant } from '@/types/database.types';

interface BillingFormProps {
  tenants?: Tenant[];
  selectedTenant: string;
  consumption: string;
  month: string;
  amount: string;
  isSubmitting: boolean;
  onTenantChange: (value: string) => void;
  onConsumptionChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const BillingForm: React.FC<BillingFormProps> = ({
  tenants,
  selectedTenant,
  consumption,
  month,
  amount,
  isSubmitting,
  onTenantChange,
  onConsumptionChange,
  onMonthChange,
  onAmountChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tenant">Inquilino</Label>
        <Select value={selectedTenant} onValueChange={onTenantChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um inquilino" />
          </SelectTrigger>
          <SelectContent>
            {tenants?.map((tenant) => (
              <SelectItem key={tenant.id} value={tenant.id}>
                {tenant.name} - {tenant.unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="consumption">Consumo (kWh)</Label>
        <Input 
          id="consumption" 
          type="number" 
          step="0.01"
          min="0"
          value={consumption}
          onChange={(e) => onConsumptionChange(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Valor (R$)</Label>
        <Input 
          id="amount" 
          type="number" 
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="month">Mês de Referência</Label>
        <Input 
          id="month" 
          type="month" 
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-eco-green hover:bg-leaf-dark"
        disabled={isSubmitting}
      >
        <Send className="w-4 h-4 mr-2" />
        {isSubmitting ? 'Processando...' : 'Registrar e Enviar Cobrança'}
      </Button>
    </form>
  );
};