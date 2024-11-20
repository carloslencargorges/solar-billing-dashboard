import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { BillingForm } from './BillingForm';
import { useBillingMutation } from './useBillingMutation';

const ManualBilling = () => {
  const { toast } = useToast();
  const [selectedTenant, setSelectedTenant] = useState('');
  const [consumption, setConsumption] = useState('');
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');

  // Fetch tenants
  const { data: tenants, isLoading } = useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Check for existing consumption
  const checkExistingConsumption = async (tenantId: string, month: string) => {
    const formattedMonth = `${month}-01`;
    const { data, error } = await supabase
      .from('consumption')
      .select('id')
      .eq('tenant_id', tenantId)
      .eq('month', formattedMonth);

    if (error) throw error;
    return data && data.length > 0;
  };

  const addConsumptionMutation = useBillingMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTenant || !consumption || !month || !amount) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check for existing consumption record
      const hasExisting = await checkExistingConsumption(selectedTenant, month);
      
      if (hasExisting) {
        toast({
          title: "Erro de validação",
          description: `Já existe um registro de consumo para o inquilino no mês ${month}.`,
          variant: "destructive",
        });
        return;
      }

      await addConsumptionMutation.mutateAsync({
        tenant_id: selectedTenant,
        consumption: parseFloat(consumption),
        month,
        amount: parseFloat(amount),
      });

      // Reset form on success
      setSelectedTenant('');
      setConsumption('');
      setMonth('');
      setAmount('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return <div>Carregando inquilinos...</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Registro Manual de Consumo e Cobrança</h3>
          <p className="text-muted-foreground">Preencha os dados para registrar o consumo e enviar a cobrança</p>
        </div>

        <BillingForm
          tenants={tenants}
          selectedTenant={selectedTenant}
          consumption={consumption}
          month={month}
          amount={amount}
          isSubmitting={addConsumptionMutation.isPending}
          onTenantChange={setSelectedTenant}
          onConsumptionChange={setConsumption}
          onMonthChange={setMonth}
          onAmountChange={setAmount}
          onSubmit={handleSubmit}
        />
      </div>
    </Card>
  );
};

export default ManualBilling;