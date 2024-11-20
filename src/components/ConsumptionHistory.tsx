import React from 'react';
import { Card } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

const ConsumptionHistory = () => {
  const { data: consumptionHistory, isLoading } = useQuery({
    queryKey: ['consumption-history'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('consumption')
        .select(`
          *,
          tenant:tenants (
            name,
            street,
            number
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
    <div className="space-y-4">
      {consumptionHistory?.map((record) => (
        <Card key={record.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{record.tenant?.name}</h3>
              <p className="text-sm text-muted-foreground">{record.tenant?.street}, {record.tenant?.number}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{record.consumption} kWh</p>
              <p className="text-sm text-muted-foreground">
                {new Date(record.month).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ConsumptionHistory;