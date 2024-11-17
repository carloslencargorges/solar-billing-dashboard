import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

const ConsumptionHistory = () => {
  const { data: consumptions, isLoading } = useQuery({
    queryKey: ['consumption'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('consumption')
        .select(`
          *,
          tenants (
            name,
            unit
          )
        `)
        .order('month', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Carregando histórico...</div>;
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Histórico de Consumo</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Inquilino</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead>Consumo (kWh)</TableHead>
            <TableHead>Mês de Referência</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {consumptions?.map((consumption) => (
            <TableRow key={consumption.id}>
              <TableCell>{consumption.tenants?.name}</TableCell>
              <TableCell>{consumption.tenants?.unit}</TableCell>
              <TableCell>{consumption.consumption}</TableCell>
              <TableCell>
                {new Date(consumption.month).toLocaleDateString('pt-BR', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ConsumptionHistory;