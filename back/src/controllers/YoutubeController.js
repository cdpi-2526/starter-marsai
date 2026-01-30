import { google } from "googleapis";

import fs from "fs";
import path from "path";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } =
  process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  throw new Error(
    "Missing env vars: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI",
  );
}

// Scope upload YouTube
const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];

// OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
);

// Stockage tokens côté serveur (fichier)
const TOKENS_PATH = path.join(process.cwd(), "youtube_tokens.json");

function loadTokens() {
  if (!fs.existsSync(TOKENS_PATH)) return null;
  return JSON.parse(fs.readFileSync(TOKENS_PATH, "utf8"));
}

function saveTokens(tokens) {
  fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2), "utf8");
}

// Pour le paramètre state (recommandé), simple en mémoire
let lastOAuthState = null;

async function googleAuthCallback(req, res) {
  try {
    const { code, state } = req.query;

    if (!state || state !== lastOAuthState) {
      return res.status(400).send("Invalid state");
    }
    if (!code) return res.status(400).send("Missing code");

    const { tokens } = await oauth2Client.getToken(code);

    // stocker côté serveur pour les uploads automatisés
    saveTokens(tokens);

    res.json({ message: "Authentication successful" });
  } catch (e) {
    res.status(500).send(String(e?.message || e));
  }
}

function googleAuth(req, res) {
  const state = crypto.randomBytes(16).toString("hex");
  lastOAuthState = state;

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
    state,
  });

  res.redirect(url);
}

async function uploadVideo(req, res) {
  const tokens = loadTokens();
  if (!tokens)
    return res.status(401).send("Tokens absents. Lance /auth une fois.");

  if (!req.file?.path)
    return res.status(400).send('Missing file field "video"');

  const filePath = req.file.path;

  try {
    oauth2Client.setCredentials(tokens);
    // force la récupération d’un access token (avec refresh_token si nécessaire)
    await oauth2Client.getAccessToken();
    const youtube = google.youtube({ version: "v3", auth: oauth2Client });

    const tags =
      typeof req.body.tags === "string" && req.body.tags.trim()
        ? req.body.tags
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined;

    const response = await youtube.videos.insert({
      part: "snippet,status,contentDetails",
      requestBody: {
        snippet: {
          title: req.body.title || "Test Title",
          description: req.body.description || "",
          tags,
          categoryId: "22",
        },
        status: {
          privacyStatus: req.body.privacyStatus || "private",
        },
      },
      media: { body: fs.createReadStream(filePath) },
    });

    res.json({
      videoId: response?.data?.id,
      licence: response?.data.contentDetails.licensedContent,
    });
  } catch (e) {
    const details = {
      message: e?.message,
      status: e?.response?.status,
      data: e?.response?.data,
    };
    res.status(500).json({ error: "Unauthorized", details });
  } finally {
    //fs.unlink(filePath, () => {});
  }
}
export default { googleAuth, googleAuthCallback, uploadVideo };
