// import { revalidatePath } from "next/cache";
import { ConnectOne } from "../lib/dbConnectOne";
const allCaseCollection = ConnectOne("crcase");

export async function GET(Request) {
  const result = await allCaseCollection.find().toArray();
  return Response.json(result);
}

export async function POST(request) {
  const allcase = await request.json();
  await allCaseCollection.insertOne(allcase);
  return Response.json({ 
    status:200,
    message: 'Case added successfully' 
  });
}
