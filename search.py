from __future__ import annotations

from typing import List, Tuple
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .config import settings


class SchemeSearcher:
	def __init__(self, df: pd.DataFrame):
		self.df = df
		self._fit_vectorizer()

	def _fit_vectorizer(self) -> None:
		corpus: List[str] = (
			self.df[["Scheme", "Category", "Eligibility", "Benefits"]]
			.fillna("")
			.agg(" ".join, axis=1)
			.tolist()
		)
		self.vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), min_df=1)
		self.doc_matrix = self.vectorizer.fit_transform(corpus)

	def search(self, query: str, top_k: int | None = None) -> Tuple[pd.DataFrame, List[float]]:
		if not query or not query.strip():
			return self.df.head(top_k or settings.top_k), [0.0] * (top_k or settings.top_k)
		q_vec = self.vectorizer.transform([query])
		sims = cosine_similarity(q_vec, self.doc_matrix).flatten()
		top_k = top_k or settings.top_k
		top_idx = sims.argsort()[::-1][:top_k]
		results = self.df.iloc[top_idx].copy()
		scores = sims[top_idx].tolist()
		results["_score"] = scores
		return results, scores


def search_dataset(df: pd.DataFrame, query: str, top_k: int | None = None) -> pd.DataFrame:
	searcher = SchemeSearcher(df)
	results, _ = searcher.search(query, top_k=top_k)
	return results
