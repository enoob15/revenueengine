const GEMINI_MODEL = "gemini-2.5-flash";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

export async function generateGeminiPricingInsight(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      }),
      cache: "no-store"
    }
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as GeminiResponse;

  return payload.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? null;
}
