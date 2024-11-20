import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import TenantForm from './tenants/TenantForm';
import TenantsTable from './tenants/TenantsTable';
import { Tenant } from '@/types/database.types';

const TenantsManagement = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentTenant, setCurrentTenant] = React.useState<Tenant | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const queryClient = useQueryClient();

  // Fetch tenants
  const { data: tenants, isLoading } = useQuery({
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

  // Add tenant mutation
  const addTenantMutation = useMutation({
    mutationFn: async (newTenant: Omit<Tenant, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('tenants')
        .insert(newTenant)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      setIsDialogOpen(false);
      toast({
        title: "Inquilino cadastrado!",
        description: "O novo inquilino foi adicionado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao cadastrar",
        description: "Ocorreu um erro ao cadastrar o inquilino.",
        variant: "destructive",
      });
    },
  });

  // Update tenant mutation
  const updateTenantMutation = useMutation({
    mutationFn: async (tenant: Tenant) => {
      const { data, error } = await supabase
        .from('tenants')
        .update({
          name: tenant.name,
          email: tenant.email,
          phone: tenant.phone,
          street: tenant.street,
          number: tenant.number,
          complement: tenant.complement,
          neighborhood: tenant.neighborhood,
          city: tenant.city,
          state: tenant.state,
          postal_code: tenant.postal_code,
        })
        .eq('id', tenant.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      setIsDialogOpen(false);
      toast({
        title: "Inquilino atualizado!",
        description: "As informações foram atualizadas com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao atualizar o inquilino.",
        variant: "destructive",
      });
    },
  });

  // Delete tenant mutation
  const deleteTenantMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tenants')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      toast({
        title: "Inquilino removido",
        description: "O inquilino foi removido com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao remover",
        description: "Ocorreu um erro ao remover o inquilino.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tenantData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      street: formData.get('street') as string,
      number: formData.get('number') as string,
      complement: formData.get('complement') as string,
      neighborhood: formData.get('neighborhood') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      postal_code: formData.get('postal_code') as string,
    };

    if (isEditing && currentTenant) {
      updateTenantMutation.mutate({ ...tenantData, id: currentTenant.id, created_at: currentTenant.created_at });
    } else {
      addTenantMutation.mutate(tenantData);
    }
  };

  if (isLoading) {
    return <div>Carregando inquilinos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-leaf-dark">Inquilinos</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-eco-green hover:bg-leaf-dark"
              onClick={() => {
                setIsEditing(false);
                setCurrentTenant(null);
              }}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Novo Inquilino
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Editar Inquilino" : "Novo Inquilino"}</DialogTitle>
            </DialogHeader>
            <TenantForm 
              currentTenant={currentTenant}
              onSubmit={handleSubmit}
              isLoading={addTenantMutation.isPending || updateTenantMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <TenantsTable 
        tenants={tenants || []}
        onEdit={(tenant) => {
          setIsEditing(true);
          setCurrentTenant(tenant);
          setIsDialogOpen(true);
        }}
        onDelete={(id) => deleteTenantMutation.mutate(id)}
        isDeleting={deleteTenantMutation.isPending}
      />
    </div>
  );
};

export default TenantsManagement;