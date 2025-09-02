const express = require ("express");
const axios = require ("axios");

const router = express.Router();

let cachedCurrencies = [];

router.get("/", async (req, res) => {
  try {
    if (cachedCurrencies.length > 0) {
      return res.json(cachedCurrencies);
    }

    const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,cca2,currencies,flags");

    // Extract only currency info
    const formatted = response.data
      .map((c) => {
        const currencyCode = c.currencies ? Object.keys(c.currencies)[0] : null;
        const currency = currencyCode ? c.currencies[currencyCode] : null;

        return {
          country: c.name.common,
          countryCode: c.cca2,
          currencyCode,
          currencySymbol: currency?.symbol || "",
          flag: c.flags || "",
        };
      })
      .filter((c) => c.currencyCode && c.currencySymbol);

    // Remove duplicates (many countries share the same currency)
    const unique = Array.from(
      new Map(formatted.map((c) => [c.currencyCode, c])).values()
    ).sort((a, b) => a.currencyCode.localeCompare(b.currencyCode));

    cachedCurrencies = unique;Yh

    res.json(unique);
  } catch (err) {
    console.error("Error fetching currencies:", err.message);
    res.status(500).json({ error: "Failed to fetch currencies" });
  }
});

module.exports = router;
