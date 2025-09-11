from __future__ import annotations

from typing import Optional


class Translator:
	"""Wrapper over Facebook M2M100 for many-to-many translation (HF Transformers)."""

	def __init__(self, model_name: str = "facebook/m2m100_418M") -> None:
		from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
		self.tokenizer = M2M100Tokenizer.from_pretrained(model_name)
		self.model = M2M100ForConditionalGeneration.from_pretrained(model_name, device_map="auto")

	def translate(self, text: str, src_lang: str, tgt_lang: str) -> Optional[str]:
		if not text:
			return None
		# Map common variants to M2M100 language codes
		src = _normalize_lang(src_lang)
		tgt = _normalize_lang(tgt_lang)
		try:
			self.tokenizer.src_lang = src
			inputs = self.tokenizer(text, return_tensors="pt").to(self.model.device)
			generated_tokens = self.model.generate(**inputs, forced_bos_token_id=self.tokenizer.get_lang_id(tgt))
			return self.tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
		except Exception:
			return None


def _normalize_lang(code: str) -> str:
	if not code:
		return "en"
	code = code.lower()
	# Common aliases
	aliases = {
		"hi": "hi",
		"mr": "mr",
		"bn": "bn",
		"ta": "ta",
		"te": "te",
		"kn": "kn",
		"ml": "ml",
		"pa": "pa",
		"gu": "gu",
		"ur": "ur",
		"en": "en",
	}
	return aliases.get(code, code)


