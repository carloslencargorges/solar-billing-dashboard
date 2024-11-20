const EVOLUTION_API_URL = 'https://evolution.carlosgorges.cloud';
const API_KEY = 'ae612cce-61fa-461d-9065-9bfd03faaf1f';

export const sendBilling = async (data: {
  tenant_id: string;
  consumption: number;
  month: string;
  amount: number;
}) => {
  const response = await fetch(`${EVOLUTION_API_URL}/api/v1/billings/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
    body: JSON.stringify({
      tenant_id: data.tenant_id,
      consumption: data.consumption,
      month: data.month,
      amount: data.amount,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Falha ao enviar cobrança');
  }

  return response.json();
};