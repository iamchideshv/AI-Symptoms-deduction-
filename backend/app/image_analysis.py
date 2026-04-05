import google.generativeai as genai
import os
import PIL.Image
import io
import json

def analyze_skin_image(image_bytes: bytes, api_key: str, user_question: str = None):
    if not api_key:
        return {
            "error": "No Gemini API Key provided. Please set GEMINI_API_KEY in your backend .env file."
        }
        
    try:
        genai.configure(api_key=api_key)
        # Using gemini-2.5-flash for multimodal tasks
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        image = PIL.Image.open(io.BytesIO(image_bytes))
        
        prompt = """
        You are an AI medical assistant. The user has uploaded an image of a skin condition, allergy, or wound.
        Analyze the image and provide a response in structured JSON format with the following keys:
        - "condition_name": The predicted name of the condition (e.g., "Contact Dermatitis", "Mosquito Bite", "Psoriasis"). Keep it short.
        - "description": A brief description of what this condition usually is.
        - "solutions": A list of simple actions, remedies, or advice.
        - "urgency": Either "Low", "Medium", or "High".
        
        DISCLAIMER: Always end your description with "Consult a medical professional for an accurate diagnosis." 
        Do not include markdown code block formatting in your output, just return the raw JSON string.
        """
        
        if user_question:
            prompt += f"\n\nAdditionally, the user asked the following specific question about this image:\n\"{user_question}\"\nPlease make sure to directly answer this question within the 'description' or 'solutions' fields of your JSON response as appropriate."
        
        response = model.generate_content([prompt, image])
        
        try:
            # Clean up the response if it has markdown formatting
            text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(text)
        except Exception as e:
            return {
                "condition_name": "Analysis Parsing Error",
                "description": f"The model analyzed the image but returned a non-JSON response.",
                "solutions": [response.text],
                "urgency": "Unknown"
            }
            
    except Exception as e:
        return {
            "error": f"Failed to analyze image: {str(e)}"
        }
