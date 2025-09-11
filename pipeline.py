from __future__ import annotations

from typing import Any, Dict
import pandas as pd

from .config import settings
from .data_loader import load_dataset
from .search import search_dataset
from .generator import generate_answer
from .translate import Translator


def build_response_row(row: pd.Series, summary: str) -> Dict[str, Any]:
	return {
		"scheme_name": row.get("Scheme", ""),
		"eligibility": row.get("Eligibility", ""),
		"benefits": row.get("Benefits", ""),
		"website": row.get("Website", ""),
		"summary": summary,
	}


def run_query(query: str, dataset_path: str | None = None) -> Dict[str, Any]:
	df = load_dataset(dataset_path or settings.dataset_path)
	results = search_dataset(df, query, top_k=1)
	if results.empty:
		return {
			"scheme_name": "",
			"eligibility": "",
			"benefits": "",
			"website": "",
			"summary": "No relevant scheme found.",
		}
	best = results.iloc[0]
	dataset_info = {
		"Scheme": best.get("Scheme", ""),
		"Category": best.get("Category", ""),
		"Eligibility": best.get("Eligibility", ""),
		"Benefits": best.get("Benefits", ""),
		"Website": best.get("Website", ""),
	}
	summary = generate_answer(query, dataset_info)
	return build_response_row(best, summary)


def run_query_multilingual(user_text: str, src_lang: str | None, tgt_lang: str | None, dataset_path: str | None = None) -> Dict[str, Any]:
	"""Translate user_text to English for LLM, then back to target language."""
	translator = Translator()
	english_query = user_text
	if src_lang and src_lang.lower() != "en":
		translated = translator.translate(user_text, src_lang=src_lang, tgt_lang="en")
		english_query = translated or user_text
	result_en = run_query(english_query, dataset_path=dataset_path)
	if tgt_lang and tgt_lang.lower() != "en":
		back = translator.translate(result_en.get("summary", ""), src_lang="en", tgt_lang=tgt_lang)
		if back:
			result_en["summary"] = back
	return result_en
