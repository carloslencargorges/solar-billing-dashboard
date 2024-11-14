import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { checkCircle, xCircle } from 'lucide-react';

const mockBillings = [
  {
    id: 1,
    tenant: "João Silva",
    amount: "R$ 245,00",
    status: "paid",
    date: "2024-03-15",
    dueDate: "2024-03-25",
  },
  {
    id: 2,
    tenant: "Maria Santos",
    amount: "R$ 180,00",
    status: "pending",
    date: "2024-03-15",
    dueDate: "2024-03-25",
  },
  // Add more mock data as needed
];

const BillingHistory = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Histórico de Faturas</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Inquilino</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Envio</TableHead>
            <TableHead>Vencimento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBillings.map((billing) => (
            <TableRow key={billing.id} className="hover:bg-eco-green/5">
              <TableCell className="font-medium">{billing.tenant}</TableCell>
              <TableCell>{billing.amount}</TableCell>
              <TableCell>
                {billing.status === 'paid' ? (
                  <Badge className="bg-eco-green/20 text-leaf-dark hover:bg-eco-green/30">
                    <checkCircle className="w-3 h-3 mr-1" />
                    Pago
                  </Badge>
                ) : (
                  <Badge variant="secondary">Pendente</Badge>
                )}
              </TableCell>
              <TableCell>{new Date(billing.date).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>{new Date(billing.dueDate).toLocaleDateString('pt-BR')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default BillingHistory;