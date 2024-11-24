import axios from 'axios';

export const sendWhatsAppMessage = async (phone: string, name: string, amount: string) => {
  const url = 'https://evolution.carlosgorges.cloud/message/sendText/typebot';
  const headers = {
    'apikey': 'ae612cce-61fa-461d-9065-9bfd03faaf1f',
    'Content-Type': 'application/json',
  };

  const formattedPhone = phone.replace(/\D/g, '');
  const body = {
    number: '55' + formattedPhone,
    options: {
      delay: 1200,
      presence: 'composing',
      linkPreview: false,
    },
    textMessage: {
      text: `Olá ${name}, sua cobrança é de R$ ${amount}`,
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