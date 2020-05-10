const AnkiExport = require("anki-apkg-export").default
const microCors = require("micro-cors")

const cors = microCors({ allowMethods: ["POST"] })

async function handleRequest(req, res) {
  const { body } = req

  const deckName = body.deckName || "anki-deck"

  const apkg = new AnkiExport(deckName, body.template)
  body.cards.forEach((card) => apkg.addCard(card.front, card.back))
  const zip = await apkg.save()

  res.setHeader(
    "Content-Disposition",
    `attachment filename="${deckName}.apkg"`
  )

  res.status(200).send(zip)
}

module.exports = cors(handleRequest)
