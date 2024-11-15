import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Tenant, Consumption, Billing } from '@/types/database.types';

export const useSupabase = () => {
  const queryClient = useQueryClient();

  // Queries
  const useTenants = () => {
    return useQuery({
      queryKey: ['tenants'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('tenants')
          .select('*')
          .order('name');
        
        if (error) throw error;
        return data as Tenant[];
      },
    });
  };

  const useConsumption = () => {
    return useQuery({
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
  };

  const useBillings = () => {
    return useQuery({
      queryKey: ['billings'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('billings')
          .select(`
            *,
            tenants (
              name,
              unit
            )
          `)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data;
      },
    });
  };

  // Mutations
  const useAddConsumption = () => {
    return useMutation({
      mutationFn: async (consumption: Omit<Consumption, 'id' | 'created_at'>) => {
        const { data, error } = await supabase
          .from('consumption')
          .insert(consumption)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['consumption'] });
      },
    });
  };

  const useAddBilling = () => {
    return useMutation({
      mutationFn: async (billing: Omit<Billing, 'id' | 'created_at'>) => {
        const { data, error } = await supabase
          .from('billings')
          .insert(billing)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['billings'] });
      },
    });
  };

  return {
    useTenants,
    useConsumption,
    useBillings,
    useAddConsumption,
    useAddBilling,
  };
};