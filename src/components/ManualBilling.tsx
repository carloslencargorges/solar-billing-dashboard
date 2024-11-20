import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sendWhatsAppMessage } from '@/utils/whatsappMessage';

const ManualBilling = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTenant, setSelectedTenant] = useState('');
  const [consumption, setConsumption] = useState('');
  const [month, setMonth] = useState('');

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

  // Mutation for adding consumption
  const addConsumptionMutation = useMutation({
    mutationFn: async (consumptionData: { tenant_id: string; consumption: number; month: string }) => {
      const formattedMonth = `${consumptionData.month}-01`;
      
      // First, save consumption data
      const { data, error } = await supabase
        .from('consumption')
        .insert([{ ...consumptionData, month: formattedMonth }])
        .select()
        .single();

      if (error) throw error;

      // Calculate billing amount (example calculation - adjust as needed)
      const amount = (consumptionData.consumption * 0.92).toFixed(2); // R$ 0,92 per kWh

      // Get tenant details for WhatsApp message
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenants')
        .select('name, phone')
        .eq('id', consumptionData.tenant_id)
        .single();

      if (tenantError) throw tenantError;

      // Send WhatsApp message
      await sendWhatsAppMessage(
        tenantData.phone,
        tenantData.name,
        amount
      );

      // Create billing record
      const { error: billingError } = await supabase
        .from('billings')
        .insert([{
          tenant_id: consumptionData.tenant_id,
          amount: parseFloat(amount),
          status: 'pending',
          due_date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0], // Due in 15 days
        }]);

      if (billingError) throw billingError;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consumption'] });
      toast({
        title: "Consumo registrado com sucesso!",
        description: "Os dados de consumo foram salvos e a mensagem foi enviada.",
      });
      // Reset form
      setSelectedTenant('');
      setConsumption('');
      setMonth('');
    },
    onError: (error) => {
      toast({
        title: "Erro ao registrar consumo",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao salvar os dados de consumo.",
        variant: "destructive",
      });
      console.error('Error:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTenant || !consumption || !month) {
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
      });
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
          <h3 className="text-lg font-semibold">Registro Manual de Consumo</h3>
          <p className="text-muted-foreground">Preencha os dados para registrar o consumo de um inquilino</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tenant">Inquilino</Label>
            <Select value={selectedTenant} onValueChange={setSelectedTenant}>
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
              onChange={(e) => setConsumption(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="month">Mês de Referência</Label>
            <Input 
              id="month" 
              type="month" 
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-eco-green hover:bg-leaf-dark"
            disabled={addConsumptionMutation.isPending}
          >
            <Send className="w-4 h-4 mr-2" />
            {addConsumptionMutation.isPending ? 'Salvando...' : 'Registrar Consumo'}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ManualBilling;