export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;
  const authUsername = process.env.AUTH_USERNAME || "admin";
  const authPassword = process.env.AUTH_PASSWORD || "password123";

  if (username === authUsername && password === authPassword) {
    res.status(200).json({ success: true, message: "Authentication successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
}
