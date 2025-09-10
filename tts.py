from __future__ import annotations

import json
from typing import Optional
import requests

from .config import settings


ELEVEN_URL_TEMPLATE = "https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"


def synthesize_tts(text: str, voice_id: Optional[str] = None) -> bytes | None:
	if not text or not settings.eleven_api_key:
		return None
	voice = voice_id or settings.eleven_voice_id
	url = ELEVEN_URL_TEMPLATE.format(voice_id=voice)
	headers = {
		"xi-api-key": settings.eleven_api_key,
		"Content-Type": "application/json",
		"Accept": "audio/mpeg",
	}
	payload = {
		"text": text,
		"voice_settings": {"stability": 0.4, "similarity_boost": 0.7},
	}
	try:
		res = requests.post(url, headers=headers, data=json.dumps(payload), timeout=60)
		if res.status_code == 200:
			return res.content
		return None
	except Exception:
		return None
