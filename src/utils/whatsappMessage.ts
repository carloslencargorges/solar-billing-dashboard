import axios from 'axios';
import { formatBillingMessage } from './formatBillingMessage';

interface WhatsAppMessageData {
  tenant: {
    name: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    postal_code: string;
    phone: string;
  };
  billing: {
    id: string;
    amount: number;
    dueDate: string;
  };
  consumption: {
    current: number;
    previous: number;
    total: number;
  };
  kwhPrice: number;
}

export const sendWhatsAppMessage = async (data: WhatsAppMessageData) => {
  const url = 'https://evolution.carlosgorges.cloud/message/sendText/typebot';
  const headers = {
    'apikey': 'ae612cce-61fa-461d-9065-9bfd03faaf1f',
    'Content-Type': 'application/json',
  };

  const formattedPhone = data.tenant.phone.replace(/\D/g, '');
  const messageText = formatBillingMessage({
    id: data.billing.id,
    tenant: {
      name: data.tenant.name,
      street: data.tenant.street,
      number: data.tenant.number,
      complement: data.tenant.complement,
      neighborhood: data.tenant.neighborhood,
      city: data.tenant.city,
      state: data.tenant.state,
      postal_code: data.tenant.postal_code,
    },
    consumption: {
      current: data.consumption.current,
      previous: data.consumption.previous,
      total: data.consumption.total,
    },
    billing: {
      amount: data.billing.amount,
      dueDate: data.billing.dueDate,
      kwhPrice: data.kwhPrice,
    },
  });

  const body = {
    number: '55' + formattedPhone,
    options: {
      delay: 1200,
      presence: 'composing',
      linkPreview: false,
    },
    textMessage: {
      text: messageText,
    },
  };

  try {
    const response = await axios.post(url, body, { headers });
    console.log('Mensagem enviada com sucesso!', response.data);
    return true;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw new Error('Falha ao enviar mensagem WhatsApp');
  }
};