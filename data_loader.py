from __future__ import annotations

import os
import pandas as pd
from typing import Dict, List

from .config import settings


CANONICAL_COLUMNS = ["Scheme", "Category", "Eligibility", "Benefits", "Website"]


def _standardize_columns(df: pd.DataFrame) -> pd.DataFrame:
	mapping_candidates: Dict[str, str] = {
		# original variants
		"scheme": "Scheme",
		"scheme_name": "Scheme",
		"name": "Scheme",
		# user's scraped fields
		"name of the scheme": "Scheme",
		"slug": "Scheme",  # short form -> best-effort map to name
		"details": "Benefits",  # description -> fold into Benefits if no dedicated summary
		"benefits": "Benefits",
		"eligibility": "Eligibility",
		"application": "Website",  # how to apply -> link if present, else text
		"documents": "Eligibility",  # supporting docs -> eligibility adjunct
		"level": "Category",  # state/central
		"schemecategory": "Category",  # domain
		# general variants
		"category": "Category",
		"sector": "Category",
		"target_beneficiaries": "Eligibility",
		"benefit": "Benefits",
		"features": "Benefits",
		"website": "Website",
		"url": "Website",
		"link": "Website",
		"official_website": "Website",
	}

	# normalize incoming column names
	orig_cols = list(df.columns)
	norm_cols: List[str] = []
	for col in orig_cols:
		key = str(col).strip().lower().replace(" ", "_")
		norm_cols.append(key)
	df.columns = norm_cols

	# remap
	remapped: Dict[str, str] = {}
	for c in df.columns:
		remapped[c] = mapping_candidates.get(c, c)
	df.rename(columns=remapped, inplace=True)

	# ensure canonical columns
	for col in CANONICAL_COLUMNS:
		if col not in df.columns:
			df[col] = ""

	# consolidate: if Scheme empty but a better candidate exists
	if df["Scheme"].eq("").any():
		# prefer original scheme_name/name if present
		for candidate in ["scheme_name", "name_of_the_scheme", "name", "slug"]:
			if candidate in norm_cols:
				df.loc[df["Scheme"].eq("") & df[candidate].astype(str).ne(""), "Scheme"] = df[candidate].astype(str)

	# merge details into Benefits if Benefits is sparse
	mask_benefits_empty = df["Benefits"].astype(str).str.strip().eq("")
	if "details" in norm_cols:
		df.loc[mask_benefits_empty, "Benefits"] = df.loc[mask_benefits_empty, "details"].astype(str)

	# documents: append to eligibility if present
	if "documents" in norm_cols:
		df["Eligibility"] = (
			df["Eligibility"].astype(str).fillna("")
			+ ("\nRequired Documents: " + df["documents"].astype(str)).where(df["documents"].astype(str).str.strip().ne(""), "")
		)

	# reduce to canonical order
	df = df[CANONICAL_COLUMNS]
	return df


def _clean_text(val: object) -> str:
	if pd.isna(val):
		return ""
	return str(val).strip()


def load_dataset(path: str | None = None) -> pd.DataFrame:
	csv_path = path or settings.dataset_path
	if not os.path.exists(csv_path):
		raise FileNotFoundError(f"Dataset not found at {csv_path}. Place CSV at this path or set SCHEMES_DATASET_PATH")

	df = pd.read_csv(csv_path, encoding="utf-8", low_memory=False)
	df = _standardize_columns(df)

	# basic cleaning
	for col in CANONICAL_COLUMNS:
		df[col] = df[col].apply(_clean_text)

	# drop rows with empty scheme names
	df = df[df["Scheme"].str.len() > 0].reset_index(drop=True)

	return df
