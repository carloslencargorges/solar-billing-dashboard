import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ManualBilling = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Cobrança enviada com sucesso!",
      description: "O inquilino receberá a fatura por email.",
    });
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Envio Manual de Cobrança</h3>
          <p className="text-warm-gray">Preencha os dados para gerar uma nova cobrança</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tenant">Inquilino</Label>
            <Input id="tenant" placeholder="Nome do inquilino" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <Input id="amount" placeholder="R$ 0,00" type="number" step="0.01" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Data de Vencimento</Label>
            <Input id="dueDate" type="date" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Input id="notes" placeholder="Observações adicionais" />
          </div>

          <Button type="submit" className="w-full bg-eco-green hover:bg-leaf-dark">
            <send className="w-4 h-4 mr-2" />
            Enviar Cobrança
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ManualBilling;