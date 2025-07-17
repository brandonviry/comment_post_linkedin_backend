const config = require('../config');

async function generateComment(text, imageUrls, apiKey) {
  if (!text) {
    const error = new Error('Text content is required.');
    error.statusCode = 400;
    throw error;
  }

  if (!apiKey) {
    const error = new Error('API key is required.');
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  // Dynamic import for ESM module
  const OpenAI = (await import('openai/index.mjs')).default;

  const openai = new OpenAI({
    baseURL: config.openRouter.baseURL,
    apiKey: apiKey,
    defaultHeaders: {
      'HTTP-Referer': config.openRouter.siteUrl,
      'X-Title': config.openRouter.siteName,
    },
  });

  let promptText;
  const contentParts = [];
  let hasValidImages = false;

  if (imageUrls && imageUrls.length > 0) {
    imageUrls.forEach(url => {
      if (typeof url === 'string' && url.startsWith('http')) {
        contentParts.push({ type: 'image_url', image_url: { url } });
        hasValidImages = true;
      }
    });
  }

  if (hasValidImages) {
    promptText = `En te basant exclusivement sur le texte et les images du post ci‑dessous, rédige un commentaire LinkedIn en FRANÇAIS :
• Fais‑le court : 2 à 3 phrases maximum.
• Adopte un ton positif et professionnel.
• Inclue soit une remarque pertinente, soit une question ouverte qui encourage la conversation.
• N’utilise pas d’anglais, pas d’emojis et ne répète pas le contenu du post.

Post :
"""${text}"""`;
    contentParts.unshift({ type: 'text', text: promptText });
  } else {
    promptText = `En te basant exclusivement sur le texte du post ci‑dessous, rédige un commentaire LinkedIn en FRANÇAIS :
• Fais‑le court : 2 à 3 phrases maximum.
• Adopte un ton positif et professionnel.
• Inclue soit une remarque pertinente, soit une question ouverte qui encourage la conversation.
• N’utilise pas d’anglais, pas d’emojis et ne répète pas le contenu du post.

Post :
"""${text}"""`;
  }

  const messages = [
    {
      role: 'user',
      content: hasValidImages ? contentParts : promptText,
    },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: 'anthropic/claude-3-haiku',
      messages: messages,
    });
    return completion.choices[0].message;
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    const newError = new Error('Failed to generate comment from external API.');
    newError.statusCode = 502; // Bad Gateway
    throw newError;
  }
}

module.exports = { generateComment };
