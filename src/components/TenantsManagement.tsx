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

// Mock data - replace with real data later
const mockTenants = [
  { id: 1, name: "João Silva", email: "joao@email.com", unit: "Apt 101", phone: "(11) 99999-9999" },
  { id: 2, name: "Maria Santos", email: "maria@email.com", unit: "Apt 102", phone: "(11) 98888-8888" },
];

const TenantsManagement = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentTenant, setCurrentTenant] = React.useState<any>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: isEditing ? "Inquilino atualizado!" : "Novo inquilino cadastrado!",
      description: "As informações foram salvas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-leaf-dark">Inquilinos</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-eco-green hover:bg-leaf-dark">
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
                <Input required placeholder="Nome completo" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input required type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Telefone</label>
                <Input required placeholder="(00) 00000-0000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Unidade</label>
                <Input required placeholder="Ex: Apt 101" />
              </div>
              <Button type="submit" className="w-full bg-eco-green hover:bg-leaf-dark">
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
            {mockTenants.map((tenant) => (
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
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        toast({
                          title: "Inquilino removido",
                          description: "O inquilino foi removido com sucesso.",
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantsManagement;