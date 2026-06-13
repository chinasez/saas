/* eslint-disable camelcase */
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";


import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export async function POST(req: NextRequest) {
  try {
    // Verify webhook using Clerk's built-in function (Core 3)
    const evt = await verifyWebhook(req);
    
    const { id } = evt.data;
    const eventType = evt.type;

    // CREATE
    if (eventType === "user.created") {
      const { 
        id, 
        email_addresses, 
        image_url, 
        first_name, 
        last_name, 
        username 
      } = evt.data;


      const user = {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        username: username!,
        firstName: first_name || "Unknown",
        lastName: last_name || "Unknown",
        photo: image_url,
      };

      const newUser = await createUser(user);
      

      // If you need to update Clerk metadata, use the new SDK
      if (newUser) {
        const client = await clerkClient();  
        await client.users.updateUser(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }
      
      return NextResponse.json({ message: "OK", user: newUser });
      
    }

    // UPDATE
    if (eventType === "user.updated") {
      const { id, image_url, first_name, last_name, username } = evt.data;

      const user = {
        firstName: first_name || "Unknown",
        lastName: last_name || "Unknown",
        username: username!,
        photo: image_url,
      };

      const updatedUser = await updateUser(id, user);

      return NextResponse.json({ message: "OK", user: updatedUser });
    }

    // DELETE
    if (eventType === "user.deleted") {
      const { id } = evt.data;

      const deletedUser = await deleteUser(id!);

      return NextResponse.json({ message: "OK", user: deletedUser });
    }

    // Handle other event types
    console.log(`Webhook with ID ${id} and type ${eventType} received`);
    
    return NextResponse.json({ message: "Webhook received" }, { status: 200 });

  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json(
      { error: "Error verifying webhook" },
      { status: 400 }
    );
  }
}