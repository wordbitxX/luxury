import "dotenv/config";
import { readFile } from "node:fs/promises";
import { eq } from "drizzle-orm";
import { db, pool } from "@/db";
import { orders, reservations, enquiries } from "@/db/schema";

async function cleanup() {
  const { email } = JSON.parse(await readFile("artifacts/qa-records.json", "utf8")) as { email: string };
  if (!/^qa-\d+@wordbitx-test\.example$/.test(email)) throw new Error("Not a QA test identity; cleanup refused.");
  await db.transaction(async tx => {
    await tx.delete(orders).where(eq(orders.email, email));
    await tx.delete(reservations).where(eq(reservations.email, email));
    await tx.delete(enquiries).where(eq(enquiries.email, email));
  });
  console.log("Removed only this run's QA orders, reservations and enquiries.");
}
cleanup().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => pool.end());
