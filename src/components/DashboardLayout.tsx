import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { File, CheckCircle, XCircle, Send, Calendar, PlusCircle, Users, ListPlus, History } from 'lucide-react';
import BillingOverview from './BillingOverview';
import BillingHistory from './BillingHistory';
import ManualBilling from './ManualBilling';
import TenantsManagement from './TenantsManagement';
import BulkBilling from './BulkBilling';
import ConsumptionHistory from './ConsumptionHistory';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-paper p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="space-y-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-eco-green/10 text-eco-green text-sm font-medium">
            Dashboard Solar
          </div>
          <h1 className="text-3xl font-bold text-leaf-dark">Gestão de Cobranças</h1>
        </header>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white shadow-sm border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green">
              <File className="w-4 h-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green">
              <Calendar className="w-4 h-4 mr-2" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="consumption" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green">
              <History className="w-4 h-4 mr-2" />
              Consumo
            </TabsTrigger>
            <TabsTrigger value="manual" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green">
              <PlusCircle className="w-4 h-4 mr-2" />
              Envio Manual
            </TabsTrigger>
            <TabsTrigger value="bulk" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green">
              <ListPlus className="w-4 h-4 mr-2" />
              Envio em Massa
            </TabsTrigger>
            <TabsTrigger value="tenants" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green">
              <Users className="w-4 h-4 mr-2" />
              Inquilinos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-slide-up">
            <BillingOverview />
          </TabsContent>

          <TabsContent value="history" className="animate-slide-up">
            <BillingHistory />
          </TabsContent>

          <TabsContent value="consumption" className="animate-slide-up">
            <ConsumptionHistory />
          </TabsContent>

          <TabsContent value="manual" className="animate-slide-up">
            <ManualBilling />
          </TabsContent>

          <TabsContent value="bulk" className="animate-slide-up">
            <BulkBilling />
          </TabsContent>

          <TabsContent value="tenants" className="animate-slide-up">
            <TenantsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardLayout;