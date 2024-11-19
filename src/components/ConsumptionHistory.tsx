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
    <Card className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold">Histórico de Consumo</h3>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Inquilino</TableHead>
                <TableHead className="whitespace-nowrap">Unidade</TableHead>
                <TableHead className="whitespace-nowrap">Consumo (kWh)</TableHead>
                <TableHead className="whitespace-nowrap">Mês de Referência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consumptions?.map((consumption) => (
                <TableRow key={consumption.id}>
                  <TableCell className="whitespace-nowrap">{consumption.tenants?.name}</TableCell>
                  <TableCell className="whitespace-nowrap">{consumption.tenants?.unit}</TableCell>
                  <TableCell className="whitespace-nowrap">{consumption.consumption}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(consumption.month).toLocaleDateString('pt-BR', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};

export default ConsumptionHistory;