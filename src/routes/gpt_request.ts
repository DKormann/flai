const apikey = "";

export async function gpt_request(prompt: string) {
  const url = "https://api.openai.com/v1/engines/text-davinci-003/completions";

  let resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apikey,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      stop: ["\n"],
    }),
  });

  let data = await resp.json();

  return data.choices[0].text;
}
