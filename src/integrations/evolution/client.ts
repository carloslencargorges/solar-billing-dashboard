const EVOLUTION_API_URL = 'https://evolution.carlosgorges.cloud';
const API_KEY = 'ae612cce-61fa-461d-9065-9bfd03faaf1f';

interface SendBillingParams {
  tenant_id: string;
  consumption: number;
  month: string;
  amount: number;
}

export const sendBilling = async (data: SendBillingParams) => {
  const response = await fetch(`${EVOLUTION_API_URL}/message/sendText/typebot`, {
    method: 'POST',
    headers: {
      'apikey': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      number: '55' + data.tenant_id, // We'll need the phone number from tenant
      options: {
        delay: 1200,
        presence: 'composing',
        linkPreview: false,
      },
      textMessage: {
        text: `Olá, sua fatura de energia do mês ${data.month} está disponível.\nConsumo: ${data.consumption}kWh\nValor: R$${data.amount.toFixed(2)}`,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar cobrança');
  }

  return response.json();
};