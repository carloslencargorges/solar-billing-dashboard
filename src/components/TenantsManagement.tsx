import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
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

interface Tenant {
  id: string;
  name: string;
  email: string;
  unit: string;
  phone: string;
}

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
    mutationFn: async (newTenant: Omit<Tenant, 'id'>) => {
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
          unit: tenant.unit,
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
      unit: formData.get('unit') as string,
    };

    if (isEditing && currentTenant) {
      updateTenantMutation.mutate({ ...tenantData, id: currentTenant.id });
    } else {
      addTenantMutation.mutate(tenantData);
    }
  };

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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Editar Inquilino" : "Novo Inquilino"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
                <label className="text-sm font-medium">Unidade</label>
                <Input 
                  name="unit"
                  required 
                  placeholder="Ex: Apt 101"
                  defaultValue={currentTenant?.unit}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-eco-green hover:bg-leaf-dark"
                disabled={addTenantMutation.isPending || updateTenantMutation.isPending}
              >
                {isEditing ? "Salvar Alterações" : "Cadastrar Inquilino"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : tenants?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Nenhum inquilino cadastrado</TableCell>
              </TableRow>
            ) : (
              tenants?.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.email}</TableCell>
                  <TableCell>{tenant.phone}</TableCell>
                  <TableCell>{tenant.unit}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setIsEditing(true);
                          setCurrentTenant(tenant);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteTenantMutation.mutate(tenant.id)}
                        disabled={deleteTenantMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantsManagement;