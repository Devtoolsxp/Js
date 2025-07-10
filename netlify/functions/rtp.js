const db = require("./firebase");

exports.handler = async (event) => {
  const { jogo } = event.queryStringParameters;

  if (!jogo) return { statusCode: 400, body: "Parâmetro 'jogo' obrigatório" };

  const ref = db.ref("jogos/" + jogo);
  const snapshot = await ref.once("value");
  const dados = snapshot.val();

  if (!dados) return { statusCode: 404, body: "Jogo não encontrado" };

  const { ganhos, perdas } = dados;
  const total = ganhos + perdas;
  const rtp = total === 0 ? 0 : (ganhos / total) * 100;

  return {
    statusCode: 200,
    body: JSON.stringify({
      jogo,
      ganhos,
      perdas,
      rtp: `${rtp.toFixed(2)}%`
    })
  };
};
