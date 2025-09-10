from __future__ import annotations

from typing import Any, Dict
import pandas as pd

from .config import settings
from .data_loader import load_dataset
from .search import search_dataset
from .generator import generate_answer


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
