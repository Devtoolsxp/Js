const db = require("./firebase");

exports.handler = async (event) => {
  const { jogo, valor, tipo } = JSON.parse(event.body || "{}");

  if (!jogo || !valor || !["ganho", "perda"].includes(tipo)) {
    return { statusCode: 400, body: "Parâmetros inválidos" };
  }

  const ref = db.ref("jogos/" + jogo);
  const snapshot = await ref.once("value");
  const atual = snapshot.val() || { ganhos: 0, perdas: 0 };

  if (tipo === "ganho") atual.ganhos += valor;
  if (tipo === "perda") atual.perdas += valor;

  await ref.set(atual);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Registro salvo", dados: atual })
  };
};
