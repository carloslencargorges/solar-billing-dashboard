import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BulkBilling = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [consumptions, setConsumptions] = useState<{ [key: string]: string }>({});
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

  // Mutation for adding consumption records
  const addConsumptionMutation = useMutation({
    mutationFn: async (consumptionData: { tenant_id: string; consumption: number; month: string }) => {
      // Convert YYYY-MM to YYYY-MM-DD by adding the first day of the month
      const formattedMonth = `${consumptionData.month}-01`;
      
      const { data, error } = await supabase
        .from('consumption')
        .insert([{ ...consumptionData, month: formattedMonth }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consumption'] });
      toast({
        title: "Consumo registrado com sucesso!",
        description: "Os dados de consumo foram salvos.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao registrar consumo",
        description: "Ocorreu um erro ao salvar os dados de consumo.",
        variant: "destructive",
      });
      console.error('Error:', error);
    },
  });

  const handleConsumptionChange = (tenantId: string, value: string) => {
    setConsumptions(prev => ({
      ...prev,
      [tenantId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!month) {
      toast({
        title: "Erro de validação",
        description: "Por favor, selecione o mês de referência.",
        variant: "destructive",
      });
      return;
    }

    // Submit consumption data for each tenant
    for (const [tenantId, consumption] of Object.entries(consumptions)) {
      if (consumption && parseFloat(consumption) > 0) {
        await addConsumptionMutation.mutateAsync({
          tenant_id: tenantId,
          consumption: parseFloat(consumption),
          month,
        });
      }
    }

    // Clear form after successful submission
    setConsumptions({});
    setMonth('');
  };

  if (isLoading) {
    return <div>Carregando inquilinos...</div>;
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Registro de Consumo</h3>
          <p className="text-muted-foreground">Insira o consumo de cada inquilino para o mês selecionado</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="month">Mês de Referência</Label>
            <Input 
              id="month" 
              type="month" 
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inquilino</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Consumo (kWh)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants?.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>{tenant.name}</TableCell>
                    <TableCell>{tenant.unit}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="0"
                        value={consumptions[tenant.id] || ''}
                        onChange={(e) => handleConsumptionChange(tenant.id, e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

export default BulkBilling;