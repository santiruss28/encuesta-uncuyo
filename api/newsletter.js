export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { email } = JSON.parse(req.body);

    // Endpoint de tu Apps Script
    const scriptUrl = "https://script.google.com/macros/s/AKfycbz5SvHcZcghuJckek52SMeBVYecd_KiuWjCyqcFJnpieKs5wZ3UnrTBaP_XYoz_auax/exec";

    // Reenvío al Apps Script
    const response = await fetch(scriptUrl, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const text = await response.text();
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
