import { ObjectId } from "mongodb";
import { ConnectTwo } from "../../lib/dbConnectTwo";
const allCaseCollection = ConnectTwo("grcase");

export async function GET(request, { params }) {
    const { id } = await params;
    const singleAllCase = await allCaseCollection.findOne({ _id:new ObjectId(id)});
    if(!singleAllCase) {
        return Response.json({ 
            status:404,
            message: 'All case not found' });
    }
    return Response.json(singleAllCase);
}


export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    delete body._id; // ✅ prevent error
    
    const result = await allCaseCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: body }
    );
    console.log(id);

    if (result.matchedCount === 0) {
      return Response.json({ status: 404, message: "Case not found" });
    }

    const updatedData = await allCaseCollection.findOne({
      _id: new ObjectId(id),
    });

    return Response.json(updatedData);
  } catch (error) {
    return Response.json({
      status: 500,
      message: "Update failed",
    });
  }
}


export async function DELETE(request, { params }) {
    const { id } = await params;
    const deleteAllCaseData = await allCaseCollection.deleteOne({ _id: new ObjectId(id) });
    if (deleteAllCaseData.deletedCount === 0) {
        return Response.json({
            status: 404,
            message: 'All case not found'
        });
    }
    return Response.json(deleteAllCaseData);
}