"use client";

export function CodeShowcase() {
  return (
    <section className="relative max-w-5xl mx-auto px-6 py-12 z-10">
      <h2 className="text-3xl font-extrabold text-slate-100 text-center mb-8">
        Inside the Detective Pipeline
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-t-xl border border-white/10 border-b-0">
            <span className="text-xs font-bold text-slate-300">server/app/services/detector.py</span>
            <span className="text-[10px] text-pink-400 uppercase tracking-wider font-semibold">Python</span>
          </div>
          <pre className="p-5 text-xs text-indigo-300 bg-slate-950 rounded-b-xl border border-white/10 overflow-x-auto font-mono max-h-80 custom-scrollbar leading-relaxed">
{`# Run YOLOv11 object classification & localization
result = self.model(frame, verbose=False)
frame_result = result[0]
names = frame_result.names

for idx, cls_tensor in enumerate(frame_result.boxes.cls):
    confidence = float(frame_result.boxes.conf[idx].item())
    
    # Paper-aligned optimal threshold filter
    if confidence < min_confidence: # default 0.421
        continue

    cls_id = int(cls_tensor.item())
    class_name = names.get(cls_id, str(cls_id))
    bbox = frame_result.boxes.xyxy[idx].tolist()
    
    # Extract dominant HSV color characteristics
    # Inside bounding box via HSV-based K-Means (k=3)
    color_name, color_rgb = extract_dominant_color(frame, bbox)
    
    objects.append(
        Detection(
            class_name=class_name,
            confidence=confidence,
            bbox=bbox,
            color=color_name,
            color_rgb=color_rgb
        )
    )`}
          </pre>
        </div>

        <div>
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-t-xl border border-white/10 border-b-0">
            <span className="text-xs font-bold text-slate-300">server/app/main.py</span>
            <span className="text-[10px] text-sky-400 uppercase tracking-wider font-semibold">Python</span>
          </div>
          <pre className="p-5 text-xs text-sky-300 bg-slate-950 rounded-b-xl border border-white/10 overflow-x-auto font-mono max-h-80 custom-scrollbar leading-relaxed">
{`# Gemini-2.5-flash-lite query intent parser prompts
prompt = (
    "You extract computer-vision detection intents from natural language.\\n"
    "Respond ONLY with a JSON object shaped like "
    '{"pairs": [{"object": "shirt", "color": "blue"}]} '
    "for queries with specific object-attribute combinations.\\n"
    'Use lowercase singular nouns (e.g. "kameez", "hijab", "panjabi").\\n'
    "Colors: basic color names (red, blue, green, yellow, black, white, etc.).\\n"
    "Example: \\"find a person wearing a blue kameez and black hijab\\" -> "
    '{"pairs": [{"object": "kameez", "color": "blue"}, {"object": "hijab", "color": "black"}]}\\n'
    f'User request: "{query}"\\n'
    "JSON response:"
)

# API requests to Gemini model endpoint
async with httpx.AsyncClient(timeout=10) as client:
    response = await client.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
        params={"key": settings.gemini_api_key},
        json={...}
    )`}
          </pre>
        </div>
      </div>
    </section>
  );
}
