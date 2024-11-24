interface BillingMessageData {
  id: string;
  tenant: {
    name: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    postal_code: string;
  };
  consumption: {
    current: number;
    previous: number;
    total: number;
  };
  billing: {
    amount: number;
    dueDate: string;
    kwhPrice: number;
  };
}

export const formatBillingMessage = (data: BillingMessageData): string => {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatNumber = (value: number) => 
    new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value);

  return `🌞 *Cobrança de Energia Solar*
------------------------------------------
*Cobrança:* #${data.id}

📍 *Dados do Cliente*
${data.tenant.name}
${data.tenant.street}, ${data.tenant.number}${data.tenant.complement ? ` - ${data.tenant.complement}` : ''}
${data.tenant.neighborhood}
${data.tenant.city} - ${data.tenant.state}
CEP: ${data.tenant.postal_code}

📊 *Medições*
Anterior: ${formatNumber(data.consumption.previous)} kWh
Atual: ${formatNumber(data.consumption.current)} kWh
Consumo: ${formatNumber(data.consumption.total)} kWh

💰 *Valores*
Preço do kWh: ${formatCurrency(data.billing.kwhPrice)}
*Total a pagar: ${formatCurrency(data.billing.amount)}*

📅 *Vencimento:* ${new Date(data.billing.dueDate).toLocaleDateString('pt-BR')}

------------------------------------------
Gorges Empreendimentos, Ltda.
Avenida Ayrton Senna, 596
Centro, Paraíba do Sul - RJ
CEP: 25850-000`;
};