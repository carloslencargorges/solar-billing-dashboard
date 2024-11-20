import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { sendBilling } from '@/integrations/evolution/client';
import { useToast } from "@/components/ui/use-toast";

export const useBillingMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (consumptionData: { 
      tenant_id: string; 
      consumption: number; 
      month: string;
      amount: number;
    }) => {
      const formattedMonth = `${consumptionData.month}-01`;
      
      // First save consumption to Supabase
      const { data: consumptionRecord, error } = await supabase
        .from('consumption')
        .insert([{ 
          tenant_id: consumptionData.tenant_id, 
          consumption: consumptionData.consumption,
          month: formattedMonth 
        }])
        .select()
        .single();

      if (error) throw error;

      // Then send billing through Evolution API
      await sendBilling({
        tenant_id: consumptionData.tenant_id,
        consumption: consumptionData.consumption,
        month: formattedMonth,
        amount: consumptionData.amount,
      });

      return consumptionRecord;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consumption'] });
      toast({
        title: "Consumo registrado e cobrança enviada!",
        description: "Os dados foram salvos e a cobrança foi enviada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao processar",
        description: "Ocorreu um erro ao salvar os dados ou enviar a cobrança.",
        variant: "destructive",
      });
      console.error('Error:', error);
    },
  });
};