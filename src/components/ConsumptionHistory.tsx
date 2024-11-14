import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data - replace with real data later
const mockConsumption = [
  {
    id: 1,
    tenant: "João Silva",
    unit: "Apt 101",
    consumption: 150,
    month: "2024-03",
    billingId: 1
  },
  {
    id: 2,
    tenant: "Maria Santos",
    unit: "Apt 102",
    consumption: 200,
    month: "2024-03",
    billingId: 2
  },
  {
    id: 3,
    tenant: "João Silva",
    unit: "Apt 101",
    consumption: 145,
    month: "2024-02",
    billingId: 3
  },
];

const mockTenants = [
  { id: 1, name: "João Silva", unit: "Apt 101" },
  { id: 2, name: "Maria Santos", unit: "Apt 102" },
];

const ConsumptionHistory = () => {
  const [selectedMonth, setSelectedMonth] = React.useState<string>("");
  const [selectedTenant, setSelectedTenant] = React.useState<string>("");
  const [selectedUnit, setSelectedUnit] = React.useState<string>("");

  const uniqueUnits = Array.from(new Set(mockTenants.map(tenant => tenant.unit)));
  
  // Get all unique months from the consumption data
  const uniqueMonths = Array.from(new Set(mockConsumption.map(item => item.month))).sort((a, b) => b.localeCompare(a));

  const filteredConsumption = mockConsumption.filter(item => {
    const monthMatch = !selectedMonth || item.month === selectedMonth;
    const tenantMatch = !selectedTenant || item.tenant === selectedTenant;
    const unitMatch = !selectedUnit || item.unit === selectedUnit;
    return monthMatch && tenantMatch && unitMatch;
  });

  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-6">
        <h3 className="text-lg font-semibold">Histórico de Consumo</h3>
        
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-48">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os meses</SelectItem>
                {uniqueMonths.map(month => (
                  <SelectItem key={month} value={month}>
                    {format(new Date(month), 'MMMM yyyy', { locale: ptBR })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-48">
            <Select value={selectedTenant} onValueChange={setSelectedTenant}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por inquilino" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os inquilinos</SelectItem>
                {mockTenants.map(tenant => (
                  <SelectItem key={tenant.id} value={tenant.name}>
                    {tenant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-48">
            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as unidades</SelectItem>
                {uniqueUnits.map(unit => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Inquilino</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Mês</TableHead>
              <TableHead>Consumo (kWh)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConsumption.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.tenant}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>
                  {format(new Date(item.month), 'MMMM yyyy', { locale: ptBR })}
                </TableCell>
                <TableCell>{item.consumption} kWh</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ConsumptionHistory;