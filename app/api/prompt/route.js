import { connectMongoDB } from "@lib/mongodb"
import Prompt from '@models/prompt';

export const GET = async (req) => {
    console.log('req GET prompt');
    console.log(req);

    try {
        await connectMongoDB();

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}