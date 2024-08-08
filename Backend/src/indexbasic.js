import express from "express";
const PORT = 8080;
const app = express();

// Routes
app.get("/api/two-liner", (req, res) => {
  res.status(200).send([
    {
      id: "a1b2c3",
      text: "जीवन एक संघर्ष है, इसे साहस से जीओ।",
      writer: "अज्ञात",
    },
    {
      id: "d4e5f6",
      text: "सपने वही सच होते हैं, जो समय पर पूरे होते हैं।",
      writer: "राहुल",
    },
    {
      id: "g7h8i9",
      text: "कड़ी मेहनत का फल मीठा होता है, इसे चखने का मजा अलग है।",
      writer: "नीलम",
    },
    {
      id: "j1k2l3",
      text: "समय अमूल्य है, इसे व्यर्थ मत गंवाओ।",
      writer: "संदीप",
    },
    {
      id: "m4n5o6",
      text: "सफलता के लिए धैर्य जरूरी है, हर कदम सोच-समझकर उठाओ।",
      writer: "प्रिया",
    },
  ]);
});

// listen on port
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
