import { connectMongoDB } from "@lib/mongodb"
import Prompt from '@models/prompt';

export const POST = async (req, res) => {
    console.log('req prompt-new')
    console.log(req)
    console.log('res prompt-new')
    console.log(res)

    const { userId, prompt, tag } = await req.json();

    try {
        await connectMongoDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 })
    }
}