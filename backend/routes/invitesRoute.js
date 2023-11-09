import express from "express";
import mongoose from "mongoose";
import inviteModel from "../models/inviteModel.js";
import { User } from "../models/userModel.js";
import { Company } from "../models/companyModel.js";

const router = express.Router();

// Route to get all invites from a specific recipient user
router.get("/recipient/:userId/pending", async (request, response) => {
  const { userId } = request.params;

  try {
    // Get all invites with status "pending" and recipientId equal to userId
    let invites = await inviteModel
      .find({
        recipientId: new mongoose.Types.ObjectId(userId),
        status: "pending",
      })
      .sort({ createdAt: -1 });

    // Convert invites to plain JavaScript objects
    invites = invites.map((invite) => invite.toObject());

    // Add additional info to each invite
    for (const invite of invites) {
      // Add sender info
      const sender = await User.findById(invite.senderId);
      invite["sender"] = sender.toObject();

      const recipient = await User.findById(invite.recipientId);
      invite["recipient"] = recipient.toObject();

      if (invite.kind === "company_ownership") {
        // Add company info
        if (invite.companyId) {
          const company = await Company.findById(invite.companyId);
          invite["company"] = company.toObject();
        }
      }
    }

    // Send status 200 response and the invites as JSON response if successful
    return response.status(200).json(invites);
  } catch (error) {
    // Send status 500 response and error message as JSON response if unsuccessful
    return response.status(500).json({
      message: error.message,
    });
  }
});

// Route for updating an invite status
router.put("/status/:inviteId", async (request, response) => {
  const { inviteId } = request.params;

  try {
    // Find the invite document using the inviteId
    const invite = await inviteModel.findById(inviteId);

    // Update the invite status
    invite.status = request.body.status;

    // Save the updated invite document
    await invite.save();

    // Send status 200 response and the updated invite document as JSON response if successful
    return response.status(200).json(invite);
  } catch (error) {
    console.log(
      "ERROR in PUT /status/:inviteId route in inviteRoute.js: ",
      error
    );

    // Send status 500 response and error message as JSON response if unsuccessful
    return response.status(500).json({
      message: error.message,
    });
  }
});

// Route to save a new invite
router.post("/", async (request, response) => {
  // Create a new invite document using the Invite model
  try {
    const newInvite = new inviteModel({
      senderId: new mongoose.Types.ObjectId(request.body.senderId),
      recipientId: new mongoose.Types.ObjectId(request.body.recipientId),
      kind: request.body.kind,
      companyId: request.body.companyId
        ? new mongoose.Types.ObjectId(request.body.companyId)
        : null,
      status: request.body.status,
    });

    // Save the new invite document
    await newInvite.save();

    // Send status 201 response and the new invite document as JSON response if successful
    return response.status(201).json(newInvite);
  } catch (error) {
    // Send status 500 response and error message as JSON response if unsuccessful
    return response.status(500).json({
      message: error.message,
    });
  }
});

export default router;
