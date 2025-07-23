import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Function to generate an AI response using OpenAI's API
 * @param message User's message
 * @returns AI response
 */
export async function generateAIResponse(message: string): Promise<string> {
  try {
    const systemPrompt = 
      "Ты — виртуальный ассистент компании УРАЛМЕТАЛЛОМАРКЕТ (ООО \"УММ\"), которая занимается производством и продажей металлопроката. " +
      "Ты помогаешь клиентам подобрать нужный металлопрокат, отвечаешь на вопросы о продукции, услугах и ценах. " +
      "Ты знаешь все об ассортименте (стальные, алюминиевые и нержавеющие трубы, листы, профили и т.д.), " +
      "о ГОСТ стандартах, о свойствах металлов и их применении в промышленности. " +
      "Отвечай дружелюбно, профессионально и кратко. Если клиент запрашивает цены, спрашивай детали (количество, размеры) " +
      "и предлагай оставить заявку для точного расчета.";

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || 
      "Извините, я не смог обработать ваш запрос. Пожалуйста, попробуйте переформулировать или свяжитесь с нашими менеджерами.";
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.";
  }
}