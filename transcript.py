import sys
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import NoTranscriptFound, NoTranscriptAvailable

def get_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return transcript
    except (NoTranscriptFound, NoTranscriptAvailable):
        return None

if __name__ == "__main__":
    video_id = sys.argv[1]  # Get video_id from command-line arguments
    transcript = get_transcript(video_id)
    if transcript:
        # Concatenate all text values into a single string
        full_transcript = " ".join([item['text'] for item in transcript])
        print(full_transcript)
    else:
        print("No transcript found or available.")
