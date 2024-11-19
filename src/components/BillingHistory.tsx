import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from 'lucide-react';

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
];

const BillingHistory = () => {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold">Histórico de Faturas</h3>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Inquilino</TableHead>
                <TableHead className="whitespace-nowrap">Valor</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Data de Envio</TableHead>
                <TableHead className="whitespace-nowrap">Vencimento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBillings.map((billing) => (
                <TableRow key={billing.id} className="hover:bg-eco-green/5">
                  <TableCell className="whitespace-nowrap font-medium">{billing.tenant}</TableCell>
                  <TableCell className="whitespace-nowrap">{billing.amount}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {billing.status === 'paid' ? (
                      <Badge className="bg-eco-green/20 text-leaf-dark hover:bg-eco-green/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Pago
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Pendente</Badge>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{new Date(billing.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="whitespace-nowrap">{new Date(billing.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};

export default BillingHistory;