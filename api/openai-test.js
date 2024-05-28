const OpenAI = require('openai');

const openai = new OpenAI({apiKey: process.env.API_KEY,});

module.exports  = async (req, res, next) => { console.log("api back controllers");
  const test = "écrit une histoire avec " + req.body.story.heros + 
  " et " + req.body.story.mechant + 
  " dans " + req.body.story.lieu + 
  " avec max " + req.body.story.mots + 
  " mots pour un enfant de " + req.body.story.age + " mois";
  
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content:  test}],
    model: "gpt-3.5-turbo",
  });
  req.ai =  completion.choices[0].message.content;
 
  next();
};