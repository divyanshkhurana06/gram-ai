from flask import Flask, request, jsonify, send_file
from io import BytesIO
from src.gramai.pipeline import run_query, run_query_multilingual
from src.gramai.tts import synthesize_tts
from src.gramai.asr import transcribe

app = Flask(__name__)


@app.post("/query")
def query_endpoint():
	data = request.get_json(silent=True) or {}
	query = data.get("query", "")
	if not query:
		return jsonify({"error": "Missing 'query'"}), 400
	result = run_query(query)
	return jsonify(result)


@app.post("/speak")
def speak_endpoint():
	data = request.get_json(silent=True) or {}
	text = data.get("text")
	query = data.get("query")
	voice_id = data.get("voice_id")
	if not text and not query:
		return jsonify({"error": "Provide 'text' or 'query'"}), 400
	if query and not text:
		result = run_query(query)
		text = result.get("summary") or "No summary available."
	audio = synthesize_tts(text, voice_id=voice_id)
	if not audio:
		return jsonify({"error": "TTS unavailable or failed"}), 502
	return send_file(BytesIO(audio), mimetype="audio/mpeg", as_attachment=False, download_name="speech.mp3")


@app.post("/query_multilingual")
def query_multilingual_endpoint():
	data = request.get_json(silent=True) or {}
	text = data.get("text", "")
	src_lang = data.get("src_lang")  # e.g., "hi"
	tgt_lang = data.get("tgt_lang")  # e.g., "hi"
	if not text:
		return jsonify({"error": "Missing 'text'"}), 400
	result = run_query_multilingual(text, src_lang=src_lang, tgt_lang=tgt_lang)
	return jsonify(result)


@app.post("/s2s")
def s2s_endpoint():
	# Multipart form-data with key 'file', optional 'tgt_lang' for response speech
	if "file" not in request.files:
		return jsonify({"error": "Upload audio as form-data with key 'file'"}), 400
	file = request.files["file"]
	data = file.read()
	text, detected_lang = transcribe(data)
	if not text:
		return jsonify({"error": "Transcription failed"}), 502
	# Run multilingual flow; translate to English for LLM (flan-t5) and back
	tgt_lang = request.form.get("tgt_lang") or detected_lang or "en"
	result = run_query_multilingual(text, src_lang=detected_lang or "en", tgt_lang=tgt_lang)
	spoken_text = result.get("summary") or "No summary available."
	audio = synthesize_tts(spoken_text)
	if not audio:
		return jsonify({"error": "TTS unavailable or failed"}), 502
	return send_file(BytesIO(audio), mimetype="audio/mpeg", as_attachment=False, download_name="speech.mp3")


if __name__ == "__main__":
	app.run(host="0.0.0.0", port=8000)
