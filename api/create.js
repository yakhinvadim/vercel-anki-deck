const AnkiExport = require("anki-apkg-export").default;

module.exports = async (req, res) => {
    const { body } = req;

    const deckName = body.deckName || "anki-deck";

    const apkg = new AnkiExport(deckName, body.template);
    body.cards.forEach((card) => apkg.addCard(card.front, card.back));
    const zip = await apkg.save();

    res.setHeader(
        "Content-Disposition",
        `attachment; filename="${deckName}.apkg"`
    );

    res.send(zip)
}
