import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { File, CheckCircle, XCircle, Send, Calendar, PlusCircle } from 'lucide-react';
import BillingOverview from './BillingOverview';
import BillingHistory from './BillingHistory';
import ManualBilling from './ManualBilling';

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
            <TabsTrigger value="manual" className="data-[state=active]:bg-eco-green/10 data-[state=active]:text-eco-green">
              <PlusCircle className="w-4 h-4 mr-2" />
              Envio Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-slide-up">
            <BillingOverview />
          </TabsContent>

          <TabsContent value="history" className="animate-slide-up">
            <BillingHistory />
          </TabsContent>

          <TabsContent value="manual" className="animate-slide-up">
            <ManualBilling />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardLayout;