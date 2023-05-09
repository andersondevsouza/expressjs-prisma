import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/customers", async (req, res) => {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(customers);
});

app.post("/customers", async (req, res) => {
  const customer = await prisma.customer.create({
    data: req.body,
  })
})

/*app.post("/customers", async (req, res) => {
  const customer = await prisma.customer.create({
    data: {
      createdAt: new Date(),
      name: req.body.name ?? "Empty customer",
      email: req.body.email
    },
  });

  return res.json(customer);
});

app.get("/customers/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await prisma.customer.findUnique({
    where: { id },
  });

  return res.json(customer);
});

app.put("/customers/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await prisma.customer.update({
    where: { id },
    data: req.body,
  });

  return res.json(customer);
});

app.delete("/customers/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.customer.delete({
    where: { id },
  });

  return res.send({ status: "ok" });
});*/

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>Todo REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /todos
    GET, PUT, DELETE /todos/:id
  </pre>
  `.trim(),
  );
});

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
