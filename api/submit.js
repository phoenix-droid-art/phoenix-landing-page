import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  const { nome, email, idade, telefone } = req.body;

  if (!nome || !email || !telefone || !idade) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const sheetId = process.env.SHEET_ID;

    const dataCadastro = new Date().toLocaleDateString('pt-BR'); // exemplo: 11/07/2025
    const values = [[nome, telefone, idade, email, dataCadastro]];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Leads!A2:E', // agora são 5 colunas: Data, Nome, Email, Idade, Telefone
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    if (response.status !== 200) {
      console.error('Erro da API Google Sheets:', response.data);
      throw new Error('Erro ao enviar para a planilha');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro no backend:', error?.message || error);
    return res.status(500).json({ error: 'Erro interno do servidor', detalhe: error?.message });
  }
}
