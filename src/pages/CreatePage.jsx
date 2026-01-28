import {useState} from "react";
import PhotoToImageSection from "../components/PhotoToImageSection.jsx";
import TextToImageSection from "../components/TextToImageSection.jsx";

const CreatePage = () => {
    const [activeTab, setActiveTab] = useState('photo');
    // ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) - Shared state for suggestion flow =====
    const [suggestedImageBlob, setSuggestedImageBlob] = useState(null);
    const [suggestedPrompt, setSuggestedPrompt] = useState(null);
    // ===== END EMOTIONAL ANALYZER FEATURE =====

    return(
        <div className="container mx-auto py-12 px-8">
            <div className="flex justify-center mb-8 border-b border-gray-300">
                <button onClick={() => setActiveTab('photo')} className={`px-6 py-3 text-lg font-semibold transition-colors ${activeTab === 'photo' ? 'border-b-2 border-orange-900 text-orange-900' : 'text-gray-500 hover:text-gray-800'}`}>
                    Photo to Art
                </button>
                <button onClick={() => setActiveTab('text')} className={`px-6 py-3 text-lg font-semibold transition-colors ${activeTab === 'text' ? 'border-b-2 border-orange-900 text-orange-900' : 'text-gray-500 hover:text-gray-800'}`}>
                    Text to Art
                </button>
            </div>
            <div>
                {/* ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) - Pass suggestion state to components ===== */}
                {activeTab === 'photo' && <PhotoToImageSection suggestedImageBlob={suggestedImageBlob} suggestedPrompt={suggestedPrompt} setSuggestedImageBlob={setSuggestedImageBlob} setSuggestedPrompt={setSuggestedPrompt} onApplySuggestions={(imageBlob, suggestions, dominantEmotion) => {
                    // When user clicks "Apply Suggestions" in Photo tab - stay on photo tab
                    console.log('Photo suggestion callback received in CreatePage:', { dominantEmotion, suggestionsCount: suggestions.length });
                    setSuggestedImageBlob(imageBlob);
                    const suggestionsText = suggestions.join('\n• ');
                    const suggestionPrompt = `Suggestions to enhance ${dominantEmotion}:\n• ${suggestionsText}`;
                    setSuggestedPrompt(suggestionPrompt);
                    // Keep on photo tab - form will auto-populate for next generation
                }} />}
                {activeTab === 'text' && <TextToImageSection onApplySuggestions={(imageBlob, suggestions, dominantEmotion) => {
                    // When user clicks "Apply Suggestions", prepare data for Photo tab
                    console.log('Suggestion callback received in CreatePage:', { dominantEmotion, suggestionsCount: suggestions.length });
                    setSuggestedImageBlob(imageBlob);
                    const suggestionsText = suggestions.join('\n• ');
                    const suggestionPrompt = `Suggestions to enhance ${dominantEmotion}:\n• ${suggestionsText}`;
                    setSuggestedPrompt(suggestionPrompt);
                    console.log('State updated, switching to photo tab');
                    setActiveTab('photo'); // Switch to photo tab
                }} />}
                {/* ===== END EMOTIONAL ANALYZER FEATURE ===== */}
            </div>
        </div>
    );
};

export default CreatePage;