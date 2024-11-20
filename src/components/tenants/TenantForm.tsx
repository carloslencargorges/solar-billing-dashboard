import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tenant } from '@/types/database.types';

interface TenantFormProps {
  currentTenant: Tenant | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const TenantForm = ({ currentTenant, onSubmit, isLoading }: TenantFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nome</label>
          <Input 
            name="name"
            required 
            placeholder="Nome completo"
            defaultValue={currentTenant?.name}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input 
            name="email"
            required 
            type="email" 
            placeholder="email@exemplo.com"
            defaultValue={currentTenant?.email}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Telefone</label>
          <Input 
            name="phone"
            required 
            placeholder="(00) 00000-0000"
            defaultValue={currentTenant?.phone}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">CEP</label>
          <Input 
            name="postal_code"
            required 
            placeholder="00000-000"
            defaultValue={currentTenant?.postal_code}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-medium">Rua</label>
          <Input 
            name="street"
            required 
            placeholder="Nome da rua"
            defaultValue={currentTenant?.street}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Número</label>
          <Input 
            name="number"
            required 
            placeholder="123"
            defaultValue={currentTenant?.number}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Complemento</label>
          <Input 
            name="complement"
            placeholder="Apto 101"
            defaultValue={currentTenant?.complement}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Bairro</label>
          <Input 
            name="neighborhood"
            required 
            placeholder="Nome do bairro"
            defaultValue={currentTenant?.neighborhood}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Cidade</label>
          <Input 
            name="city"
            required 
            placeholder="Nome da cidade"
            defaultValue={currentTenant?.city}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Estado</label>
          <Input 
            name="state"
            required 
            placeholder="UF"
            defaultValue={currentTenant?.state}
          />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-eco-green hover:bg-leaf-dark mt-6"
        disabled={isLoading}
      >
        {currentTenant ? "Salvar Alterações" : "Cadastrar Inquilino"}
      </Button>
    </form>
  );
};

export default TenantForm;