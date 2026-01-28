# Quick Visual Reference - UI Components

## Feature #1: Prompt Enhancement - Button Location

### TextToImageSection Layout
```
┌─────────────────────────────────────────────────┐
│  Text to Ghibli Art                             │
├─────────────────────────────────────────────────┤
│  [Generated Image Area]                         │
│  (Shows image after generation)                 │
├─────────────────────────────────────────────────┤
│  Your Description                               │
│  ┌─────────────────────────────────────────────┐│
│  │ Write description here...                   ││
│  │ Example: "A girl walking in a forest"      ││
│  └─────────────────────────────────────────────┘│
│                                                  │
│  ┌─────────────────────────────────────────────┐│
│  │ 🪄 Enhance Prompt        ← FEATURE #1       ││
│  │ (Click to expand prompt)                    ││
│  └─────────────────────────────────────────────┘│
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │ Generate Ghibli Art          ← Existing      ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  [After Generation]                             │
│  ┌─────────────────────────────────────────────┐│
│  │ Download        Create Another              ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

---

## Feature #2: Emotional Analysis - Display Location

### Full UI with Emotion Card

```
┌────────────────────────────────────────────────────┐
│  Generated Ghibli Art Image                        │
│  (Displayed immediately - no wait)                 │
│  ┌────────────────────────────────────────────────┐│
│  │                                                ││
│  │          [GHIBLI ART IMAGE DISPLAYS]          ││
│  │                                                ││
│  └────────────────────────────────────────────────┘│
│                                                    │
│  🔄 Analyzing emotions...                          │
│  (Shows 1-2 seconds while analyzing)               │
│                                                    │
│  ┌────────────────────────────────────────────────┐│
│  │ ❤️ Emotional Impact Analysis                  ││
│  ├────────────────────────────────────────────────┤│
│  │ EMOTION SCORES (0-10 Scale):                  ││
│  │                                                ││
│  │ Nostalgia   [████████░░░░░░░░] 8/10          ││
│  │ Serenity    [██████░░░░░░░░░░] 6/10          ││
│  │ Mystery     [████████████░░░░] 9/10          ││
│  │ Joy         [████░░░░░░░░░░░░] 4/10          ││
│  │ Melancholy  [██░░░░░░░░░░░░░░░] 2/10         ││
│  │ Hope        [███████░░░░░░░░░] 5/10          ││
│  │                                                ││
│  │ ─────────────────────────────────────────     ││
│  │ 🎯 Dominant Emotion: Mystery                  ││
│  │                                                ││
│  │ 🔍 Key Elements:                              ││
│  │ • 🌙 Dark tones (mystery, melancholy)        ││
│  │ • ⚡ High contrast (dramatic, intense)       ││
│  │ • 📸 Muted colors (calm, nostalgic)          ││
│  │                                                ││
│  │ 💡 Suggestions:                               ││
│  │ • 👥 Add shadowy figures to increase mystery ││
│  │ • 🌫️ Include fog, mist for more intrigue    ││
│  └────────────────────────────────────────────────┘│
│                                                    │
│  ┌────────────────────────────────────────────────┐│
│  │ Download             Create Another           ││
│  └────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────┘
```

---

## Emotion Scores Visual Scale

### Reference: What Different Scores Look Like

```
Emotion = 0/10  (Not present)
[░░░░░░░░░░] 0/10

Emotion = 1-2/10  (Barely present)
[█░░░░░░░░░] 1/10
[██░░░░░░░░] 2/10

Emotion = 3-4/10  (Minor presence)
[███░░░░░░░] 3/10
[████░░░░░░] 4/10

Emotion = 5-6/10  (Moderate presence)
[█████░░░░░] 5/10
[██████░░░░] 6/10

Emotion = 7-8/10  (Strong presence)
[███████░░░] 7/10
[████████░░] 8/10

Emotion = 9-10/10  (Very strong presence)
[█████████░] 9/10
[██████████] 10/10
```

---

## Emotion Types & Associated Emojis

```
🎨 6 Emotions Analyzed:

1. NOSTALGIA 📸
   Warm + Muted + Low Contrast + Low Saturation
   Example: Vintage photos, memories, retro scenes
   
2. SERENITY 🌿
   Cool Colors + Low Contrast + Brightness
   Example: Calm landscapes, still water, peaceful moments
   
3. MYSTERY 🌙
   Dark + High Contrast + Desaturation
   Example: Dark forests, shadowy figures, unknown places
   
4. JOY ☀️
   Brightness + Saturation + Warm Colors
   Example: Festivals, celebrations, sunny scenes
   
5. MELANCHOLY 💙
   Cool Colors + Dark + Low Contrast
   Example: Rainy scenes, lonely figures, sad moments
   
6. HOPE 🌅
   Brightness + Warm Colors + Medium Contrast
   Example: Sunrise, light through clouds, new beginnings
```

---

## Key Elements Reference

### Common Key Elements You'll See

```
Color Psychology Elements:

🔥 Warm tones dominate (triggers nostalgia)
   └─ Red, Orange, Yellow prominent

❄️ Cool tones dominate (creates calm)
   └─ Blue, Purple, Cyan prominent

☀️ High brightness (hope, happiness)
   └─ Mostly bright, light image

🌙 Dark tones (mystery, melancholy)
   └─ Mostly dark, shadow image

🎨 Vibrant colors (energetic, joyful)
   └─ Highly saturated, vivid colors

📸 Muted colors (calm, nostalgic)
   └─ Desaturated, pastel, soft colors

⚡ High contrast (dramatic, intense)
   └─ Sharp differences between light and dark

🌊 Balanced composition
   └─ Well-mixed colors, moderate values
```

---

## Suggestions Reference

### Common Suggestions by Dominant Emotion

#### If Dominant = NOSTALGIA
```
💡 Suggestions:
• ✨ Add vintage filter or sepia tones to enhance nostalgia
• 🌅 Golden hour lighting strengthens the nostalgic feeling
• 📚 Include old objects (books, letters, antiques)
• 🏘️ Add traditional architecture or settings
```

#### If Dominant = SERENITY
```
💡 Suggestions:
• 🍃 Add natural elements (water, trees) for tranquility
• ➡️ Use horizontal lines and balanced composition
• 🌊 Include flowing water or mist for calm
• 🧘 Add meditative figures or peaceful poses
```

#### If Dominant = MYSTERY
```
💡 Suggestions:
• 👥 Add shadowy figures to increase sense of mystery
• 🌫️ Include fog, mist, or rain for intrigue
• 🔍 Add hidden details or unclear elements
• 🌑 Increase darkness and shadows
```

#### If Dominant = JOY
```
💡 Suggestions:
• 🎉 Add celebratory elements (festivals, celebrations)
• 👫 Include multiple happy characters together
• 🎊 Add colorful decorations or patterns
• 💫 Include bright, sparkling effects
```

#### If Dominant = MELANCHOLY
```
💡 Suggestions:
• 🌧️ Add rain, storm, or gloomy weather
• 😔 Include contemplative or sad characters
• 🍂 Add autumn or winter elements
• 🌑 Use cool, desaturated color palette
```

#### If Dominant = HOPE
```
💡 Suggestions:
• ☀️ Add sunrise or light breaking through clouds
• ✈️ Include upward movement or flying elements
• 🌈 Add rainbow or light ray effects
• 🚀 Include forward-moving or ascending subjects
```

---

## Button State Reference

### Enhancement Button States

```
BEFORE Clicking:
┌────────────────────────────────┐
│ 🪄 Enhance Prompt             │  ← Clickable
└────────────────────────────────┘

WHILE Processing:
┌────────────────────────────────┐
│ ⟳ Enhancing...               │  ← Loading state
└────────────────────────────────┘
(Button disabled, cannot click)

AFTER Success:
┌────────────────────────────────┐
│ Your enhanced prompt appears   │
│ in the textarea                │
└────────────────────────────────┘

IF Error:
┌────────────────────────────────┐
│ Error Message shows            │
│ Original prompt remains        │
│ 🪄 Enhance Prompt             │  ← Back to normal
└────────────────────────────────┘
```

---

## Color Coding Used

```
BUTTONS:
🟠 Orange = Main action (Generate, Create Another)
🟣 Purple = AI Enhancement (Enhance Prompt, Analysis)
⚪ Gray = Secondary (Download)

CARD BACKGROUNDS:
🟪 Purple (#7C3AED) = Emotional Analysis section
⚪ White = Content areas within card

TEXT COLORS:
🟣 Purple = Headers, important info
⚫ Dark = Body text
🔴 Red = Errors (if any)
```

---

## Interaction Flow Diagram

### Feature #1: Prompt Enhancement Flow

```
START
  │
  ├─→ User enters prompt
  │       │
  │       └─→ Click "🪄 Enhance Prompt"
  │              │
  │              └─→ API Call to Groq
  │                   │
  │              ┌────┴────┐
  │              │          │
  │           SUCCESS     FAILURE
  │              │          │
  │         Prompt    Original text
  │         Updated   Remains
  │              │          │
  │              └────┬─────┘
  │                   │
  └─→ User can click "Generate" with original or enhanced prompt
                   │
                   └─→ Image Generated
                   
END
```

### Feature #2: Emotion Analysis Flow

```
START
  │
  ├─→ User enters prompt
  │
  ├─→ Click "Generate Ghibli Art"
  │       │
  │       └─→ Image Generation (5-10 seconds)
  │              │
  │              └─→ Image Displays IMMEDIATELY
  │                   │
  │                   └─→ Emotion Analysis Starts (background)
  │                        │
  │              ┌─────────┴─────────┐
  │              │                   │
  │         (1-2 seconds)      Analysis Complete
  │              │                   │
  │         Loading Spinner    Show Results
  │              │                   │
  │              └─────────┬─────────┘
  │                        │
  └─→ User sees:
      ❤️ Emotional Impact Analysis
      │ 6 emotion scores (0-10 each)
      │ Dominant emotion
      │ Key elements
      │ Suggestions
      │
      └─→ User can "Download" or "Create Another"
           (emotion clears on "Create Another")
           
END
```

---

## Screenshot Descriptions

### Prompt Enhancement Button Location
```
Below the description textarea:
- Purple button with wand icon
- Text reads "🪄 Enhance Prompt"
- Hover effect shows darker purple
- Click to send prompt to Groq LLM
```

### Emotion Card Layout
```
Purple border/background
- Header: Heart icon + "Emotional Impact Analysis" title
- Section 1: 6 emotion bars with progress and scores
- Section 2: Dominant emotion highlight
- Section 3: Key elements with emoji list
- Section 4: Suggestions with emoji list
- All in one cohesive card below image
```

---

## Color Palette Reference

```
PRIMARY COLORS:
🟠 Orange:  #EA580C (Button backgrounds)
🟣 Purple:  #9333EA (Feature buttons/cards)

SECONDARY:
⚪ White:    #FFFFFF (Backgrounds)
🟦 Light Purple: #F3E8FF (Card backgrounds)

TEXT:
🟫 Dark:     #1F2937 (Main text)
🔵 Purple:   #6B21A8 (Headers)
🟦 Light:    #6B7280 (Secondary text)

ACCENTS:
🔴 Red:      #DC2626 (Errors - if needed)
🟢 Green:    #16A34A (Success - if needed)
```

---

## Responsive Design Notes

### Desktop (1024px+)
```
[Emotion Card] displays full width below image
All elements visible and properly spaced
```

### Tablet (768px)
```
[Emotion Card] adapts to tablet width
Emotion bars may wrap slightly
All elements still readable
```

### Mobile (<768px)
```
[Emotion Card] takes full container width
Text may wrap for readability
Progress bars scale down proportionally
All functionality preserved
```

---

## Performance Indicators

### Loading States
```
Image Generation: Shows Spinner for 5-10 seconds
Emotion Analysis: Shows "🔄 Analyzing emotions..." for 1-2 seconds
Prompt Enhancement: Shows "⟳ Enhancing..." for 2-4 seconds
```

### Success States
```
✅ Enhanced prompt appears in textarea
✅ Emotion scores displayed with bars
✅ Dominant emotion highlighted
✅ All suggestions visible
✅ No error messages
```

### Error States (Graceful Degradation)
```
If Prompt Enhancement fails:
- Original prompt preserved
- User can still generate
- No breaking UI

If Emotion Analysis fails:
- Image displays normally
- Emotion card doesn't appear
- User can still download image
```

