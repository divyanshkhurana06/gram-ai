from __future__ import annotations

import json
from typing import Any, Dict
import os
import requests

from .config import settings


PROMPT_TEMPLATE = (
	"You are an assistant that explains Indian government schemes in simple words. "
	"Here is the query: {query}. "
	"Here is dataset info: {dataset_info}. "
	"Explain the scheme clearly, list eligibility, benefits, and give a human-friendly summary."
)


def _format_dataset_info(dataset_row: Dict[str, Any]) -> str:
	parts = []
	for key in ["Scheme", "Category", "Eligibility", "Benefits", "Website"]:
		val = dataset_row.get(key, "")
		if val:
			parts.append(f"{key}: {val}")
	return " | ".join(parts)


def _generate_transformers(prompt: str) -> str | None:
	try:
		from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
		model_name = settings.hf_model or "google/flan-t5-base"
		tok = AutoTokenizer.from_pretrained(model_name)
		model = AutoModelForSeq2SeqLM.from_pretrained(model_name, device_map="auto")
		inputs = tok(prompt, return_tensors="pt").to(model.device)
		out = model.generate(**inputs, max_new_tokens=300, temperature=0.2)
		return tok.decode(out[0], skip_special_tokens=True).strip()
	except Exception:
		return None


def _generate_openai(prompt: str) -> str | None:
	api_key = settings.openai_api_key
	if not api_key:
		return None
	try:
		from openai import OpenAI
		client = OpenAI(api_key=api_key)
		resp = client.chat.completions.create(
			model=settings.openai_model,
			messages=[
				{"role": "system", "content": "You explain Indian government schemes simply."},
				{"role": "user", "content": prompt},
			],
			temperature=0.2,
			max_tokens=500,
		)
		return resp.choices[0].message.content.strip() if resp.choices else None
	except Exception:
		return None


def _generate_hf(prompt: str) -> str | None:
	hf_key = settings.hf_api_key
	if not hf_key:
		return None
	model = settings.hf_model
	headers = {"Authorization": f"Bearer {hf_key}", "Content-Type": "application/json"}
	url = f"https://api-inference.huggingface.co/models/{model}"
	payload = {"inputs": prompt, "parameters": {"max_new_tokens": 300, "temperature": 0.2}}
	try:
		res = requests.post(url, headers=headers, data=json.dumps(payload), timeout=60)
		if res.status_code == 200:
			data = res.json()
			if isinstance(data, list) and data and isinstance(data[0], dict) and "generated_text" in data[0]:
				return data[0]["generated_text"].strip()
			if isinstance(data, dict) and "generated_text" in data:
				return str(data["generated_text"]).strip()
		return None
	except Exception:
		return None


def generate_answer(query: str, dataset_info: Dict[str, Any]) -> str:
	formatted = _format_dataset_info(dataset_info)
	prompt = PROMPT_TEMPLATE.format(query=query, dataset_info=formatted)
	# Prefer local transformers (flan-t5-base) for HF as requested
	text = _generate_transformers(prompt)
	if not text:
		# Then try OpenAI if available
		text = _generate_openai(prompt)
	if not text:
		# Finally, HF Inference API
		text = _generate_hf(prompt)
	return text or "Unable to generate summary at the moment. Please try again later."
