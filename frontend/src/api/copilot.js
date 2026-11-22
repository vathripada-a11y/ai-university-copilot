const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const queryCopilot = async (prompt) => {
  await delay(300);
  return {
    response: `This is a response from the AI University Copilot regarding: "${prompt}". Full copilot integration will be completed in the upcoming stages.`
  };
};
