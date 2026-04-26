import { ConnectTwo } from "../lib/dbConnectTwo";
const allCaseCollection = ConnectTwo("grcase");

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
};
