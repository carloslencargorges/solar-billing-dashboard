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
    <div className="min-h-screen bg-paper p-2 sm:p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-8">
        <header className="space-y-2 px-2 sm:px-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-eco-green/10 text-eco-green text-sm font-medium">
            Dashboard Solar
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-leaf-dark">Gestão de Cobranças</h1>
        </header>

        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto pb-2">
            <TabsList className="bg-white shadow-sm border w-full sm:w-auto inline-flex">
              <TabsTrigger value="overview" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green whitespace-nowrap inline-flex items-center">
                <File className="w-4 h-4 mr-2" />
                <span>Visão Geral</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green whitespace-nowrap inline-flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Histórico</span>
              </TabsTrigger>
              <TabsTrigger value="consumption" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green whitespace-nowrap inline-flex items-center">
                <History className="w-4 h-4 mr-2" />
                <span>Consumo</span>
              </TabsTrigger>
              <TabsTrigger value="manual" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green whitespace-nowrap inline-flex items-center">
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>Manual</span>
              </TabsTrigger>
              <TabsTrigger value="bulk" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green whitespace-nowrap inline-flex items-center">
                <ListPlus className="w-4 h-4 mr-2" />
                <span>Massa</span>
              </TabsTrigger>
              <TabsTrigger value="tenants" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green whitespace-nowrap inline-flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>Inquilinos</span>
              </TabsTrigger>
            </TabsList>
          </div>

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