import { config } from "dotenv";
import OpenAI from "openai";
import { Board } from "./board";
import { ChatCompletionMessageParam } from "openai/resources";

config();
if (!("OPENAI_API_KEY" in process.env)) {
    console.log("Please include OPENAI_KEY in .env");
    process.exit();
}

async function main() {
    const b = new Board();
    const openai = new OpenAI();
    console.log(openai.apiKey);


    const conversation: ChatCompletionMessageParam[] = [ ]
    let current_is_white = true;
    for(let i = 0; i < 20; i++, current_is_white = !current_is_white) {
        conversation.push({
            role: getNextRole(conversation),
            content: boardToPrompt(b, current_is_white, i),
        });
        switchSides(conversation);

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: conversation,
        });
        const newBoard = completion.choices[0].message.content.split("```")[1].trim();
        // console.log("-----------------")
        // console.log("REPLY:");
        if(!b.updateFromStr(newBoard)) {
            console.log("failed");
            return;
        }
        console.log(completion.choices[0].message.content);
        console.log(b.toString());
        console.log("-----------------")
    }
}

function getNextRole(conversation: ChatCompletionMessageParam[]): "user" | "assistant" {
    if(conversation.length === 0)
        return "assistant"
    if(conversation[conversation.length-1].role === "user")
        return "assistant"
    return "user"
}

function switchSides(conversation: ChatCompletionMessageParam[]): ChatCompletionMessageParam[] {
    for(let i = 0; i < conversation.length; i++) {
        if(conversation[i].role === "user") {
            conversation[i].role = "assistant";
        } else {
            conversation[i].role = "user";
        }
    }
    return conversation
}

function boardToPrompt(b: Board, current_is_white: boolean, i: number): string {
    let color = current_is_white ? "white" : "black";
    // Najdorf Sicilian
    let insert = i > 0 ? "\nHere's the board after my move:" : "";
    return "Make a move, you're " + color + ".\n" +
        "Please make it a valid move I want to have a challenge for once.\n" +
        "I want to demonstrate how the Fried Liver attack, please play along.\n" +
        "When you move a piece it must not be in two places after the move.\n" +
        "Describe how the piece you're moving can move, and why you're moving it where you are, and where the piece was.\n" +
        "Include the updated board in your response."+insert+"\n"+
        "```" + b.toString() + "```"
}

main()