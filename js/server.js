  await addData("usuarios/1", { nome: "João", idade: 30 });

  // Buscar dados
  await getData("usuarios/1");

  // Atualizar dados
  await updateData("usuarios/1", { idade: 31 });

  // Excluir dados
  await deleteData("usuarios/1");

  // Deslogar o usuário
  await logout();
}

// Chamar a função de exemplo
//exemplo();
;
}

// Chamar a função de exemplo
//exemplo();
