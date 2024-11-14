import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Using the same mock data as in TenantsManagement
const mockTenants = [
  { id: 1, name: "João Silva", email: "joao@email.com", unit: "Apt 101", phone: "(11) 99999-9999" },
  { id: 2, name: "Maria Santos", email: "maria@email.com", unit: "Apt 102", phone: "(11) 98888-8888" },
];

const BulkBilling = () => {
  const { toast } = useToast();
  const [consumptions, setConsumptions] = useState<{ [key: number]: string }>({});
  const [dueDate, setDueDate] = useState('');

  const handleConsumptionChange = (tenantId: number, value: string) => {
    setConsumptions(prev => ({
      ...prev,
      [tenantId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would calculate the billing amount based on consumption
    // and send bills to all tenants
    toast({
      title: "Cobranças enviadas com sucesso!",
      description: "Todos os inquilinos receberão suas faturas por email.",
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Envio em Massa de Cobranças</h3>
          <p className="text-warm-gray">Insira o consumo de cada inquilino para gerar as cobranças do mês</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dueDate">Data de Vencimento</Label>
            <Input 
              id="dueDate" 
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
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
                {mockTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>{tenant.name}</TableCell>
                    <TableCell>{tenant.unit}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="0"
                        value={consumptions[tenant.id] || ''}
                        onChange={(e) => handleConsumptionChange(tenant.id, e.target.value)}
                        required
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button type="submit" className="w-full bg-eco-green hover:bg-leaf-dark">
            <Send className="w-4 h-4 mr-2" />
            Enviar Cobranças
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default BulkBilling;