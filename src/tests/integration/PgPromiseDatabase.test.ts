import PgPromiseDatabase from "../../infra/database/PgPromiseDatabase";

test("Deve conectar no banco de dados e listar os itens", async () => {
  const pgPromise = PgPromiseDatabase.getInstance();
  const items = await pgPromise.many("SELECT * FROM ccca.item", []);
  expect(items).toHaveLength(3);
});

test("Deve conectar no banco de dados e pegar um item", async () => {
  const pgPromise = PgPromiseDatabase.getInstance();
  const item = await pgPromise.one("SELECT * FROM ccca.item WHERE id = $1", [1]);
  expect(item.description).toBe("Guitarra");
});
