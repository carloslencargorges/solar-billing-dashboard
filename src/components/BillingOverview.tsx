import React from 'react';
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { File, CheckCircle, XCircle } from 'lucide-react';

const mockData = [
  { month: 'Jan', enviadas: 40, pagas: 35, falhas: 2 },
  { month: 'Fev', enviadas: 45, pagas: 40, falhas: 1 },
  { month: 'Mar', enviadas: 42, pagas: 38, falhas: 0 },
];

const StatCard = ({ icon: Icon, title, value, description, className }: any) => (
  <Card className={`p-4 sm:p-6 space-y-2 transition-all hover:shadow-md ${className}`}>
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5" />
      <h3 className="font-medium text-warm-gray text-sm sm:text-base">{title}</h3>
    </div>
    <p className="text-xl sm:text-2xl font-bold">{value}</p>
    <p className="text-xs sm:text-sm text-warm-gray">{description}</p>
  </Card>
);

const BillingOverview = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <StatCard
          icon={File}
          title="Faturas Enviadas"
          value="42"
          description="Neste mês"
          className="bg-eco-green/5 text-leaf-dark"
        />
        <StatCard
          icon={CheckCircle}
          title="Faturas Pagas"
          value="38"
          description="90.4% do total"
          className="bg-eco-green/10 text-leaf-dark"
        />
        <StatCard
          icon={XCircle}
          title="Falhas no Envio"
          value="0"
          description="Nenhuma falha"
          className="bg-destructive/5 text-destructive"
        />
      </div>

      <Card className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Histórico de Cobranças</h3>
        <div className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="enviadas" name="Enviadas" fill="#34D399" />
              <Bar dataKey="pagas" name="Pagas" fill="#065F46" />
              <Bar dataKey="falhas" name="Falhas" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default BillingOverview;