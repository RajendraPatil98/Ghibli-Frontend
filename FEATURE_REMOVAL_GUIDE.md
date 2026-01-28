# Feature Removal Guide - Future Reference

If you need to remove **Feature #1 (Prompt Enhancement)** or **Feature #2 (Emotional Analyzer)** in the future, follow this guide.

---

## Quick Summary of Changes

### Files Created (Safe to Delete Entirely)

#### Feature #1 Files (Prompt Enhancement)
```
Backend:
- src/main/java/in/rajendrapatil/ghibliapi/client/GroqClient.java (entire file)
- src/main/java/in/rajendrapatil/ghibliapi/service/PromptEnhancerService.java (entire file)
- src/main/java/in/rajendrapatil/ghibliapi/controller/PromptEnhancerController.java (entire file)
- src/main/java/in/rajendrapatil/ghibliapi/dto/PromptEnhanceRequest.java (entire file)
- src/main/java/in/rajendrapatil/ghibliapi/dto/PromptEnhanceResponse.java (entire file)

Configuration:
- application.properties - Lines marked with "===== PROMPT ENHANCEMENT FEATURE =====..."
```

#### Feature #2 Files (Emotional Analyzer)
```
Backend:
- src/main/java/in/rajendrapatil/ghibliapi/util/EmotionalAnalyzerUtil.java (entire file - 293 lines)
- src/main/java/in/rajendrapatil/ghibliapi/service/EmotionalAnalysisService.java (entire file)
- src/main/java/in/rajendrapatil/ghibliapi/controller/EmotionalAnalysisController.java (entire file)
- src/main/java/in/rajendrapatil/ghibliapi/dto/EmotionScore.java (entire file)
- src/main/java/in/rajendrapatil/ghibliapi/dto/EmotionalAnalysisResponse.java (entire file)
```

### Files Modified (Selective Deletion)

#### Frontend - TextToImageSection.jsx
```javascript
// TO REMOVE - Line 4 (imports)
import {Download, FileText, PlusCircle, Wand2, Heart} from "lucide-react";
// Change to:
import {Download, FileText, PlusCircle} from "lucide-react";

// TO REMOVE - Lines 13-18 (state)
// ===== PROMPT ENHANCEMENT FEATURE (AI Feature #1) - TO REMOVE: Delete lines 13-14 =====
const [isEnhancing, setIsEnhancing] = useState(false);
// ===== END PROMPT ENHANCEMENT FEATURE =====
// ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) - TO REMOVE: Delete lines 16-18 =====
const [emotionalAnalysis, setEmotionalAnalysis] = useState(null);
const [isAnalyzing, setIsAnalyzing] = useState(false);
// ===== END EMOTIONAL ANALYZER FEATURE =====

// TO REMOVE - Lines 23-52 (handleEnhancePrompt function)
// ===== PROMPT ENHANCEMENT FEATURE (AI Feature #1) =====
const handleEnhancePrompt = async () => {
    ... (entire function)
}
// ===== END PROMPT ENHANCEMENT FEATURE =====

// TO REMOVE - Lines 71-72 (clear emotion in handleGenerate)
// ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) =====
setEmotionalAnalysis(null);
// ===== END EMOTIONAL ANALYZER FEATURE =====

// TO REMOVE - Lines 80-81 (call emotion analysis in handleGenerate)
// ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) =====
await analyzeImageEmotion(resultBlob);
// ===== END EMOTIONAL ANALYZER FEATURE =====

// TO REMOVE - Lines 101-130 (analyzeImageEmotion function)
// ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) =====
const analyzeImageEmotion = async (imageBlob) => {
    ... (entire function)
}
// ===== END EMOTIONAL ANALYZER FEATURE =====

// TO REMOVE - Lines 143-144 (clear emotion in handleCreateAnother)
// ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) =====
setEmotionalAnalysis(null);
// ===== END EMOTIONAL ANALYZER FEATURE =====

// TO REMOVE - Lines 172-173 (Enhance Prompt button)
{/* ===== PROMPT ENHANCEMENT FEATURE (AI Feature #1) ===== */}
<button onClick={handleEnhancePrompt} disabled={isEnhancing || !prompt.trim()} ...>
    <Wand2 size={16} /> {isEnhancing ? 'Enhancing...' : 'Enhance Prompt'}
</button>
{/* ===== END PROMPT ENHANCEMENT FEATURE ===== */}

// TO REMOVE - Lines 184-239 (Emotion Analysis UI)
{/* ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) ===== */}
{isAnalyzing && (
    ... (entire emotion UI section)
)}
{/* ===== END EMOTIONAL ANALYZER FEATURE ===== */}
```

#### Frontend - PhotoToImageSection.jsx
```javascript
// Same changes as TextToImageSection.jsx above
// All lines and sections marked with feature comments
```

#### Backend - application.properties
```properties
# TO REMOVE - Lines 5-9 (Groq configuration for Feature #1)
# Configuration for Groq API to enhance user prompts with AI
# To disable: Remove groq.api.key and groq.api.base-url lines
# Requires: GROQ_API_KEY environment variable set
groq.api.key=${GROQ_API_KEY}
groq.api.base-url=https://api.groq.com/openai/v1
```

---

## Step-by-Step Removal Instructions

### Remove Feature #1 (Prompt Enhancement)

**Backend Deletion:**
1. Delete file: `GroqClient.java`
2. Delete file: `PromptEnhancerService.java`
3. Delete file: `PromptEnhancerController.java`
4. Delete file: `PromptEnhanceRequest.java`
5. Delete file: `PromptEnhanceResponse.java`
6. Remove Groq configuration from `application.properties` (lines 5-9)

**Frontend Deletion:**
1. Edit `TextToImageSection.jsx`:
   - Remove Wand2 icon from imports
   - Delete `isEnhancing` state
   - Delete entire `handleEnhancePrompt()` function
   - Delete the "Enhance Prompt" button and its comment block
   
2. Edit `PhotoToImageSection.jsx`:
   - Same as TextToImageSection.jsx above

**Verification:**
- Project should compile without Groq-related imports
- No "enhance-prompt" endpoint should exist
- "Enhance Prompt" button should be gone from UI
- Original image generation should still work

---

### Remove Feature #2 (Emotional Analyzer)

**Backend Deletion:**
1. Delete file: `EmotionalAnalyzerUtil.java` (entire 293-line file)
2. Delete file: `EmotionalAnalysisService.java`
3. Delete file: `EmotionalAnalysisController.java`
4. Delete file: `EmotionScore.java`
5. Delete file: `EmotionalAnalysisResponse.java`

**Frontend Deletion:**
1. Edit `TextToImageSection.jsx`:
   - Remove Heart icon from imports
   - Delete `emotionalAnalysis` state
   - Delete `isAnalyzing` state
   - Delete entire `analyzeImageEmotion()` function
   - Delete entire "Emotional Impact Analysis" UI section (lines 184-239)
   - Remove `setEmotionalAnalysis(null)` calls from:
     * handleGenerate() function
     * handleCreateAnother() function
   - Remove the `await analyzeImageEmotion(resultBlob)` call from handleGenerate()
   
2. Edit `PhotoToImageSection.jsx`:
   - Same as TextToImageSection.jsx above

**Verification:**
- Project should compile without Heart icon import
- No "analyze-emotion" endpoint should exist
- Emotion analysis UI should be gone from all components
- Original image generation should still work
- Generated images display without emotion information

---

### Remove Both Features (Total Cleanup)

**Backend (Delete These Directories/Files):**
```
src/main/java/in/rajendrapatil/ghibliapi/
├── client/
│   └── GroqClient.java [DELETE]
├── service/
│   ├── PromptEnhancerService.java [DELETE]
│   └── EmotionalAnalysisService.java [DELETE]
├── controller/
│   ├── PromptEnhancerController.java [DELETE]
│   └── EmotionalAnalysisController.java [DELETE]
├── util/
│   └── EmotionalAnalyzerUtil.java [DELETE]
└── dto/
    ├── PromptEnhanceRequest.java [DELETE]
    ├── PromptEnhanceResponse.java [DELETE]
    ├── EmotionScore.java [DELETE]
    └── EmotionalAnalysisResponse.java [DELETE]

application.properties
├── Remove lines 5-9 (Groq config) [DELETE]
```

**Frontend Changes:**
```
TextToImageSection.jsx
├── Remove: Wand2, Heart from imports
├── Delete: 2 state variables (isEnhancing, emotionalAnalysis, isAnalyzing)
├── Delete: handleEnhancePrompt() function
├── Delete: analyzeImageEmotion() function
├── Delete: Enhance Prompt button
├── Delete: Emotion Analysis UI section
└── Delete: setEmotionalAnalysis() calls

PhotoToImageSection.jsx
└── [Same changes as TextToImageSection.jsx]
```

**Total Lines to Remove:**
- Backend: ~800-900 lines of code across 8 files
- Frontend: ~150 lines across 2 files
- Config: ~5 lines

---

## Comment Tags for Search & Replace

All changes are clearly marked in the code. Use these search terms to find all feature code:

**Feature #1 Search Terms:**
```
PROMPT ENHANCEMENT FEATURE (AI Feature #1)
handleEnhancePrompt
Wand2
isEnhancing
PromptEnhancer
GroqClient
enhance-prompt
```

**Feature #2 Search Terms:**
```
EMOTIONAL ANALYZER FEATURE (AI Feature #2)
analyzeImageEmotion
emotionalAnalysis
isAnalyzing
Heart
EmotionalAnalyzer
EmotionScore
analyze-emotion
```

---

## Testing After Removal

After removing features, verify:

- [ ] Project compiles without errors
- [ ] No unused imports remain
- [ ] No undefined API endpoints
- [ ] Text-to-Image generation works
- [ ] Photo-to-Image generation works
- [ ] Image downloads work
- [ ] "Create Another" button works
- [ ] No console errors in browser DevTools
- [ ] Original UI looks clean (no orphaned buttons/sections)
- [ ] Style consistency maintained

---

## If Partial Removal (Only Remove Feature #1 OR Feature #2)

### Keep Feature #2, Remove Feature #1
- Keep: `EmotionalAnalyzerUtil.java`, `EmotionalAnalysisService.java`, etc.
- Keep: `emotionalAnalysis`, `isAnalyzing` states
- Keep: `analyzeImageEmotion()` function
- Keep: Emotion analysis UI section
- Keep: Heart icon import
- Delete: All Feature #1 files and code

### Keep Feature #1, Remove Feature #2
- Keep: `GroqClient.java`, `PromptEnhancerService.java`, etc.
- Keep: `isEnhancing` state
- Keep: `handleEnhancePrompt()` function
- Keep: "Enhance Prompt" button
- Keep: Wand2 icon import
- Keep: Groq configuration in application.properties
- Delete: All Feature #2 files and code

---

## Common Issues During Removal

### Issue: Build fails with "cannot find symbol"
**Solution:** Check if you missed deleting a file or clearing an import

### Issue: "Heart is not imported" error
**Solution:** You removed Heart from imports but didn't remove all emotion UI code

### Issue: UI looks broken with missing button
**Solution:** You may have accidentally removed the "Generate" button - search for `handleGenerate` to verify

### Issue: API endpoint still trying to call removed feature
**Solution:** Clear browser cache and restart the development server

---

## Backup Recommendation

Before removing these features:

1. Create a git commit with clear message:
   ```
   git commit -m "Before removing AI features: Prompt Enhancement and Emotional Analyzer"
   ```

2. Create a branch for the removal:
   ```
   git branch -b remove/ai-features-cleanup
   ```

3. This allows easy rollback if something goes wrong

---

## Questions?

If removal doesn't go smoothly:
- Check the "===== ... FEATURE ... =====" comment blocks
- Search for all occurrences of Wand2 and Heart icons
- Verify state variables aren't used anywhere else
- Check `handleGenerate()` and `handleCreateAnother()` functions

All feature code is **self-contained and clearly marked** for safe removal.
